import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../Store/store';
import classes from './Cartitem.module.css';

function Cartitem (props) {

    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.user.userId) ;
    const productlist = useSelector( (state) => state.product.productlist );
    const cartitemslist = useSelector( (state) => state.cart.cartlist ) ;

    const productitem = productlist.find( item => item.id===props.productId );
    let productstock = productitem.stock;

    const fetchData = async (value) => {
        
        const response = await fetch('http://localhost:8080/ecommerce/cart', {
            method : 'PUT',
            mode: "cors",
            headers: { 
              "Access-Control-Allow-Origin": "*", 
              "Content-Type": "application/json"   
            },
            body : JSON.stringify({
                cartId : props.cartId,
                userId : userId,
                productId : props.productId,
                quantity : props.quantity+value,
                price : props.price
            })
        }) ;
        const data = await response.json();

        if( response.ok ) {
            if( value === 1) {
                dispatch(cartActions.additemtocart({
                    userId : userId,
                    productId : props.productId,
                    quantity : props.quantity,
                    price : props.price
                  }));
            }
            else {
                dispatch(cartActions.removeitemfromcart({
                    productId : props.productId,
                    status : 1
                }));
            }
        }
        else {
        }
    }

    const deletedata = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/cart/'+`${props.cartId}`, {
            method : 'DELETE',
            mode: "cors",
            headers: { 
              "Access-Control-Allow-Origin": "*", 
              "Content-Type": "application/json"   
            }
        }) ;
        const data = await response;
    }


    const increaseHandler = () => {
        if( productstock-props.quantity > 0 ) {
            fetchData(1);
        }
    }

    const decreaseHandler = () => {
        if( props.quantity === 1 ) {
            deletedata();
            dispatch(cartActions.removeitemfromcart({
                productId : props.productId,
                status : 1
            }));
        }
        else {
            fetchData(-1);
        }
    }

    const removeitemHandler = () => {
        deletedata() ;
        dispatch(cartActions.removeitemfromcart({
            productId : props.productId,
            status : 0
        }));
        props.reload();
    }

    return(
        <div className={classes.itemdiv}>
            <div>
                <h5><i>{productitem.title}</i></h5>
                {/* <h4>Description: {productitem.description}</h4> */}
                <div >
                    <span >Quantity : {props.quantity}x</span>
                    < br />
                    <span>Price : <b>{props.price+" "} INR</b></span>
                </div>
            </div>  
            <div >
                <button key={props.key+'dec'} className={classes.arrowbtn} onClick={decreaseHandler}><i class="bi bi-arrow-down-circle-fill"></i></button>
                <button key={props.key+'inc'} className={classes.arrowbtn} disabled={productstock-props.quantity <= 0} onClick={increaseHandler}><i class="bi bi-arrow-up-circle-fill"></i></button>
                <button key={props.key+'remove'} className={classes.arrowbtn} style={{borderColor:"rgba(40, 30, 94, 0.932)", borderStyle:"solid", borderRadius:"5px"}} onClick={removeitemHandler}>Remove</button>
            </div>
            <hr style={{borderStyle:"5px solid black"}} />
        </div>
    ) ;

}

//{productitem.title}
//className={classes.actions}className={classes.price}className={classes.summary} className={classes.amount}

export default Cartitem;
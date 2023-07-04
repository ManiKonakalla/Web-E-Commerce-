import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Productitem from '../Productspage/Productitem';
import { cartActions } from '../Store/store';
import Card from '../UI/Card';
import Newaddressmodal from './Newaddressmodal';
import classes from "./Showaddress.module.css";
import { format } from 'date-fns';
import OrderPlaceConfirm from './OrderPlaceConfirm';

function Showaddress( props ) {

    const addresslist = useSelector( (state) => state.address.addresslist );
    const userId = useSelector( (state) => state.user.userId );
    const totalAmount = useSelector( (state) => state.cart.totalAmount) ;
    const cartlist = useSelector( (state) => state.cart.cartlist ) ;
    const productlist = useSelector( (state)=>state.product.productlist) ;
    const dispatch = useDispatch();

    const [addressform, setAddressform] = useState(false);
    const [addId, setAddId] = useState(null);
    const [orderConfirm, setOrderConfirm] = useState("yes");

    const [placeOrder, setPlaceOrder] = useState(false);

    let history = useHistory() ;

    const addressSelectHandler = (event) => {
        // console.log(event.target.value);
        setAddId(event.target.value);
    }

    const newAddressHandler = (event) => {
        setAddressform(!addressform);
    }

    const orderinsert = async () => {

        const orderresponse = await fetch('http://localhost:8080/ecommerce/orders', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    userId : userId,
                    amount : totalAmount,
                    status : "Placed",
                    addId : addId,
                    orderedDate : format( new Date(), 'dd-MM-y' )
                })
        });
        
        const orderdata = await orderresponse.json();
        if( orderresponse.ok ) {
            console.log(orderdata.orderId) ; 

            {
                cartlist.map( async (item) => {

                    let itemresponse = await fetch('http://localhost:8080/ecommerce/orderslines', {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            orderId : orderdata.orderId,
                            productId : item.productId,
                            quantity : item.quantity
                        })
                    }) ;

                    let data = await itemresponse.json() ;
                    if( itemresponse.ok ) {

                        let productItem = productlist.find( pitem => pitem.id===item.productId) ;
                        let newstock = productItem.stock-item.quantity;

                        let productResponse = await fetch('http://localhost:8080/ecommerce/updateProductStock?productId='+`${item.productId}`+'&stockvalue='+`${newstock}`, {
                            method : 'PUT',
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        }) ;

                        if( productResponse.ok ) {
                            console.log("success");
                        }
                        else {}
                    }
                    else {}
                } )
            }
        }
        else {}
    }

    const deletecart = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/cartbyuserid/'+`${userId}`, {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                }
        });
    }

    const createOrder = async () => {

        let ordersLines = [];
        {
            cartlist.map( (item) => {
                ordersLines.push({
                    productId : item.productId,
                    quantity : item.quantity
                })
            })
        }
        let order = {
            userId : userId,
            amount : totalAmount,
            status : "Placed",
            addId : addId,
            orderedDate : format( new Date(), 'dd-MM-y' )
        }

        let itemresponse = await fetch('http://localhost:8080/ecommerce/saveOrder', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                order : order,
                ordersLines : ordersLines
            })
        }) ;

        let data = await itemresponse.json() ;
        let check = false ;
        let orderData = []
        let i = 0;
        console.log(data);
        {
            data.map( item => {
                if( item === false ) {
                    check = true ;
                }
                orderData.push({
                    productId : cartlist[i].productId,
                    value : data[i]
                })
                i = i+1;
            } )
        }
        if( check ) {            
            dispatch(cartActions.orderEffectCart(orderData));
            setOrderConfirm("no") ;
        }
        else {
            setOrderConfirm("yes");
            props.saddId(addId);
            props.clickHandle();
            // dispatch(cartActions.emptycart());
            // dispatch(cartActions.emptyCartOrderList());
            // history.push("/customerhome");
        }

    }
    
    const orderHandler = () => {

        setOrderConfirm("confirm");        
    }

    const orderConfirmHandler = ( pos ) => {
        if( pos === "place" ) {
            createOrder();
        }
        setOrderConfirm("yes");
        
    }

    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderWidth:"2px" , borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };
    let butdisstyle = { backgroundColor: "#D3D3D3", borderStyle: "solid", borderWidth:"2px" , borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };
    let placeStyle=  addId ? butstyle : butdisstyle 
 
    return(
        <Card>
            <h3 style={{textAlign:"center"}}>Your Address</h3>
            <hr style={{borderStyle:"solid"}} />
            {
            addressform && <Newaddressmodal addId={null} style={{paddingLeft:"50%"}} clickHandle={newAddressHandler}/>
            }
            {
                orderConfirm!=="yes" && <OrderPlaceConfirm orderConfirm={orderConfirm} clickHandle={orderConfirmHandler} />
            }
            <div onChange={ addressSelectHandler } className={classes.example}>
                {
                    addresslist.map( (item) => (
                        <div style={{paddingLeft:"15px"}}>
                            <label>
                                <input key={item.addId} type="radio" value={item.addId} name="address" /> 
                                        <span>{item.name}</span>
                                        <p style={{paddingLeft:"15px"}}>{item.addstring}</p>
                                        <p style={{paddingLeft:"15px"}}>{item.phonenumber}</p>
                            </label>                             
                            <br/>
                            <br/>  
                        </div>      
                    ) )
                }
            </div>
            <hr style={{borderStyle:"solid"}} />
            <span style={{paddingLeft:"10px"}}>
                <button type="button" onClick={newAddressHandler} style={butstyle}> + Add New Address </button>
            </span>
            <br />
            <br/>
            <p style={{textAlign:"center"}}>
                <button type="submit" disabled={addId ? false : true } style={placeStyle} onClick={orderHandler}> Place order </button>
            </p>
            <br />
            
        </Card>
    );
}

export default Showaddress;
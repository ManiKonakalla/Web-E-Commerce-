import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../Store/store';

function Checkoutcartitem(props) {

    const productlist = useSelector((state) => state.product.productlist);
    const cartOrderList = useSelector(state => state.cart.cartOrderList);

    let dispatch = useDispatch();

    console.log(cartOrderList);

    let productitem = productlist.find(item => item.id === props.productId);
    // const [value, setValue] = useState(null);
    let value = null;
    if (cartOrderList.length > 0) {
        console.log("enteres");
        console.log(props.productId);
        console.log(cartOrderList.find(item => item.productId === props.productId))
        value = cartOrderList.find(item => item.productId === props.productId).value;
        // setValue(cartOrderList.find(item => item.productId === props.productId).value);
    }

    // console.log("value");
    // console.log(value);

    const deletedata = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/cart/'+`${props.id}`, {
            method : 'DELETE',
            mode: "cors",
            headers: { 
              "Access-Control-Allow-Origin": "*", 
              "Content-Type": "application/json"   
            }
        }) ;
        const data = await response;
    }

    const removeHandler = async () => {
        deletedata() ;
        dispatch(cartActions.removeitemfromcart({
            productId : props.productId,
            status : 0
        }));
    }

    return (
        <div>
            <div key={props.id} style={{ backgroundColor: 'white', paddingLeft: "25px" }}>
                <b> <i>{productitem.title}</i> </b>
                <p> Quantity : {props.quantity} </p>
                <span> Price : <i>{productitem.price + " INR"}</i> </span><span></span>
                {value === false && <Fragment>
                    <p style={{color:"red"}}><i>Out of Stock</i></p>
                    <button key={props.productId} type="button" style={{borderColor:"rgba(40, 30, 94, 0.932)", borderStyle:"solid", borderRadius:"5px", backgroundColor:"transparent", color:"rgba(40, 30, 94, 0.932)"}} onClick={removeHandler}> Remove </button>
                </Fragment>}
                <hr style={{ borderStyle: " 3px solid" }} />
            </div>
            <br />
        </div>
    );
}

export default Checkoutcartitem;
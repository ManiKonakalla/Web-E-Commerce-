import React, { useEffect, useState } from 'react';
import classes from "./Product.module.css";

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../Store/store'

function Productitem(props) {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const cartitemslist = useSelector((state) => state.cart.cartlist);
    const role = useSelector((state) => state.user.role);

    const [productcartstate, setProductcartstate] = useState(false);
    const [quantity, setQuantity] = useState(0);

    let quantityValue = quantity ;

    

    const fetchData = async () => {

        if( quantity===0 ) {
            setQuantity(1) ;
            quantityValue = 1;
        }
        let item = {
            userId: userId,
            productId: props.id,
            quantity: quantityValue,
            price: props.price
        }
        const requestbody = {
            method: 'POST',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }
        const response = await fetch('http://localhost:8080/ecommerce/cart', requestbody);
        const data = await response.json();

        if (response.ok) {
            dispatch(cartActions.additemtocart({
                id: data.cartId,
                userId: userId,
                productId: props.id,
                //productTitle : props.title,
                quantity: quantityValue,
                price: props.price,
                // productDecription : null,
                // stock : null,
                // owner : null
            }));
            setProductcartstate(true);
        }
        else {
            console.log("failed");
        }
    }

    useEffect(() => {
        const existingItem = cartitemslist.find(item => item.productId === props.id);
        if (existingItem) {
            setProductcartstate(true);
            setQuantity(existingItem.quantity);
        }
    }, [props.id]);


    const cartClickHandler = () => {

        if (productcartstate) {
            console.log("item exists in cart");
        }
        else {
            fetchData();
        }
    }

    const editProductHandler = () => {
        props.editProductIdHandler(props.id);
        props.editProductHandler();
    }

    const setUrl = (response) => {
        let binaryString = window.atob(response);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        const url = URL.createObjectURL(new Blob([bytes]));
        console.log(url);
        return url;
    };

    const decreaseHandler = () => {
        setQuantity(quantity-1);
        quantityValue = quantity-1;
    }

    const increaseHandler = () => {
        setQuantity(quantity+1);
        quantityValue = quantity+1;
    }

    const deleteProductHandler = async () => {
        props.deleteProductIdHandler(props.id);
        props.deleteProductHandler();
    }

    let bstyle = null;
    if( !props.active ) {
        bstyle="#D3D3D3";
    }

    return (

        <div className={classes.gridcontainer} style={{ width:"470px", height:"270px", backgroundColor:bstyle}} >
            <div className={classes.griditem} style={{backgroundColor:bstyle}}>
                <img
                    src={setUrl(props.image)}
                    alt="image"
                    width="150px"
                    height="150px"
                ></img></div>
            <div>
                <div className={classes.griditem} style={{backgroundColor:bstyle}}>
                <p ><b> {props.title} </b></p>
                <p style={{whiteSpace:"pre-wrap"}}><i> {props.description} </i></p>
                <p>Price : <b> {props.price + " "}INR</b></p>
                {role === "customer" && props.stock === 0 ?
                    <i style={{ color: "red" }}> Out of stock </i>
                    :
                    null
                }
                {role === "admin" && <p>Stock : <i>{props.stock}</i> </p>}
                {role === "customer" && props.stock > 0 && <p>Quantity : {quantity}x</p>}
                { role === "customer" && props.stock > 0 && !(productcartstate) && <div>
                    <button key={props.key + 'dec'} style={{backgroundColor:"transparent", borderStyle:"none"}} disabled={quantity<=0} onClick={decreaseHandler}><i class="bi bi-arrow-down-circle-fill"></i></button>
                    <button key={props.key + 'inc'} style={{backgroundColor:"transparent", borderStyle:"none"}} disabled={props.stock-quantity <= 0} onClick={increaseHandler}><i class="bi bi-arrow-up-circle-fill"></i></button>
                </div>}
                {props.stock > 0 && role === "customer" && <button class="btn btn-primary" style={{ backgroundColor: "rgba(40, 30, 94, 0.932)" }} key={props.key} disabled={productcartstate || props.stock == 0} onClick={cartClickHandler}> {productcartstate ? "Added to cart" : "Add to cart"}  </button>}
                {role === "admin" && <button class="btn btn-primary" 
                                            style={{ backgroundColor: "rgba(40, 30, 94, 0.932)" }} 
                                            key={props.key+"edit"} 
                                            onClick={editProductHandler} > 
                                            Edit  
                                    </button>}
                { role==="admin" && <span style={{paddingRight:"30px"}}></span>}
                {role === "admin" && <button class="btn btn-primary" 
                        style={{ backgroundColor: "rgba(40, 30, 94, 0.932)" }} 
                        key={props.key+"delete"} 
                        onClick={deleteProductHandler} > 
                        Delete
                </button>}
            </div>
            </div>
        </div>

    );

}

export default Productitem;
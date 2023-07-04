import React from 'react' ;
import { useEffect } from 'react';
import classes from "./Checkoutcart.module.css";

import { useDispatch, useSelector } from 'react-redux';
import { addressActions } from '../Store/store';
import Checkoutcartitem from './Checkoutcartitem';


function Checkoutcart () {

    const dispatch = useDispatch();
    const cartitemslist = useSelector((state) => state.cart.cartlist);
    const totalAmount = useSelector( (state) => state.cart.totalAmount );
    const totalQuantity = useSelector( (state) => state.cart.totalQuantity ) ;
    const userId = useSelector( (state) => state.user.userId );

    const productlist = useSelector( (state) => state.product.productlist );
    let productitem = null;
    

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        }        
    }

    const fetchAddressData = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/useraddressesbyuserid/'+`${userId}`, requestbody) ;
        const data = await response.json();

        const addresslist = data.map((item) => {
            return {
                addId : item.addId,
                city : item.city,
                hno : item.hno,
                name : item.name,
                pincode : item.pincode,
                state : item.state,
                street : item.street,
                phonenumber : item.phonenumber,
                country : item.country,
                addstring : item.hno+", "+item.street+", "+item.city+"-"+item.pincode+", "+item.state+", "+item.country
            }
        });

        console.log(addresslist);
        dispatch(addressActions.setuseraddress(addresslist));
        
    }

    useEffect ( () => {
        fetchAddressData() ;
    }, []) ;

    return(
        <div style={{backgroundColor:"white"}}>
            <br />
            <h4 style={{textAlign:"center"}}>Cart Items</h4>
            <hr style={{borderStyle:"solid"}} />
            <div style={{backgroundColor:"white"}} className={classes.example}>                
                {
                    cartitemslist.map( (item) => (
                        <Checkoutcartitem id={item.id} productId={item.productId} quantity={item.quantity} />
                        )
                    )
                } 
            </div>   
            <hr style={{borderStyle:"solid"}} />             
            <h6 style={{textAlign:"center"}}> Total Quantity : {totalQuantity}</h6>
            <h6 style={{textAlign:"center"}}> Total Amount : {totalAmount}</h6>
            <br />
        </div>
    );
}

export default Checkoutcart;
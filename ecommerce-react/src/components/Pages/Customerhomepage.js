import React, { Fragment, useEffect, useState } from 'react';
import Cartmodal from '../Customernav/Cartmodal';
import Navigation from '../Customernav/Navigation';
import Categories from '../Productspage/Categories';
import Products from '../Productspage/Products';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../Store/store';
import Customerorders from './Customerorders';

function Customerhomepage() {

    const dispatch = useDispatch();
    const cartitemslist = useSelector((state) => state.cart.cartlist);
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state.user.userId);
    const [productmodal, setProductmodal] = useState(false);
    const [categorymodal, setCategorymodal] = useState(false);
    const [load, setLoad] = useState(true);
    const [loadp, setLoadp] = useState(true);
    const [cartload, setCartload] = useState(true);
    const [ editProduct, setEditProduct ] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const pid = null;
    

    const [id, setId] = useState("");
    const [cart, setCart] = useState(false);
    const [cartfetch, setCartfetch] = useState(false);

    const [showProducts, setShowProducts] = useState(true);

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        }        
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/cartbyuserid/'+`${userId}`, requestbody) ;
        const data = await response.json();

        let cartlist = data.map((item) => {
            return {
                id : item.cartId,
                userId : item.userId,
                productId : item.productId,
                quantity : item.quantity,
                price : item.price
            }
        });       

        dispatch(cartActions.addcartitems(cartlist));
        setCartfetch(true);
    }

    useEffect ( () => {
        fetchData() ;
    }, []) ;

    const cartHandler = () => {
        setCart(!cart) ;
        setCartload(!cartload);
    }

    const cartClickHandler = () => {
        setCart(!cart);
        setCartload(!cartload);
        //window.location.reload(false);
    }

    const productmodalHandler = () => {
        setProductmodal(!productmodal);
        setLoadp(!true);
    }

    const categorymodalHandler = () => {
        setCategorymodal(!categorymodal);
        setLoad(!true);
    }

    const editProductHandler = () => {
        setEditProduct(!editProduct) ;
        setLoadp(!true);
    }

    const reload = () => {
       setLoad(!true);
    }

    const reloadp = () => {
        setLoadp(!loadp);
    }

    const cartreload = () => {
        setCartload(!cartload);
    }

    const deleteProductHandler = () => {
        setDeleteProduct(!deleteProduct);
    }

    const ordersHandler = () => {
        setShowProducts(false) ;
    }

    return (
        <div style={{backgroundColor:"white"}}>
        { (cartfetch) && <Fragment>
            <div >
                <Navigation clickHandle={cartClickHandler} ordersHandler={ordersHandler} clickCategoryHandler={setCategorymodal} clickProductHandler={setProductmodal}/>
            </div>
            {cart && <Cartmodal key="cart" clickHandle={cartHandler} reload={cartreload}/>}
            <br />
            <br />                   
            <div class="row">
                <div class="col-sm-2" >
                <Categories setShowProducts={setShowProducts} setId={setId} load={load}/>
                </div> 
                <div class="col-sm-10"style={{backgroundColor:"white"}} >
                <br />
                {
                    showProducts && <Products id={id} load={loadp} cartload={cartload} editProductHandler={editProductHandler} deleteProductHandler={deleteProductHandler} deleteProductIdHandler={setDeleteProductId} editProductIdHandler={setEditProductId}/>
                }
                {
                    !showProducts && <Customerorders />
                }
                
                </div>
            </div>
        </Fragment>}
        </div>
    );

}

export default Customerhomepage;
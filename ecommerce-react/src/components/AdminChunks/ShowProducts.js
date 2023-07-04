import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../Productspage/Product.module.css";
import Productitem from "../Productspage/Productitem";
import { productActions } from "../Store/store";

function ShowProducts(props) {

    const userId = useSelector((state) => state.user.userId);
    let dispatch = useDispatch();

    const [products, setProducts] = useState([]) ;
    const role = useSelector((state) => state.user.role);

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: {
  
          "Access-Control-Allow-Origin": "*",
  
          "Content-Type": "application/json" 
  
        }        
    }

    const fetchData = async (id) => {
        const response = await fetch( "http://localhost:8080/ecommerce/"+ `${id ? ("productsbycatid/" + id +"/" + 0) : 'products'}`, requestbody) ;
        const data = await response.json();

        const productslist = data.map((item) => {
            return {
                id : item.productId,
                title : item.title,
                description : item.description,
                price : item.price,
                stock : item.stock,
                image : item.image,
                owner : item.owner,
                image : item.image,
                categoryId : item.categoryId,
                isActive : item.active
            }
        });

        
        if( !id ) {
            console.log(productslist);
            dispatch(productActions.setProductlist(productslist));
                        
        }

        setProducts(productslist);
    }

    useEffect(() => {
        fetchData(props.id);

    }, [props.id, props.load, props.cartload]);

    const editProductHandler = () => {
        props.editProductHandler();
    }

    const deleteProductHandler = () => {
        props.deleteProductHandler();
    }

    

    return(
        <Fragment>
            <div className={classes.gridcontainer} >
            {products.map((product) => (
                <Fragment>
                { (product.isActive || role==="admin") && <Fragment>
                    <div className={classes.griditem} >
                    <Productitem
                        key={product.id}   
                        id={product.id} 
                        title={product.title} 
                        description={product.description} 
                        price={product.price} 
                        stock={product.stock} 
                        image={product.image} 
                        active={product.isActive}
                        editProductHandler={editProductHandler} 
                        deleteProductHandler={deleteProductHandler}
                        editProductIdHandler={props.editProductIdHandler}
                        deleteProductIdHandler={props.deleteProductIdHandler}/>
                    <br />
                    </div>
                </Fragment>}
                </Fragment>
            ) )}
        </div>

        </Fragment>
    ) ;

}

export default ShowProducts;
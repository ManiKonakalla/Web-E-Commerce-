import React, { useEffect, useState } from "react";
import classes from "./RecentlyProduct.module.css";

function OutOfStock(props) {

    const [productList, setProductList] = useState([]);

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

    const productListfun = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        let plist = [];
        {
            data.map(product => {
                if (product.stock === 0) {
                    plist.push(product);
                }
            })
        }
        setProductList(plist);

    }

    useEffect(() => {
        productListfun();
    }, []);

    return (
        // <div style={{backgroundColor:"honeydew"}}>
        //     <p>Out of Stock Products : </p>
        //     {
        //         productList.map( product => (
        //             <div>
        //                 <p> Name : {product.title} </p>
        //                 <p> Price : {product.price} </p>
        //             </div>    
        //         ))
        //     }

        // </div>
        <div className={classes.example} style={{ backgroundColor:"lavenderblush", borderColor: "gray", border:"1px solid rgba(0, 0, 0, 0.8)" }}>
            <div >
                <h6 style={{ fontWeight: "bold", paddingLeft: "50px" }}> Out of Stock Products  </h6>
            </div>
            <div className={classes.gridcontainer}>
                {
                    productList.map(product => (
                        <div className={classes.griditem} style={{ backgroundColor: "lavenderblush" }} key={product.productId} >
                            <div style={{ paddingTop: "5px" }} className={classes.gridcontainer2}>

                                <div className={classes.griditem2}>
                                    <img
                                        src={setUrl(product.image)}
                                        backgroundColor="gray"
                                        alt="image"
                                        width="100px"
                                        height="100px"
                                    ></img>

                                </div>
                                <div className={classes.griditem2}>
                                    <p> <b>{product.title}</b> </p>
                                    <p> Price : {"Rs. " + product.price} </p>
                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>



        </div>


    );

}

export default OutOfStock;
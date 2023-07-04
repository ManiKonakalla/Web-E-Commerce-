import React from "react";

import classes from "./RecentlyProduct.module.css";

function RecentlyProduct(props) {

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

    return (

        <div className={classes.example} style={{borderColor:"gray", border:"1px solid rgba(0, 0, 0, 0.8)"}}>
            <div >
                <h6 style={{ fontWeight: "bold", paddingLeft: "50px" }}> Recently {props.name} Products </h6>
            </div>
            <div className={classes.gridcontainer}>
                {
                    props.products.map(product => (
                        <div className={classes.griditem} style={{ backgroundColor: "lavenderblush" }} key={product.productId} >
                            <div style={{paddingTop:"5px"}} className={classes.gridcontainer2}>
                              
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
                                    <p> Price : {"Rs. "+product.price} </p>
                                    <p> Stock : {product.stock} </p>
                                </div>
                            
                            </div>

                        </div>

                    ))
                }

            </div>



        </div>

    );

}

export default RecentlyProduct;
import React from "react";

import classes from "../../Productspage/Product.module.css";

function Profit(props) {

    return (
        <div style={{paddingTop:"25px"}}>
            <div className={classes.gridcontainer} style={{ width: "250px", height: "105px" }}>
                <div className={classes.griditem}>
                    <i class="bi bi-cash-coin" style={{ fontSize: "30px", backgroundColor: "orange", borderRadius: "5px" }}></i>
                </div>
                <div className={classes.griditem}>
                    <h6 style={{ fontWeight: "bold", textAlign:"center" }}> Earnings </h6>
                    <p style={{fontSize:"11px", fontStyle:"italic"}}>Earnings for the last 7 days sums upto <b>{props.value+" INR"}</b>  </p>
                </div>
            </div>
        </div>
    );

}

export default Profit;
import React from "react";

import classes from "../../Productspage/Product.module.css";

function OrderPart(props) {

    return (
        <div>
            <div className={classes.gridcontainer} style={{width:"250px", height:"110px"}}>
                <div className={classes.griditem}>
                    <i class={props.logo} style={{ fontSize: "30px", backgroundColor:"orange", borderRadius:"5px" }}></i>
                </div>
                <div className={classes.griditem}>
                    <h6 style={{fontWeight:"bold", textAlign:"center" }}> {"Orders "+props.pos} </h6>
                    {
                        props.pos==="Placed" && <p style={{fontSize:"11px", fontStyle:"italic"}}><b>{props.value}</b> orders have been {props.pos} and wants to be shipped during last 7 days </p>
                    }
                    {
                        props.pos==="Ship" && <p style={{fontSize:"11px", fontStyle:"italic"}}><b>{props.value}</b> orders have been {props.pos+"ed"} and are in their way during last 7 days </p>
                    }
                    {
                        props.pos==="In-transit" && <p style={{fontSize:"11px", fontStyle:"italic"}}><b>{props.value}</b> orders have been in {props.pos} stage and yet to be reached during last 7 days </p>
                    }
                    {
                        props.pos==="Delivered" && <p style={{fontSize:"11px", fontStyle:"italic"}}><b>{props.value}</b> orders have been {props.pos} and reached their destination during last 7 days </p>
                    }
                    {
                        props.pos==="Rejected" && <p style={{fontSize:"11px", fontStyle:"italic"}}><b>{props.value}</b> orders have been {props.pos} due to insufficient stock during last 7 days </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderPart;
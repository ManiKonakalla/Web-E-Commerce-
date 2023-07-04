import React, { Fragment, useEffect, useState } from "react";
import classes from "./OrderPlaceConfirm.module.css";
import Card from "../UI/Card";

function OrderPlaceConfirm(props) {

    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (props.orderConfirm === "no") {
            setMsg(" Order can't be placed as some of the products are out of stock. Remove them from the list to continue to place the order. ");
        }
        else {
            setMsg("Are you sure you want to place the order?");
        }
    }, []);

    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

    return (
        <div>
            <div className={classes.backdrop} onClick={props.clickHandle} />
            {msg && <Card className={classes.modal}>
                <br />
                <p style={{ textAlign: "center" }}>{msg}</p>
                <div style={{ textAlign: "center" }}>
                    {
                        props.orderConfirm === "confirm" && <Fragment>
                            <button type="button" style={butstyle} onClick={() => props.clickHandle("place")}> place </button>
                            <span style={{paddingRight:"20px"}}></span>
                        </Fragment>
                    }
                    <button type="button" style={butstyle} onClick={() => { props.clickHandle("close")}}> close </button>
                </div>
                <br />
            </Card>}
        </div>
    );

}

export default OrderPlaceConfirm;
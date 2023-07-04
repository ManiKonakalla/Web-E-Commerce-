import React, { Fragment, useEffect, useState } from "react";
import classes from "./DeleteProduct.module.css";
import Card from "../UI/Card";

function DeleteProduct(props) {

    const [msg, setMsg] = useState(null);
    const [stage, setStage] = useState(null);
    const [success, setSuccess] = useState(null);

    const ordersCheck = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/products/' + `${props.productId}`, {
            method: 'GET',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        });
        const data = await response.json();
        if (data.ordersLines.length > 0) {
            setMsg("Some orders exist for this product");
            setStage(1);
        }
        else {
            setMsg("Are you sure you want to delete the product?");
            setStage(2);
        }
    }

    useEffect(() => {
        if (props.value === "product") {
            ordersCheck();
        }
        else if (props.value === "addressCant") {
            setMsg(props.productId);
        }
        else {
            setMsg("Are you sure you want to delete this address?");
        }
    }, []);

    const deleteHandler = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/products/' + `${props.productId}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        });
        const data = await response;

        setSuccess("Product deleted Successfully");
        props.reload();
    }

    const deactivateHadler = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/deactivateProduct?productId=' + `${props.productId}`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        const data = await response;

        setSuccess("Product deactivated Successfully");
        props.reload();
    }

    const deleteAddressHandler = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/useraddress/' + `${props.productId}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        });
        const data = await response;

        setSuccess("Address deleted Successfully");
    }

    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

    return (
        <div>
            <div className={classes.backdrop} onClick={props.clickHandle} />
            {msg && <Card className={classes.modal}>
                <br />
                {success && <p style={{ textAlign: "center", color: "rgba(40, 30, 94, 0.932)" }}>{success}</p>}
                {props.value === "product" && <Fragment>
                    {!success ? <Fragment><p style={{ textAlign: "center" }}>{msg}</p>
                        {
                            stage === 1 && <Fragment>
                                <div style={{ textAlign: "center" }}>
                                    <button type="button" style={butstyle} onClick={deactivateHadler}> Deactivate</button>
                                    <span style={{ paddingRight: "20px" }}></span>
                                    <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                                </div>
                                {/* <span style={{ paddingLeft: "90px" }}></span>
                                <button type="button" style={butstyle} onClick={deactivateHadler}> Deactivate</button> */}
                            </Fragment>
                        }
                        {
                            stage === 2 && <Fragment>
                                <div style={{ textAlign: "center" }}>
                                    <button type="button" style={butstyle} onClick={deleteHandler}> Delete </button>
                                    <span style={{ paddingRight: "20px" }}></span>
                                    <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                                </div>
                                {/* <span style={{ paddingLeft: "110px" }}></span>
                                <button type="button" style={butstyle} onClick={deleteHandler}> Delete </button> */}
                            </Fragment>
                        }
                    </Fragment>
                        :
                        <Fragment>
                            {props.value !== "cantdelete" && <Fragment>
                                <div style={{ textAlign: "center" }}>
                                    <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                                </div>

                            </Fragment>}
                        </Fragment>
                    }
                </Fragment>}
                {
                    props.value !== "product" && props.value !== "addressCant" && !success ? <Fragment>
                        <p style={{ textAlign: "center" }}> {msg} </p>
                        <div style={{ textAlign: "center" }}>
                            <button type="button" style={butstyle} onClick={deleteAddressHandler}> Delete</button>
                            <span style={{ paddingRight: "20px" }}></span>
                            <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                        </div>
                        {/* <span style={{ paddingLeft: "90px" }}></span>
                        <button type="button" style={butstyle} onClick={deleteAddressHandler}> Delete</button> */}
                    </Fragment>
                        :
                        <Fragment>
                            {props.value !== "product" && props.value !== "addressCant" && <div style={{ textAlign: "center" }}>
                                <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                            </div>}
                        </Fragment>
                }
                {
                    props.value === "addressCant" && <Fragment>
                        <p style={{ textAlign: "center", paddingLeft: "40px", paddingRight: "40px" }}> {msg} </p>
                        <div style={{ textAlign: "center" }}>
                            <button type="button" style={butstyle} onClick={props.clickHandle}> close </button>
                        </div>
                    </Fragment>
                }
                {/* <span style={{ paddingLeft: "30px" }}></span>
                <button type="button" style={butstyle} onClick={props.clickHandle}> close </button> */}
                <br />
                <br />
            </Card>}
        </div>
    );

}

export default DeleteProduct;
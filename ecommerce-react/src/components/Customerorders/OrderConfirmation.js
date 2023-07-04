import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '../UI/Card';
import classes from './OrderConfirmation.module.css';
import { useSelector } from 'react-redux';


import jsPDF from "jspdf";
import "jspdf-autotable";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgba(40, 30, 94, 0.932)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 300
    },
});

let productTitle = null;

function productName(id, productlist) {

    let productitem = productlist.find(item => item.id === id);
    productTitle = productitem.title;
    // console.log("check");
}

function OrderConfirmation(props) {

    const styleClasses = useStyles();
    const userId = useSelector( state => state.user.userId);
    const username = useSelector( state => state.user.username);

    const productlist = useSelector((state) => state.product.productlist);
    const cartList = useSelector((state) => state.cart.cartlist);
    const addresslist = useSelector((state) => state.address.addresslist);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const [address, setAddress] = useState(null);
    const [billAddress, setBillAddress] = useState(null);

    const [orderId, setOrderId] = useState(null);

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        }        
    }

    const fetchBillData = async () => {

        let addresponse = await fetch('http://localhost:8080/ecommerce/useraddressesbyuserid/'+`${userId}`, requestbody) ;
        if (addresponse.ok) {
            let adddata = await addresponse.json();
            {
                adddata.map( address => {
                    if( address.bill === true ) {
                        setBillAddress({
                            name : address.name,
                            phonenumber : address.phonenumber,
                            addstring : address.hno+", "+address.street+", "+address.city+"-"+address.pincode+", "+address.state+", "+address.country
                        }) ;
                    }
                })
            }
        }
        else {
        console.log("failed to fetch");
        }
    }

    const getOrderId = async () => {
        let response = await fetch('http://localhost:8080/ecommerce/getRecentOrder?userId='+`${userId}`, {
            method : "PUT",
            mode : "cors",
            headers: { 
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"   
            }   
        }) ;
        setOrderId(await response.text());
        console.log(orderId);
    }

    useEffect(() => {

        let addid = props.add;
        {
            addresslist.map(item => {
                if (item.addId === Number(addid)) {
                    console.log(item.addId);
                    setAddress(item);
                }
            })
        }

        fetchBillData();
        getOrderId();
        console.log(address);
    }, []);

    const pdfDownloadHandler = () => {

        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(10);

        const title = "Placed Order Details";
        const headers = [["Product Name", "Unit Price", "Quantity", "Total"]];

        //const data = this.state.people.map(elt => [elt.name, elt.profession]);
        const data = [];
        {
            cartList.map(item => {
                productName(item.productId, productlist);
                data.push([productTitle, item.price, item.quantity, (item.price * item.quantity)]);
            })
        }

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text("Your Mart", marginLeft, 20);
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);

        doc.text("Total Quantity :", marginLeft, 220);
        doc.text( String(totalQuantity), marginLeft, 240);

        doc.text("Total Price :", marginLeft, 260);
        doc.text( String(totalAmount), marginLeft, 280);

        doc.text(" Billing Address : ", marginLeft, 300);
        doc.text(String(billAddress.name), marginLeft, 320);
        doc.text(String(billAddress.addstring), marginLeft, 340);
        doc.text( String(billAddress.phonenumber), marginLeft, 360);
        
        doc.text(" Shipping Address : ", marginLeft, 380);
        doc.text(String(address.name), marginLeft, 400);
        doc.text(String(address.addstring), marginLeft, 420);
        doc.text( String(address.phonenumber), marginLeft, 440);
        doc.save("#"+orderId+".pdf");

    }

    let butstyle = { borderColor: "rgba(40, 30, 94, 0.932)", borderStyle: "solid", borderRadius: "5px", backgroundColor: "transparent", color: "rgba(40, 30, 94, 0.932)" };

    return (
        <div>
            <div className={classes.backdrop} />
            {address && <Card className={classes.modal}>
                <br />
                <h4 style={{ textAlign: "center" }}> Placed Order Details: </h4>
                <br />
                <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                    <TableContainer component={Paper}>
                        <Table className={styleClasses.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Product Name</StyledTableCell>
                                    <StyledTableCell align="center">Unit Price( Rs )</StyledTableCell>
                                    <StyledTableCell align="center">Quantity</StyledTableCell>
                                    <StyledTableCell align="center">Total Price( Rs )</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartList.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        {productName(row.productId, productlist)}
                                        <StyledTableCell component="th" scope="row">
                                            {productTitle}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.price}</StyledTableCell>
                                        <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                        <StyledTableCell align="center"> {row.price * row.quantity} </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br />
                <div>
                    <p style={{ paddingLeft: "15px" }}> <b>Total Amount</b> : {totalAmount + " INR"} </p>
                    <p style={{ paddingLeft: "15px" }}> <b>Total Quantity</b> : {totalQuantity} </p>
                </div>
                <div class="row">
                    { billAddress && <div class="col-sm-6" style={{ paddingLeft: "30px" }}>
                        <label>
                            <h5> Billing Address : </h5>
                            <p style={{ paddingLeft: "15px" }}>{billAddress.name}</p>
                            <p style={{ paddingLeft: "15px" }}>{billAddress.addstring}</p>
                            <p style={{ paddingLeft: "15px" }}>{billAddress.phonenumber}</p>
                        </label>
                    </div>}
                    <div class="col-sm-6" style={{ paddingLeft: "15px" }}>
                        <label>
                            <h5> Shipping Address : </h5>
                            <p style={{ paddingLeft: "15px" }}>{address.name}</p>
                            <p style={{ paddingLeft: "15px" }}>{address.addstring}</p>
                            <p style={{ paddingLeft: "15px" }}>{address.phonenumber}</p>
                        </label>
                    </div>

                </div>

                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                    <button type="button" style={butstyle} onClick={pdfDownloadHandler}>
                        <b>Download</b>
                    </button>
                    <span style={{ paddingLeft: "20px" }}> </span>
                    <button type="button" style={butstyle} onClick={props.clickHandle}>
                        <b>close</b>
                    </button>
                </div>
                <br />
            </Card>}
        </div>
    );

}

export default OrderConfirmation;
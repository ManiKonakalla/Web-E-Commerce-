import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector } from 'react-redux';
import Orderlinerow from './Orderlinerow';
import OrderTableAddress from './OrderTableAddress';


import jsPDF from "jspdf";
import "jspdf-autotable";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const productlist = useSelector((state) => state.product.productlist);

  const [address, setAddress] = useState(null);
  const [billAddress, setBillAddress] = useState(null);

  let productitem = null;

  const cancelHandler = async (orderId) => {

    const response = await fetch('http://localhost:8080/ecommerce/orders/' + `${orderId}`, {
      method: 'DELETE',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
    });

    const data = await response;
    props.clickLoad();
  }

  let productTitle = null;
  let productPrice = null;
  function productName(id, productlist) {

    let productitem = productlist.find(item => item.id === id);
    productTitle = productitem.title;
    productPrice = productitem.price;
    // console.log("check");
  }

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
        row.ordersLines.map(item => {
            productName(item.productId, productlist);
            data.push([productTitle, productPrice, item.quantity, (item.price * item.quantity)]);
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

    doc.text("Total Price :", marginLeft, 260);
    doc.text( String(row.amount), marginLeft, 280);

    doc.text(" Billing Address : ", marginLeft, 300);
    doc.text(String(billAddress.name), marginLeft, 320);
    doc.text(String(billAddress.addstring), marginLeft, 340);
    doc.text( String(billAddress.phonenumber), marginLeft, 360);

    doc.text(" Shipping Address : ", marginLeft, 380);
    doc.text(String(address.name), marginLeft, 400);
    doc.text(String(address.addstring), marginLeft, 420);
    doc.text( String(address.phonenumber), marginLeft, 440);
    doc.save("#"+row.orderId+".pdf");

  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {"#" + row.orderId}
        </TableCell>
        <TableCell>{row.amount + " INR"}</TableCell>
        <TableCell>{row.orderedDate}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          <button type="button" disabled={(row.status === "Ship" || row.status === "In-transit") ? true : false} style={{ backgroundColor: row.status === "Ship" || row.status === "In-transit" ? 'lightgray' : 'blue', borderRadius: '5px', borderStyle: "none" }} onClick={() => cancelHandler(row.orderId)}><i style={{ color: "white" }}>  Cancel  </i> </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div class="row">
                <div class="col-sm-5">
                  <Typography variant="h6" gutterBottom component="div">
                    <b style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px" }}>Shipping Address</b>
                  </Typography>

                  <OrderTableAddress setAddress={setAddress} addId={row.addId} type="ship" />
                </div>
                <div class="col-sm-5">
                  <Typography variant="h6" gutterBottom component="div">
                    <b style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px" }}>Billing Address</b>
                  </Typography>
                  <OrderTableAddress setAddress={setBillAddress} addId={row.addId} type="bill" />
                </div>
                <div class="col-sm-1">
                  <button onClick={pdfDownloadHandler} style={{borderStyle:"solid", borderColor:"rgba(40, 30, 94, 0.932)", backgroundColor:"transparent", color:"rgba(40, 30, 94, 0.932)", borderRadius:"5px"}}> Download </button>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <b style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px" }}>Order Details</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Product Id</TableCell> */}
                    <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Product Name</b></TableCell>
                    <TableCell ><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Unit Price</b></TableCell>
                    <TableCell ><b style={{ color: "rgba(40, 30, 94, 0.932)" }}> Quantity</b></TableCell>
                    <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }} >Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ordersLines.map((insideRow) => (
                    <Orderlinerow key={insideRow.orderLineId} orderLineId={insideRow.orderLineId} productId={insideRow.productId} quantity={insideRow.quantity} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <b style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px" }}>Order Tracking</b>
              </Typography>
              {
                row.status === "Rejected" ?
                  <span><b>Rejected</b></span>
                  :
                  <div>
                    <span> {row.status !== "Rejected" ? <b>Placed</b> : "Placed"} </span>
                    <span> {(row.status === "Rejected" || row.status === "Placed") ? "----Ship" : <b>----Ship</b>}</span>
                    <span> {row.status === "In-transit" || row.status === "Delivered" ? <b>----In-transit </b> : "----In-transit "}</span>
                    <span> {row.status === "Delivered" ? <b>----Delivered</b> : "----Delivered"}</span>

                  </div>

              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    ordersLines: PropTypes.arrayOf(
      PropTypes.shape({
        orderLineId: PropTypes.number.isRequired,
        orderId: PropTypes.number.isRequired,
        productId: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ).isRequired,

  }).isRequired,
};



function Customerordertable(props) {

  const loadHandler = () => {
    props.loadHandler();
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Order ID</b></TableCell>
              <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Amount</b></TableCell>
              <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Order Date</b></TableCell>
              <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Status</b></TableCell>
              <TableCell><b style={{ color: "rgba(40, 30, 94, 0.932)" }}>Actions</b>  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orderslist.map((row) => (
              <Row key={row.orderId} row={row} clickLoad={loadHandler} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

}

export default Customerordertable;
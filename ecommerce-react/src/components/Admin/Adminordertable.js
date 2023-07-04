import React from 'react';

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

import Orderlinerow from '../Customerorders/Orderlinerow';
import OrderTableAddress from '../Customerorders/OrderTableAddress';
import OrderUsername from './OrderUsername';
import AdminOrderTableAddress from './AdminOrderTableAddress';


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

  const statusUpdateHandler = async (orderId, status) => {

    const response = await fetch('http://localhost:8080/ecommerce/updateStatusByOrderId?orderId=' + `${orderId}` + '&status=' + `${status}`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
    });

    const data = await response;
    props.clickLoad();
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
          {row.orderId}
        </TableCell>
        <OrderUsername userId={row.userId} />
        <TableCell>{row.amount + " INR"}</TableCell>
        <TableCell>{row.orderedDate}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          <select disabled={row.status === "Rejected" || row.status === "Delivered" ? true : false} style={{ borderColor: "black" }} onChange={(event) => statusUpdateHandler(row.orderId, event.target.value)}>
            <option style={{ borderColor: "black" }} value="">select</option>

            {!(row.status === "In-transit" || row.status === "Delivered") && <option key="Ship" value="Ship">Ship</option>}
            {!(row.status === "Delivered") && <option key="In-transit" value="In-transit">In-transit</option>}
            {<option key="Delivered" value="Delivered"> Delivered </option>}

          </select>

          {/* <button key={row.orderId} disabled={ row.status==="Placed" ? false : true } style={{ backgroundColor: row.status==="Placed" ? 'green' : 'lightgray', borderRadius: '5px', borderStyle:"none" }} type="button" onClick={() => statusUpdateHandler(row.orderId, "Shipped")}><i style={{ color:"white"}}>  Shipped</i></button>
            <i>      </i> */}
          <button key={row.orderId} disabled={row.status === "Placed" ? false : true} style={{ backgroundColor: row.status === "Placed" ? 'red' : 'lightgray', borderRadius: '5px', borderStyle: "none" }} type="button" onClick={() => statusUpdateHandler(row.orderId, "Rejected")}><i style={{ color: "white" }}>Reject</i></button>
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
                  <AdminOrderTableAddress addId={row.addId} type="ship" />
                </div>
                <div class="col-sm-5">
                  <Typography variant="h6" gutterBottom component="div">
                    <b style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px" }}>Billing Address</b>
                  </Typography>
                  <AdminOrderTableAddress addId={row.addId} type="bill" />
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
              <Typography style={{ color: "rgba(40, 30, 94, 0.932)", fontSize: "13px", fontWeight: "bold" }} variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Product Id</TableCell> */}
                    <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Product Name</TableCell>
                    <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }} >Unit Price</TableCell>
                    <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }} >Quantity</TableCell>
                    <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }} >Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ordersLines.map((insideRow) => (
                    <Orderlinerow orderLineId={insideRow.orderLineId} productId={insideRow.productId} quantity={insideRow.quantity} />
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



function Adminordertable(props) {



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
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Username</TableCell>
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Order Date</TableCell>
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" }}>Actions</TableCell>
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

export default Adminordertable;
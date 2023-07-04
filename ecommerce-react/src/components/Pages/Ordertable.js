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
          <TableCell>{row.amount}</TableCell>
          <TableCell>23-09-2021</TableCell>
          <TableCell>{row.status}</TableCell>
          </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Id</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell >Price</TableCell>
                      <TableCell >Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.ordersLines.map((insideRow) => (
                      <TableRow key={insideRow.orderLineId}>
                        <TableCell component="th" scope="row">
                          {insideRow.productId}
                        </TableCell>
                        <TableCell>Kurthi</TableCell>
                        <TableCell>200</TableCell>
                        <TableCell>{insideRow.quantity}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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



function Ordertable(props) {

    return (
        <div>
            <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
             </TableRow>
        </TableHead>
        <TableBody>
          {props.orderslist.map((row) => (
            <Row key={row.orderId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    ) ;

}

export default Ordertable;
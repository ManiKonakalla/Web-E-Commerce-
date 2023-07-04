import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';

function Orderlinerow(props) {

    const productlist = useSelector( (state) => state.product.productlist );

    let productitem = productlist.find( item => item.id===props.productId );

    return(
        <TableRow key={props.orderLineId}>
            <TableCell component="th" scope="row">{productitem.title}</TableCell>
            <TableCell>{productitem.price}</TableCell>
            <TableCell>{props.quantity}</TableCell>
            <TableCell>{productitem.price*props.quantity}</TableCell>
            
        </TableRow>
    ) ;

}

export default Orderlinerow;
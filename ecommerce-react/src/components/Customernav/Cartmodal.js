import React, { Fragment } from 'react';

import Card from '../UI/Card';
import classes from './Cartmodal.module.css';

import { useSelector, useDispatch } from 'react-redux';
import Cartitem from './Cartitem';
import { useHistory } from 'react-router-dom';

const Cartmodal = (props) => {

    const dispatch = useDispatch();
    const userId = useSelector((state)=> state.user.userId);
    const cartitemslist = useSelector((state) => state.cart.cartlist);
    const cartquantity = useSelector((state) => state.cart.totalQuantity);
    const cartprice = useSelector((state) => state.cart.totalAmount);

    let history = useHistory();

    let len = cartitemslist.length;

    if( len === 0 ) {
      len = null;
    }
    
    const checkoutHandler = () => {
      history.push("/customerhome/checkout");
    }

    const reloadHandler = () => {
      props.reload();
    }

  let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderWidth:"2px" , borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

  return (
    <div>
      <div className={classes.backdrop} onClick={props.clickHandle} />
      <Card className={classes.modal}>
        <ul style={{backgroundColor:"white"}}>
          <li><h2> <i className={classes.headname}><b>Cart</b></i> </h2></li>
          <li style={{float:"right"}}><button onClick={props.clickHandle} class="bi bi-x-circle-fill" style={{borderStyle:"none", backgroundColor:"transparent"}}></button></li>
        </ul>     
        <br />
        <br />
        <hr style={{borderTop:"2px solid black"}}/>

        {len && 
                <Fragment><div style={{backgroundColor:"white"}} className={classes.example}>
              <Fragment>
              {
                  cartitemslist.map( (item) => (
                    <Fragment>
                          <Cartitem reload={reloadHandler} key={item.id} cartId={item.id} productId={item.productId} quantity={item.quantity} price={item.price} />
                          <br />
                    </Fragment>
                      
                  ) ) 
              }  
              </Fragment>        
        </div>

        <hr style={{borderTop:"2px solid black"}}/></Fragment>}

        {
            len ? <Fragment >                        
                        <p className={classes.totaldiv}><b>Total Quantity</b> : <i>{cartquantity}</i></p>
                        <p className={classes.totaldiv}><b>Total Amount</b> : <i>{cartprice}</i></p>
                        <div style={{textAlign:"center"}}>
                        <button type="button" class="btn btn-primary" style={butstyle} onClick={checkoutHandler} ><b> Checkout</b> </button>
                        </div>
                        <br/>
                    </Fragment> 
               : <Fragment><h5 style={{textAlign:"center", color:"rgba(40, 30, 94, 0.932)"}} ><i class="bi bi-cart-x"></i> <b>Cart is empty</b> </h5><br /> <br /> </Fragment>
        }
        
      </Card>
    </div>
  );
};

export default Cartmodal;
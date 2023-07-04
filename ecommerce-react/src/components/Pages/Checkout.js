import React, { Fragment, useState } from 'react' ;
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Checkoutcart from '../Customerorders/Checkoutcart';
import Checkoutheader from '../Customerorders/Checkoutheader';
import OrderConfirmation from '../Customerorders/OrderConfirmation';
import Showaddress from '../Customerorders/Showaddress';
import { cartActions } from '../Store/store';

function Checkout() {

    let history = useHistory() ;
    let dispatch = useDispatch();

    const [orderConfirm, setOrderConfirm] = useState(false);
    const [addId, setAddId] = useState(null);

    const confirmToggle = () => {
        setOrderConfirm(!orderConfirm);
    }

    const confirmCloseHandler = () => {
        dispatch(cartActions.emptycart());
        dispatch(cartActions.emptyCartOrderList());
        setOrderConfirm(!orderConfirm);
        history.push("/customerhome");
    }

    const backHandler = () => {        
        dispatch(cartActions.emptyCartOrderList());
        history.replace("/customerhome") ;
    }

    let butstyle = { backgroundColor: "transparent", borderStyle: "none", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

    return(
        <Fragment>
            <Checkoutheader />
            { orderConfirm && <OrderConfirmation clickHandle={confirmCloseHandler} add={addId} /> }
            <br />
            <div >
                <button type="button" class="bi bi-arrow-left-circle-fill" style={butstyle} onClick={backHandler}><span style={{paddingLeft:"2px", fontWeight:"bold"}}>Back</span></button>
            </div>
            <div style={{width:"100%", paddingLeft:"10%"}} class="row">
                <div class="col-sm-3" >
                    <Checkoutcart />
                </div> 
                <div class="col-sm-7" >
                    <Showaddress saddId={setAddId} clickHandle={confirmToggle}/>
                    {/* <Addresscart /> */}
                </div>
            </div>
        </Fragment>
    ) ;

}

export default Checkout;
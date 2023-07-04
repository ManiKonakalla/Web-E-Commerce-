import React, { Fragment } from 'react';
import classes from './Navigation.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/store';

import { GoogleLogout } from 'react-google-login';

function Navigation(props) {

    const clientId = "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

    let history = useHistory();

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);
    const role = useSelector((state) => state.user.role);
    const isGoogleLogin = useSelector((state) => state.auth.isGoogleLogin);
    const cartList = useSelector(state => state.cart.cartlist);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const ordersHandler = () => {
        props.ordersHandler();
    }

    const adminordersHandler = () => {
        history.push("/adminhome/orders");
    }

    const profileHandler = () => {
        history.push("/profile");
    }

    const onSignoutSuccess = () => {
        console.clear();
        dispatch(authActions.logout());
    };

    return (

        <div style={{ position: "fixed", width: "100%" }}>
            <ul className={classes.topnav}>
                <li> <h4 className={classes.name}><i>YourMart</i></h4> </li>
                <li><h4 className={classes.order}> <i class="bi bi-house"></i> Home Page </h4></li>
                <li style={{ float: "right" }} className={classes.profile}><button type="button" className={classes.btn} onClick={profileHandler}><i class="bi bi-person-circle"></i> {username} </button></li>
                {!(isGoogleLogin) ?
                    <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={logoutHandler} className={classes.btn} ><i class="bi bi-box-arrow-left">  </i>Logout  </button> </li>
                    :
                    <li style={{ float: "right" }} className={classes.profile}>
                        <i class="bi bi-box-arrow-left"> Logout </i>
                        <GoogleLogout
                            clientId={clientId}
                            buttonText=""
                            onLogoutSuccess={onSignoutSuccess}
                            icon={false}
                            className={classes.glogout}
                        />
                    </li>
                }

                {role === "customer" && <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={ordersHandler} className={classes.btn} ><i class="bi bi-bookshelf">  </i> <i>Your Orders</i>  </button></li>}
                {role === "customer" && <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={props.clickHandle} className={classes.btn} > <i class="bi bi-cart" style={{ paddingLeft: "5px" }}> Cart  </i>
                    <span style={{ borderStyle: "solid", borderRadius: "25px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "rgba(140, 128, 206, 0.932)" }}>
                        {cartList.length}
                    </span>
                </button>
                </li>
                }
                {role === "admin" && <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={adminordersHandler} className={classes.btn} ><i class="bi bi-bookshelf">  </i> <i>view Orders</i>  </button></li>}
                {role === "admin" && <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={props.clickProductHandler} className={classes.btn} > <i>+Add Product</i>  </button></li>}
                {role === "admin" && <li style={{ float: "right" }} className={classes.profile}> <button type="button" onClick={props.clickCategoryHandler} className={classes.btn} > <i>+Add Category</i>  </button></li>}
            </ul>

        </div>
    );

}

export default Navigation;
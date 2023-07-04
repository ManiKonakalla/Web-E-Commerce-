import React, { Fragment, useState } from 'react';
import Card from '../UI/Card';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { useDispatch, useSelector } from 'react-redux';
import { authActions, userActions } from '../Store/store';

import { GoogleLogin } from 'react-google-login';


import styleclasses from "./Login.module.css";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textField: {
        width: '65%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 100,
    },
    input: {
        color: 'black',
        fontSize: "14px",
    },
    label: {
        fontSize: "14px",
        color: 'black',
    }

}));

const Login = (props) => {

    const classes = useStyles();

    const clientId = "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null);

    const [showusername, setShowusername] = useState(true);
    const [showpwd, setShowpwd] = useState(false);

    const [showpassword, setShowpassword] = useState(false);

    const [error, setError] = useState(null);

    let history = useHistory();

    const addUserHandler = (event) => {
        setUsername(event.target.value);
        setError(null);
    }

    const addPasswordHandler = (event) => {
        setPassword(event.target.value);
        setError(null);
    }

    const passwordHandler = () => {
        setShowpassword(!showpassword);
    }

    async function nextHandler(event) {
        event.preventDefault();

        let uname = username.trim();
        if (uname.length === 0) {
            setError("Username(Email) can't be empty");
        }
        else {
            const response = await fetch(
                "http://localhost:8080/ecommerce/usernameCheck?username=" + `${uname}`, {
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                method: "PUT",
            }
            );
            if (response.ok) {
                const data = await response.text();
                if (data === "-1") {
                    setError("Username doesn't exist");
                }
                else {
                    setError(null);
                    setUserId(data);
                    setShowusername(false);
                    setShowpwd(true);
                    setUsername(uname);
                }
            }
        }
    }

    const backHandler = (event) => {
        event.preventDefault();
        setShowusername(true);
        setShowpwd(false);
    }

    async function submitHandler(event) {
        event.preventDefault();

        let pwd = password.trim();
        if (pwd.length === 0) {
            setError(" Password should not be empty! ");
        }
        else {
            const response = await fetch(
                "http://localhost:8080/ecommerce/passwordCheck?userId=" + `${userId}` + '&password=' + `${pwd}`, {
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                method: "PUT",
            }
            );
            if (response.ok) {
                const data = await response.text();
                if (data === "wrong password") {
                    setError("Password is Invalid for this username!");
                }
                else {
                    dispatch(authActions.login(false));
                    const [user, tag] = username.split("@");
                    dispatch(userActions.setuserdetails({
                        userid: userId,
                        role: data,
                        username: user
                    }));

                    if (data === "customer") {
                        history.push("/customerhome");
                    }
                    else {
                        history.push("/adminHome");
                    }
                }
            }
        }
    }

    const signupHandler = () => {
        props.setSignin(false);
    }



    async function onLoginSuccess(res) {
        console.log(res.profileObj);
        console.log('Login Success:', res.profileObj.email, res.profileObj.googleId);
        const response = await fetch(
            "http://localhost:8080/ecommerce/usernameGoogleCheck?username=" + `${res.profileObj.email}`, {
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            method: "PUT",
        }
        );
        if (response.ok) {
            const data = await response.text();
            console.log(data);
            if (data === "no user") {
                setError("Username doesn't exist");
            }
            else {
                const [userid, role] = data.split(",")
                dispatch(authActions.login(true));
                const [user, tag] = res.profileObj.email.split("@");
                dispatch(userActions.setuserdetails({
                    userid: userid,
                    role: role,
                    username: user
                }));

                if (role === "customer") {
                    history.push("/customerhome");
                }
                else {
                    history.push("/adminHome");
                }


            }
        }

    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    let butStyle = { width: "100%", backgroundColor: "transparent", borderStyle: "solid", borderRadius: "15px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932" };
    let pwdStyle = { width: "30%", backgroundColor: "rgba(40, 30, 94, 0.932)", borderStyle: "solid", borderRadius: "15px", borderColor: "rgba(40, 30, 94, 0.932)", color: "white" };
    let gooStyle = { width: "100%", backgroundColor: "transparent", borderStyle: "solid", borderRadius: "15px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932" };
    let nextStyle = { width: "100%", backgroundColor: "rgba(40, 30, 94, 0.932)", borderStyle: "solid", borderRadius: "15px", borderColor: "rgba(40, 30, 94, 0.932)", color: "white" };
    
    return (

        <Card >

            <form class="form-horizantal">
                <br />
                <h3 style={{ textAlign: "center", color: "#4f005f" }}><i>YourMart</i></h3>
                <br />
                <h6 style={{ textAlign: "center" }}> Login </h6>
                <p style={{ textAlign: "center" }}><i>Sign in using your Your Mart account</i></p>
                <br />
                {
                    showusername && <Fragment >
                        <div style={{ textAlign: "center" }}>
                            <TextField
                                label="Enter Username"
                                variant="standard"
                                onChange={addUserHandler}
                                className={classes.textField}
                                InputProps={{
                                    className: classes.input,
                                }}
                                InputLabelProps={{
                                    className: classes.label,
                                }}
                            />
                        </div>
                    </Fragment>
                }
                {
                    showpwd && <Fragment>
                        <div style={{ textAlign: "center" }}>
                            <TextField
                                label="Enter Password"
                                variant="standard"
                                type={(!showpassword) ? "password" : "text"}
                                onChange={addPasswordHandler}
                                className={classes.textField}
                                InputProps={{
                                    className: classes.input,
                                }}
                                InputLabelProps={{
                                    className: classes.label,
                                }}
                            />
                            <span >
                                <button type="button" style={{ backgroundColor: "transparent", border: "none", paddingTop: "25px" }} onClick={passwordHandler}>
                                    {showpassword ? <i class="bi bi-eye-slash-fill"></i> : <i class="bi bi-eye-fill"></i>}
                                </button>
                            </span>
                        </div>
                    </Fragment>
                }

                {error && <p style={{ color: "red", fontSize: "12px", fontStyle: "italic", textAlign: "left", paddingLeft: "50px" }}>{error}</p>}
                <br />
                {
                    showusername &&
                    <div style={{ textAlign: "center", paddingLeft: "20%", paddingRight: "20%" }}>
                        <button style={nextStyle} onClick={nextHandler} type="button">Next</button>
                    </div>
                }

                {
                    showpwd &&
                    <div style={{ textAlign: "center" }}>
                        <button onClick={backHandler} style={pwdStyle} type="button">Back</button>
                        <span style={{ paddingLeft: "10px" }}> </span>
                        <button onClick={submitHandler} style={pwdStyle} type="submit">Sign In</button>
                    </div>
                }

            </form>

            <br />
            <div style={{ textAlign: "center", paddingLeft: "20%", paddingRight: "20%" }}>
                <button onClick={signupHandler} style={butStyle} type="button"> Create a new account </button>
                <br />
                <br />
                <p> Or, continue with  </p>
                <button style={gooStyle} type="button">
                    <b>Google</b>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText=""
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                        icon={false}
                        className={styleclasses.glogin}
                    />
                </button>
            </div>
            <br />
        </Card>
    );

}

export default Login;

// <div>
//                 <p style={{ textAlign: "center", paddingLeft:"20%", paddingRight:"20%" }}> or
//                     <GoogleLogin
//                         clientId={clientId}
//                         buttonText="Login"
//                         onSuccess={onLoginSuccess}
//                         onFailure={onLoginFailure}
//                         cookiePolicy={'single_host_origin'}
//                         isSignedIn={true}
//                         icon={false}
//                         className={styleclasses.glogin}
//                     />
//                 </p>
//             </div>
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../UI/Card';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { GoogleLogin } from 'react-google-login';
import styleclasses from "./Login.module.css";


const Signup = (props) => {

    const clientId = "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reenterpassword, setReenterpassword] = useState("");
    const [showpassword, setShowpassword] = useState(false);
    const [showreenterpassword, setShowreenterpassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const [value, setValue] = useState();
    const [googleSignup, setGoogleSignup] = useState(false);

    const [pwdstatus, setPwdstatus] = useState(true);
    const [pwdcolor, setPwdcolor] = useState("grey");

    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [showForm, setShowForm] = useState(true);


    const [error, setError] = useState(null);
    let history = useHistory();


    const addUsernameHandler = (event) => {
        setUsername(event.target.value);
    }
    const addPasswordHandler = (event) => {
        setPassword(event.target.value);
        let pwd = event.target.value;
        if (pwd === reenterpassword) {
            setPwdstatus(true);
            setPwdcolor("grey");
        }
        else {
            setPwdstatus(false);
            setPwdcolor("red");
        }
    }
    const addReenterpasswordHandler = (event) => {
        setReenterpassword(event.target.value);
        let repwd = event.target.value;
        if (repwd === password) {
            setPwdstatus(true);
            setPwdcolor("grey");
        }
        else {
            setPwdstatus(false);
            setPwdcolor("red");
        }
    }
    const addFirstnameHandler = (event) => {
        setFirstname(event.target.value);
    }
    const addLastnameHandler = (event) => {
        setLastname(event.target.value);
    }
    const addGenderHandler = (event) => {
        setGender(event.target.value);
    }
    const addPhonenumberHandler = (event) => {
        setPhonenumber(event.target.value);
    }
    const passwordHandler = () => {
        setShowpassword(!showpassword);
    }
    const reenterpasswordHandler = () => {
        setShowreenterpassword(!showreenterpassword);
    }


    async function addSubmitHandler(event) {
        event.preventDefault();

        setError(null);

        if (isValidPhoneNumber(value)) {
            const requestbody = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                    gender: gender,
                    role: 'customer',
                    phonenumber: value
                })

            }
            const response = await fetch('http://localhost:8080/ecommerce/users', requestbody);

            const data = await response.json();

            if (response.ok) {
                setShowForm(false);
                // props.setSignin(true);
            }
            else {
                setError("username already exists");
            }
        }
        else {
            setError("phonenumber is invalid");
        }
    }

    const signinHandler = (event) => {
        event.preventDefault();
        setUsername("");
        setGoogleSignup(false);
        props.setSignin(true);
    }

    async function onLoginSuccess(res) {
        console.log('Login Success:', res.profileObj);

        let uname = res.profileObj.email;

        if (!(/@gmail\.com$/g).test(uname)) {
            setUsernameError("Username should be a gmail");
            return;
        }

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
                setUsername(res.profileObj.email);
                setFirstname(res.profileObj.familyName);
                setLastname(res.profileObj.givenName);
                setGoogleSignup(true);
            }
            else {
                setError("Account already exists for this mail account");
                setUsername("");
                setFirstname("");
                setLastname("");
                setGoogleSignup(false);
            }
        }
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    }

    const refreshHandler = () => {
        setUsername("");
        setFirstname("");
        setLastname("");
        setGoogleSignup(false);
        setReenterpassword("");
        setPassword("");
        setGender("");
        setPhonenumber("");
        setUsernameError(null);
        setPasswordError(null);
        setError(null);
        setValue("");
        setPwdstatus(true);
    }

    const userCheckHandler = (event) => {

        let userCheck = /@gmail\.com$/g;
        let un = event.target.value.trim();
        setUsername(un);

        if (un.length === 0) {
            setUsernameError("Username should not be empty");
        }
        else if (!userCheck.test(username)) {
            setUsernameError("Username should be a mail");
        }
        else {
            setUsernameError(null);
        }
    }

    const pwdCheckHandler = (event) => {

        let pwd = event.target.value.trim();

        if (!(/[a-z]/g.test(pwd)) || !(/[A-Z]/g.test(pwd)) || !(/[0-9]/g.test(pwd)) || pwd.length < 6) {
            setPasswordError("Password should contain atleast one capital, one small, one digit and length should be atleast 6 characters");
        }
        else {
            setPasswordError(null);
        }

    }

    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };
    let gooStyle = { width: "40%", backgroundColor: "transparent", borderStyle: "none", color: "rgba(40, 30, 94, 0.932", paddingRight:"120px" };
    
    return (
        <Card>

            {
                showForm && <Fragment>
                    <form onSubmit={addSubmitHandler}>
                        <br />
                        <h3 style={{ textAlign: "center", color: "#4f005f" }}><i>YourMart</i></h3>

                        <div style={{ textAlign: "center" }}>
                            <h6 style={{ textAlign: "center" }}> Sign Up </h6>
                            <button onClick={refreshHandler} class="bi bi-arrow-repeat" style={{ fontSize: "15px", borderStyle: "none", backgroundColor: "transparent", float: "right", paddingTop: "0px" }}>
                            </button>
                        </div>

                        <p style={{ textAlign: "center", color: "#4f005f" }}>Create <i>Your Mart</i> account using your Email address</p>
                        <hr style={{ borderStyle: "solid black" }} />
                        {usernameError && <span style={{ color: "red", paddingLeft: "20px" }}><i>{usernameError}</i></span>}
                        {passwordError && <p style={{ color: "red", paddingLeft: "20px" }}><i>{passwordError}</i></p>}
                        {error && <p style={{ color: "red", paddingLeft: "20px" }}> {error} </p>}

                        <table class="table table-borderless">

                            <tbody>
                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}>Username<span style={{ color: "red" }}>*</span></th>
                                    <td style={{ textAlign: "center" }}>
                                        <input id="username" type="text" disabled={googleSignup} value={username} onChange={addUsernameHandler} onBlur={userCheckHandler} />
                                        <span style={{ paddingRight: "36px" }}></span>
                                    </td>
                                </tr>


                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> Password<span style={{ color: "red" }}>*</span> </th>
                                    <td style={{ textAlign: "center" }}>
                                        <input id="password" type={(!showpassword) ? "password" : "text"} value={password} onChange={addPasswordHandler} onBlur={pwdCheckHandler} />
                                        <span>
                                            <button type="button" style={{ backgroundColor: "transparent", border: "none" }} onClick={passwordHandler}>
                                                {showpassword ? <i class="bi bi-eye-slash-fill"></i> : <i class="bi bi-eye-fill"></i>}
                                            </button>
                                        </span>
                                        <span style={{ paddingRight: "12px" }}></span>
                                    </td>
                                </tr>



                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> Re-Enter Password<span style={{ color: "red" }}>*</span> </th>
                                    <td style={{ textAlign: "center" }}>
                                        <input id="reenterpassword" type={(!showreenterpassword) ? "password" : "text"} value={reenterpassword} onChange={addReenterpasswordHandler} />
                                        <span>
                                            <button type="button" style={{ backgroundColor: "transparent", border: "none" }} onClick={reenterpasswordHandler}>
                                                {showreenterpassword ? <i class="bi bi-eye-slash-fill"></i> : <i class="bi bi-eye-fill"></i>}
                                            </button>
                                        </span>
                                        <span style={{ paddingRight: "12px" }}></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> First Name<span style={{ color: "red" }}>*</span> </th>
                                    <td style={{ textAlign: "center" }}>
                                        <input id="firstname" type="text" value={firstname} onChange={addFirstnameHandler} required="true" />
                                        <span style={{ paddingRight: "36px" }}></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> Last Name<span style={{ color: "red" }}>*</span> </th>
                                    <td style={{ textAlign: "center" }}>
                                        <input id="lastname" type="text" value={lastname} onChange={addLastnameHandler} required="true" />
                                        <span style={{ paddingRight: "36px" }}></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> Gender<span style={{ color: "red" }}>*</span> </th>
                                    <td style={{ textAlign: "center" }}>
                                        <select style={{ borderColor: "black", width: "68%" }} onChange={addGenderHandler} value={gender} required="true">
                                            <option style={{ borderColor: "black" }} value="">None</option>

                                            <option key="male" value="Male">Male</option>
                                            <option key="female" value="Female">Female</option>
                                            <option key="nottosay" value="Prefer not to say">Prefer not to say</option>

                                        </select>
                                        <span style={{ paddingRight: "36px" }}></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ textAlign: "Left", paddingLeft: "40px" }}> Phonenumber<span style={{ color: "red" }}>*</span></th>
                                    <td style={{ textAlign: "center" }}>
                                        <PhoneInput
                                            style={{ width: "76%", paddingLeft: "20px" }}
                                            placeholder="Enter phone number"
                                            value={value}
                                            onChange={setValue}
                                            required="true">
                                        </PhoneInput>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr style={{ borderStyle: "solid black" }} />
                        <div style={{ textAlign: "center" }}>
                            <button style={butstyle} type="submit">Register</button>
                        </div>
                    </form>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <label style={{ paddingLeft: "50px" }}>Already Have an account?</label>
                        <span>
                            <button onClick={signinHandler} style={{ border: "none", backgroundColor: "white", color: "rgba(40, 30, 94, 0.932)" }} type="button"><i><b>Signin</b></i></button>
                        </span>
                        <div style={{ textAlign: "center", paddingLeft: "20%", paddingRight: "20%", display:"inline" }}>
                            <p style={{paddingLeft:"60px"}}> Or, continue with  
                            <span>
                            <button style={gooStyle} type="button">
                                <b>Google</b>
                                <span style={{display:"inline"}}>
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
                                </span>
                            </button>
                            </span>
                            </p>
                        </div>
                        
                    </div>
                </Fragment>
            }
            {
                !showForm &&
                <div style={{ textAlign: "center" }}>
                    <br />
                    <br />
                    <p> Your account is successfully registered. </p>
                    <label style={{ paddingLeft: "50px" }}>continue to sign in.</label>
                    <span>
                        <button onClick={signinHandler} style={{ border: "none", backgroundColor: "white", color: "rgba(40, 30, 94, 0.932)" }} type="button"><i><b>Signin</b></i></button>
                    </span>
                    <br />
                </div>
            }
        </Card>
    );

}

export default Signup;


// <span>
//                     <button type="button" style={{ backgroundColor: "transparent", border: "none" }}>

//                         {!pwdstatus &&
//                             <i class="bi bi-exclamation-triangle-fill" style={{ color: "red" }}>

//                             </i>
//                         }
//                     </button>
//                 </span>

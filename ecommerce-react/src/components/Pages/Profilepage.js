import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Customerordersheader from '../Customerorders/Customerordersheader';
import classes from "./Profilepage.module.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Newaddressmodal from "../Customerorders/Newaddressmodal";
import { isValidPhoneNumber } from 'react-phone-number-input';
import { addressActions } from '../Store/store';
import DeleteProduct from '../Productspage/DeleteProduct';

function Profilepage(props) {

    const userId = useSelector(state => state.user.userId);
    const role = useSelector(state => state.user.role);
    let history = useHistory();
    let dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [fetchState, setFetchState] = useState(false);
    const [msg, setMsg] = useState(false);
    const [edit, setEdit] = useState(false);
    const [addId, setAddId] = useState(null);

    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [reload, setReload] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [cantDelete, setCantDelete] = useState(false);


    const backHandler = () => {
        history.replace("/customerhome");
    }

    const requestbody = {
        method: 'GET',
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/users/' + `${userId}`, requestbody);
        if (response.ok) {
            const data = await response.json();
            setUsername(data["username"]);
            setPassword(data["password"]);
            setFirstName(data["firstName"]);
            setLastName(data["lastName"]);
            setPhone(data["phonenumber"]);
            setAddress(data["addresslist"]);
            setFetchState(true);

            const addresslist = data["addresslist"].map((item) => {
                return {
                    addId: item.addId,
                    city: item.city,
                    hno: item.hno,
                    name: item.name,
                    pincode: item.pincode,
                    state: item.state,
                    street: item.street,
                    phonenumber: item.phonenumber,
                    country: item.country,
                    addstring: item.hno + " " + item.street + " " + item.city + " " + item.state + " " + item.pincode + " " + item.country
                }
            });
            dispatch(addressActions.setuseraddress(addresslist));


        } else {
            console.log("failed to fetch");
        }
    }

    useEffect(() => {
        fetchData();
    }, [reload]);


    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value);
    };

    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value);
    };

    const phoneChangeHandler = (event) => {
        setPhone(event.target.value);
    };

    async function submitHandler(event) {
        event.preventDefault();

        if (isValidPhoneNumber(phone)) {
            const response = await fetch(
                "http://localhost:8080/ecommerce/updateUser?userId=" + `${userId}` +
                "&username=" + `${username}` +
                "&password=" + `${password}` +
                "&firstName=" + `${firstName}` +
                "&lastName=" + `${lastName}` +
                "&phonenumber=" + `${phone}`,
                {
                    mode: "cors",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                }
            );
            if (response.ok) {
                setMsg("Details updated successfully :)");
            }
        }
        else {
            setMsg("phone number is invalid");
        }

    }

    const editHandler = (event) => {
        setAddId(event.target.value);
    }

    const noEditHandler = () => {
        setAddId(null);
        setReload(!reload);
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

    const newAddressHandler = () => {
        setAddId("new address");
    }

    const deleteHandler = async (addId) => {
        const response = await fetch(
            "http://localhost:8080/ecommerce/userAddressOrderCheck?addId=" + `${addId}`,
            {
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                method: "PUT",
            }
        );
        const data = await response.text();

        if (Number(data) === 0) {
            setShowDelete(addId);
        }
        else {
            setCantDelete("This address is used for some orders. So, cannot be deleted now.");
        }

    }

    const showDeleteHandler = () => {
        setShowDelete(false);
        setReload(!reload);
    }

    const cantDeleteHandler = () =>{
        setCantDelete(false);
        setReload(!reload);
    }

    let backstyle = { backgroundColor: "transparent", borderStyle: "none", color: "rgba(40, 30, 94, 0.932)", fontWeight: "bold" };
    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

    return (
        <div style={{ backgroundColor: "white" }}>
            {role === "customer" && <Customerordersheader value={"Profile"} />}

            {addId && <Newaddressmodal addId={addId} clickHandle={noEditHandler} />}
            {showDelete && <DeleteProduct productId={showDelete} clickHandle={showDeleteHandler} value="address" reload={""} />}
            {cantDelete && <DeleteProduct productId={cantDelete} clickHandle={cantDeleteHandler} value="addressCant" reload={""} />}
            
            {role === "customer" && <div>
                <button type="button" style={backstyle} onClick={backHandler}> <span class="bi bi-arrow-left-circle" style={{paddingRight:"2px"}}></span>Back</button>
            </div>}
            <br />
            {fetchState && <div class="row" style={{paddingLeft:"50px"}}>
                <div class="col-sm-5" style={{}}>
                    <form style={{ paddingLeft: "10%", borderColor: "black", borderStyle: "ridge", paddingTop: "10%", paddingRight: "10%" }} onSubmit={submitHandler}>
                        <ul style={{ backgroundColor: "white" }}>
                            <li><h3 style={{ textAlign:"center", paddingLeft:"60px" }}><i> {role==="admin" ? "Admin" : "User"} Details</i></h3></li>
                            {/* <li style={{float:"right"}}><button onClick={editHandler} class="bi bi-pen-fill" style={{borderStyle:"none", backgroundColor:"transparent"}}></button></li> */}
                        </ul>
                        <br />
                        <br />
                        <hr style={{ borderStyle: "515px solid" }} />

        
                        {msg && <p style={{ color: "rgba(40, 30, 94, 0.932" }}><i>{msg}</i></p>}
                        {usernameError && <p style={{ color: "red" }}><i>{usernameError}</i></p> }
                        {passwordError && <p style={{ color: "red" }}><i>{passwordError}</i></p> }

                        <table class="table table-borderless">

                            <tbody>
                                <tr>
                                    <th scope="row"> Username<span style={{ color: "red" }}>*</span></th>
                                    <td>
                                        <input
                                            type="text"
                                            value={username}
                                            onBlur={userCheckHandler}
                                            onChange={usernameChangeHandler}
                                            required="true"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Password<span style={{ color: "red" }}>*</span></th>
                                    <td>
                                        <input
                                            type="text"
                                            value={password}
                                            onChange={passwordChangeHandler}
                                            onBlur={pwdCheckHandler}
                                            required="true"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"> First Name<span style={{ color: "red" }}>*</span></th>
                                    <td>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={firstNameChangeHandler}
                                            required="true"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Last Name<span style={{ color: "red" }}>*</span></th>
                                    <td>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={lastNameChangeHandler}
                                            required="true"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Phonenumber<span style={{ color: "red" }}>*</span></th>
                                    <td>
                                        <PhoneInput
                                            style={{ width: "83%"}}
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone}
                                            required="true"
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </table>


                        <br />
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" style={butstyle}>Save</button>
                        </div>
                        <br />
                    </form>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <button type="button" onClick={newAddressHandler} style={butstyle}> + Add New Address </button>
                    </div>
                </div>
                {<div class="col-sm-5" style={{ backgroundColor: "white" }} >
                    <div className={classes.example} style={{ backgroundColor: "white", borderColor: "black", borderStyle: "ridge" }}>
                        {
                            address.length===0 ? 
                                                <div style={{textAlign:"center", paddingTop:"20%"}}>
                                                        <p> You haven't saved any address yet </p>
                                                </div>
                                                :
                            address.map(item => (
                                <div key={item.addId} className={classes.griditem} style={{ borderStyle: "double", alignContent: "left" }}>
                                    <span>
                                        <button type="button" value={item.addId} onClick={editHandler} class="bi bi-pen-fill" style={{ paddingLeft: "90%", borderStyle: "none", backgroundColor: "transparent" }}></button>
                                        <button type="button" value={item.addId + "del"} onClick={() => deleteHandler(item.addId)} class="bi bi-trash" style={{ paddingLeft: "10px", borderStyle: "none", backgroundColor: "transparent" }}></button>
                                    </span>
                                    <p style={{ paddingLeft: "15px", alignContent: "left" }}><b style={{paddingRight:"50px"}}>Name</b> : {item.name}</p>
                                    <p style={{ paddingLeft: "15px", alignContent: "left" }}><b style={{paddingRight:"39px"}}>Address</b> : {item.hno + ", " + item.street + ", " + item.city + "-"  + item.pincode+", " +item.state + ", "+item.country}</p>
                                    <p style={{ paddingLeft: "15px", alignContent: "left" }}><b>Phonenumber</b> : {item.phonenumber}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>}
            </div>}
            <div className={classes.input}>

            </div>

        </div>
    );

}

export default Profilepage;
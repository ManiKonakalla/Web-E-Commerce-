import React, { useEffect } from 'react';
import classes from './Newaddressmodal.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addressActions } from '../Store/store';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';

function Newaddressmodal(props) {

    var worldMapData = require('city-state-country');

    const userId = useSelector((state) => state.user.userId);
    const addressList = useSelector(state => state.address.addresslist);
    const dispatch = useDispatch();

    const [name, setName] = useState(" ");
    const [houseno, setHouseno] = useState(" ");
    const [street, setStreet] = useState(" ");
    const [city, setCity] = useState(" ");
    const [state, setState] = useState(" ");
    const [pincode, setPincode] = useState(" ");
    const [phonenumber, setPhonenumber] = useState(" ");
    const [country, setCountry] = useState("India");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const countryList = worldMapData.getAllCountries();
    const [stateList, setStateList] = useState(worldMapData.getAllStatesFromCountry("India"));
    const [cityList, setCityList] = useState(null);


    const nameHandler = (event) => {
        setName(event.target.value);
        if (event.target.value.trim() === "") {
            setError("Name should not be empty");
        }
        else {
            setError(null);
        }
    }
    const housenoHandler = (event) => {
        setHouseno(event.target.value);
    }
    const streetHandler = (event) => {
        setStreet(event.target.value);
    }
    const cityHandler = (event) => {
        setCity(event.target.value);
    }
    const stateHandler = (event) => {
        setState(event.target.value);
        setCityList(worldMapData.getAllCitiesFromState(event.target.value));
    }
    const pincodeHandler = (event) => {
        setPincode(event.target.value);
    }
    const phonenumberHandler = (event) => {
        setPhonenumber(event.target.value);
    }

    useEffect(() => {

        if (props.addId !== null && props.addId !== "new address") {

            let address = addressList.find(item => item.addId === Number(props.addId));
            setName(address.name);
            setHouseno(address.hno);
            setStreet(address.street);
            setCity(address.city);
            setState(address.state);
            setPincode(address.pincode);
            setCountry(address.country);
            setPhonenumber(address.phonenumber);
            setCityList(worldMapData.getAllCitiesFromState(address.state));
        }


    }, [props.addId])

    const addressSubmitHandler = (event) => {
        event.preventDefault();
        setSuccess(null);
        if (name.trim() === "" || houseno.trim === "" || street.trim === "" || city.trim === "" || state.trim === "" || pincode.trim === "" || phonenumber.trim === "") {
            setError("Enter all the required address details");
        }
        else if (!isValidPhoneNumber(phonenumber)) {
            setError("Enter a valid phone number");
        }
        else {
            setError(null);
            if (props.addId === null || props.addId === "new address") {
                addressinsert();
                setSuccess("Address saved successfully");
            }
            else {
                updateUserAddress();
                setSuccess("Address updated successfully");
            }
            //props.clickHandle();

        }
    }

    const updateUserAddress = async () => {

        const response = await fetch("http://localhost:8080/ecommerce/updateUserAddress?addId=" + `${props.addId}` + "&name=" + `${name}` + "&hno=" + `${houseno}` + "&street=" + `${street}` + "&city=" + `${city}` + "&state=" + `${state}` + "&pincode=" + `${pincode}` + "&phonenumber=" + `${phonenumber}` + "&country=" + `${country}`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        }
        );
    }

    const addressinsert = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/useraddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                name: name,
                hno: houseno,
                street: street,
                city: city,
                state: state,
                pincode: pincode,
                phonenumber: phonenumber,
                country: country
            })
        }
        );
        const adddata = await response.json();

        dispatch(addressActions.adduseraddress(adddata));

    }

    let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

    return (
        <div>
            <div className={classes.backdrop} onClick={props.clickHandle} />
            <div style={{ backgroundColor: 'white', borderRadius: "5px" }} className={classes.modal}>
                <br />
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "#4f005f", textAlign: "center" }}>
                        Address Details
                        <button onClick={props.clickHandle} class="bi bi-x-circle-fill" style={{ fontSize: "20px", borderStyle: "none", backgroundColor: "transparent", float: "right" }}>
                        </button>
                    </h3>
                </div>
                <hr style={{ borderStyle: "25px solid" }} />

                <div style={{ backgroundColor: 'white' }}>
                    {error && <p style={{color:"red", paddingLeft:"30px"}}>{error}</p>}
                    {success && <p style={{color:"blue", paddingLeft:"30px"}}>{success}</p>}
                    <form onSubmit={addressSubmitHandler}>

                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> Name<span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <input id="username" type="text" style={{ borderStyle: "solid", borderColor: "black", width: "80%", borderWidth: "1px" }} value={name} onChange={nameHandler} placeholder="Name" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> House/Flat.No <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <input id="username" type="text" value={houseno} style={{ borderStyle: "solid", borderColor: "black", width: "80%", borderWidth: "1px" }} onChange={housenoHandler} />

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> Landmark <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <input id="username" type="text" value={street} style={{ borderStyle: "solid", borderColor: "black", width: "80%", borderWidth: "1px" }} onChange={streetHandler} />

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> City <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <input list="cities" onChange={cityHandler} style={{ borderColor: "black", width: "80%", borderWidth: "1px" }} name="city" value={city} id="city" />
                                        <datalist id="cities" value={city} required="true">
                                            <option style={{ borderColor: "black" }} value="">None</option>

                                            {
                                                cityList && cityList.map((item) => (
                                                    <option key={item.id} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> State <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <select style={{ borderColor: "black", width: "80%", borderWidth: "1px" }} onChange={stateHandler} value={state} required="true">
                                            <option style={{ borderColor: "black" }} value="">None</option>

                                            {
                                                stateList && stateList.map((item) => (
                                                    <option key={item.id} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> Country <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <select style={{ borderColor: "black", width: "80%", borderWidth: "1px" }} onChange={(e) => { setCountry(e.target.value); setStateList(worldMapData.getAllStatesFromCountry(e.target.value)) }} value={country} required="true">
                                            <option style={{ borderColor: "black" }} value="">None</option>

                                            {
                                                countryList.map((item) => (
                                                    <option key={item.id} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> Pincode <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <input id="username" style={{ borderStyle: "solid", borderColor: "black", width: "80%", borderWidth: "1px" }} type="text" value={pincode} onChange={pincodeHandler} />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" style={{ paddingLeft: "30px" }}> Phonenumber <span style={{ color: "red" }}>*</span></th>
                                    <td style={{ paddingLeft: "40px" }}>
                                        <PhoneInput
                                            defaultCountry="IN"
                                            style={{ width: "80%", borderWidth: "1px" }}
                                            placeholder="Enter phone number"
                                            value={phonenumber}
                                            onChange={setPhonenumber}
                                            required="true">
                                        </PhoneInput>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr style={{ borderStyle: "25px solid" }} />
                        <div style={{ textAlign: "center" }}>
                            <button style={butstyle} type="submit"> Save Address </button>
                        </div>
                        <br />

                    </form>


                    {/* <form className={classes.formContainer} onSubmit={addressSubmitHandler} >
                        {error && <p>{error}</p>}
                        <div class="form-group row">
                            <label htmlFor="Name" class="col-sm-2 col-form-label">   Name</label>
                            <div class="col-sm-10">
                                <input id="username" type="text" style={{ borderStyle: "solid", borderColor:"black", width:"50%" }} value={name} onChange={nameHandler} class="form-control" placeholder="Name" />
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label htmlFor="House no" class="col-sm-2 col-form-label">   House no:</label>
                            <div class="col-sm-10">
                                <input id="username" type="text" value={houseno} style={{ borderStyle: "solid", borderColor:"black", width:"50%" }} onChange={housenoHandler} class="form-control" />
                            </div>
                        </div>
                        <br />
                        <div class="form-group row">
                            <label htmlFor="Street" class="col-sm-2 col-form-label"> Street</label>
                            <div class="col-sm-10">
                                <input id="username" type="text" value={street} style={{ borderStyle: "solid", borderColor:"black", width:"50%" }} onChange={streetHandler} class="form-control" />
                            </div>
                        </div>
                        <br />

                        <div class="form-group row">
                            <label htmlFor="City" style={{paddingRight:"100px"}} class="col-sm-2 col-form-label"> City </label>
                            <input list="cities" onChange={(e) => { setCity(e.target.value); }} style={{ borderColor: "black", width: "40%" }} name="city" value={city} id="city"/>
                            <datalist id="cities" value={city} required="true">
                                <option style={{ borderColor: "black" }} value="">None</option>

                                {
                                    cityList && cityList.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </datalist>
                        </div>

                        <br />

                        <div class="form-group row">
                            <label htmlFor="City" style={{paddingRight:"100px"}} class="col-sm-2 col-form-label"> State </label>
                            <select style={{ borderColor: "black", width: "40%" }} onChange={(e) => { setState(e.target.value); setCityList(worldMapData.getAllCitiesFromState(e.target.value)) }} value={state} required="true">
                                <option style={{ borderColor: "black" }} value="">None</option>

                                {
                                    stateList && stateList.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <br />

                        <div class="form-group row">
                            <label htmlFor="City" style={{paddingRight:"100px"}} class="col-sm-2 col-form-label"> Country </label>
                            <select style={{ borderColor: "black", width: "40%" }} onChange={(e) => { setCountry(e.target.value); setStateList(worldMapData.getAllStatesFromCountry(e.target.value)) }} value={country} required="true">
                                <option style={{ borderColor: "black" }} value="">None</option>

                                {
                                    countryList.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        
                        <br/>
                        
                        <div class="form-group row">
                            <label htmlFor="Pincode" class="col-sm-2 col-form-label"> Pincode</label>
                            <div class="col-sm-10">
                                <input id="username" style={{borderStyle:"solid", borderColor:"black", width:"50%"}} type="text" value={pincode} onChange={pincodeHandler} class="form-control" />
                            </div>
                        </div>
                        <div>
                            <PhoneInput
                                defaultCountry="IN"
                                style={{ width: "55%", paddingLeft:"11%", paddingTop : "4%", paddingBottom:"4%" }}
                                placeholder="Enter phone number"
                                value={phonenumber}
                                onChange={setPhonenumber}
                                required="true">
                            </PhoneInput>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <button style={butstyle} type="submit"> Save Address </button>
                        </div>
                        <br/>
                    </form>
                 */}

                </div>
            </div>
        </div>
    );

}

export default Newaddressmodal;
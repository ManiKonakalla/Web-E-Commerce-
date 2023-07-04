import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminOrderTableAddress = (props) => {

    const [addDetails, setAddDetails] = useState(null);


    const requestbody = {
        method: 'GET',
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/useraddress/' + `${props.addId}`, requestbody);
        if (response.ok) {
            const data = await response.json();
            setAddDetails(data);
            // if (props.send === "customer") {
            //     props.setAddress({
            //         name: data.name,
            //         addstring: data.hno + ", " + data.street + ", " + data.city + "- " + data.pincode + ", " + data.state + ", " + data.country,
            //         phonenumber: data.phonenumber,
            //     });
            // }

        }
        else {
            console.log("failed to fetch");
        }
    }

    const fetchBillData = async () => {

        let response = await fetch('http://localhost:8080/ecommerce/useraddress/' + `${props.addId}`, requestbody);
        let data = "";
        let userId = "";
        if (response.ok) {
            data = await response.json();
            userId = data.userId;
        }
        else {
            console.log("failed to fetch");
        }


        let addresponse = await fetch('http://localhost:8080/ecommerce/useraddressesbyuserid/' + `${userId}`, requestbody);
        if (addresponse.ok) {
            let adddata = await addresponse.json();
            {
                adddata.map(address => {
                    if (address.bill === true) {
                        setAddDetails(address);
                        // if (props.send === "customer ") {
                        //     props.setAddress({
                        //         name: address.name,
                        //         addstring: address.hno + ", " + address.street + ", " + address.city + "- " + address.pincode + ", " + address.state + ", " + address.country,
                        //         phonenumber: address.phonenumber,
                        //     });
                        // }

                    }
                })
            }
        }
        else {
            console.log("failed to fetch");
        }
    }

    useEffect(() => {
        if (props.type === "ship") {
            fetchData();
        }
        else {
            fetchBillData();
        }

    }, []);

    return (
        <Fragment>
            {
                addDetails && <div style={{ display: "inline-block" }}>
                    <span style={{ fontSize: "12px" }}> {addDetails.name} </span>
                    <p style={{ fontSize: "12px", paddingBottom: "0px" }} > {addDetails.hno + ", " + addDetails.street + ", " + addDetails.city + "- " + addDetails.pincode + ", " + addDetails.state + ", " + addDetails.country} </p>
                    {/* <span style={{ fontSize:"12px"}}>  {addDetails.phonenumber} </span> */}
                </div>
            }
        </Fragment>
    );

}

export default AdminOrderTableAddress;
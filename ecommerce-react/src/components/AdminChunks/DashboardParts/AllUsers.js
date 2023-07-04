import React, { useEffect, useState } from "react";
import classes from "./AllUsers.module.css";

function AllUsers() {

    const [usersLength, setUsersLength] = useState(0);
    const [userDetails, setUserDetails] = useState([]);

    const usersList = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.ok) {
            setUsersLength(data.length);

            let today = new Date().getTime();
            let ulist = []
            {
                data.map(user => {
                    let odate = new Date(user.timestamp).getTime();

                    var msDiff = today - odate;
                    var days = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 2;

                    if (days < 4) {
                        ulist.push(user);
                    }
                })
            }
            setUserDetails(ulist);
        }
        else { }
    }

    useEffect(() => {
        usersList();
    }, []);


    return (
        <div style={{ paddingTop: "25px"}}>
            <div className={classes.example} style={{ border:"1px solid rgba(0, 0, 0, 0.8)" }}>
                <div style={{ width: "230px", height: "270px", backgroundColor: "white" }}>
                    <h6
                        style={{ fontWeight: "bold", paddingLeft: "100px" }}>
                        Users
                    </h6>
                    <p
                        style={{ paddingLeft: "15px", alignContent: "center", fontSize: "12px" }}>
                        <b>
                            <i>
                                {usersLength}
                            </i>
                        </b>
                        users are using <i>YourMart</i> application
                    </p>

                    <p style={{paddingLeft:"30px"}}> Users registered in last 3 days </p>
                    {
                        userDetails.map(user => (
                            <div key={user.userId}>
                                <p style={{paddingLeft:"40px"}}> <i class="bi bi-person"></i> {user.username} </p>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );

}

export default AllUsers;
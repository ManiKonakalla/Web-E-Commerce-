import { TableCell } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

const OrderUsername = ( props ) => {

    const [username, setUsername] = useState(null);

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: { 
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json"   
        }        
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/ecommerce/users/'+`${props.userId}`, requestbody) ;
        if (response.ok) {
            const data = await response.json();
            setUsername(data.username.split('@')[0]);
        }
        else {
        console.log("failed to fetch");
        }
    }

    useEffect ( () => {
        fetchData() ;
    }, []) ;

    return (
        <Fragment>  
            {
                username && <Fragment>
                    <TableCell>{username}</TableCell>
                </Fragment>
            }          
        </Fragment>
    );
}

export default OrderUsername ;
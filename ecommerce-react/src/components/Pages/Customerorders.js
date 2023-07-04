import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Customerordertable from '../Customerorders/Customerordertable';

function Customerorders () {

    const [orderslist, setOrderslist] = useState(null) ;
    const [load, setLoad] = useState(false) ;

    const userId = useSelector((state)=>state.user.userId);

    let history = useHistory();

    const getorder = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/ordersbyuserid/'+`${userId}`, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
        });
        
        const data = await response.json();
        if( response.ok ) {
            setOrderslist(data);
        }
        else {}
    }

    useEffect( () => {
        getorder();
    } ,[load] ) ;   

    const loadHandler = () => {
        setLoad(!load);
        console.log(load);
    }

    const backHandler = () => {
        history.replace("/customerhome");
    }


    return(
       <div style={{backgroundColor:"white"}}>
           <div style={{width:"100%", padding:"10px"}}>
                {orderslist && <Customerordertable orderslist={orderslist} loadHandler={loadHandler}/>}   
           </div>
            
        </div>
    ) ;

}

export default Customerorders;
import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Customerordersheader.module.css';

function Customerordersheader(props) {

    const username = useSelector( (state) => state.user.username);

    return (
        <div>
            <ul className={classes.topnav}> 
                    <li> <h4 className={classes.name}><i>YourMart</i></h4> </li>
                    <li><h4 className={classes.order}> {props.value} </h4></li>
                    <li style={{float:"right"}} className={classes.profile}><i class="bi bi-person-circle"></i> {username} </li>     
            </ul>
        </div>
    ) ;

}

export default Customerordersheader;
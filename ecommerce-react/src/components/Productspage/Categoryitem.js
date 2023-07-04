import React from 'react';

function Categoryitem(props) {

    return (
    
    <div onClick={props.handleClick}>
        <button type="button" style={{borderStyle:"none", backgroundColor:"transparent", paddingLeft:"20px", paddingBottom:"20px"}}><i style={{color:"white"}}>{props.title}</i></button>
    </div>

);
    
}

export default Categoryitem;


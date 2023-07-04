import React, { useState } from "react";
import Login from "./Login";
import Signpageheader from "./Signpageheader";
import Signup from "./Signup";


function Signin() {

    const [ signin, setSignin ] = useState(true) ;

    let loginStyle = {paddingLeft:"38%", paddingRight:"38%", paddingTop:"8%"} ;
    let signupStyle = {paddingLeft:"33%", paddingRight:"33%", paddingTop:"5%"};
    let signStyle = signin ? loginStyle : signupStyle ;
    
  return (
    <div>
        <Signpageheader />
        <div style={signStyle}>
            {
                signin ? <Login setSignin={setSignin}/> : <Signup setSignin={setSignin}/>
            }               
        </div>
    </div>
  );
}

export default Signin;
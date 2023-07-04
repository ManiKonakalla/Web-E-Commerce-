import React, { Fragment } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Customerhomepage from "./components/Pages/Customerhomepage";
import { useSelector } from 'react-redux';
import Checkout from "./components/Pages/Checkout";
import Profilepage from "./components/Pages/Profilepage";
import Signin from "./components/SignPages/Signin";
import AdminHome from "./components/Pages/AdminHome";

function App() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Switch>
        <Route exact path="/signpage">
          <Signin />
        </Route>
        {
          isAuth && <Route exact path="/customerhome">
            <Customerhomepage />
          </Route>
        }
        {
          isAuth && <Route exact path="/customerhome/checkout">
            <Checkout />
          </Route>
        }
        {
          isAuth && <Route exact path="/adminHome">
            <AdminHome />
          </Route>
        }
        {isAuth && <Route exact path="/profile">
          <Profilepage />
        </Route>}
        <Route path="/">
          <Redirect to="/signpage" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

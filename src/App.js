import React, { useContext, useEffect } from "react";
import './App.css';
import Login from "./Login";
import Main from "./Main";
import SignUp from "./SignUp";

import { BrowserRouter, Route, Switch } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/iniciativas">
          <Main />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="*">
          <h2>Error 404</h2>
        </Route>

      </Switch>
    </BrowserRouter >
  );
}

export default App;

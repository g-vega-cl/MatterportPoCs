import React from "react";
import "./App.css";
import AuthenticationProvider from "./modules/Authentication/store";
import AuthenticationModule from "./modules/Authentication";
import MainLayout from "./components/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileService from "./services/profileService";

function App() {
  console.log(ProfileService.getProfile(1));
  return (
    <div className="App">
      <AuthenticationProvider>
        <Router>
          <Switch>
            <Route path="/auth">
              <AuthenticationModule />
            </Route>
            <PrivateRoute path="/" component={MainLayout} />
          </Switch>
        </Router>
      </AuthenticationProvider>
    </div>
  );
}

export default App;

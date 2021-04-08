import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import MatterportPage from "../../modules/MatterportPage";
import MatterSdkStoreProvider from "../../modules/MatterportPage/store";
import NavBar from "../NavBar";
import AuthenticationService from "../../services/authenticationService";
import { AuthenticationStore } from "../../modules/Authentication/store";

const MainLayout: React.FC<any> = () => {
  const authStore = useContext(AuthenticationStore);
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const goToLogin = () => {
    history.push("/auth/login");
  };

  useEffect(() => {
    checkAccount();
  }, []);

  const checkAccount = () => {
    AuthenticationService.reloadUserIfLoggedIn()
      .then((user) => {
        authStore.dispatch({ type: "login", payload: user });
        goToHome();
      })
      .catch(() => {
        goToLogin();
      });
  };

  return (
    <div className="main-layout" style={{height: "87vh"}}>
      <MatterSdkStoreProvider>
        <NavBar />
        <MatterportPage />
      </MatterSdkStoreProvider>
    </div>
  );
};

export default MainLayout;

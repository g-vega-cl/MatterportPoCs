import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.scss';

import { AccountCircle } from '@material-ui/icons';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import AuthenticationService from '../../services/authenticationService';
import { AuthenticationStore } from '../../modules/Authentication/store';

const NavBar: React.FC = () => {
  const history = useHistory();
  const authStore = useContext(AuthenticationStore);
  const { name, loggedIn } = authStore.state.user;

  const goToLogin = () => {
    history.push('/auth/login');
  };

  const handleLogOut = () => {
    AuthenticationService.logOut().then(() => {
      authStore.dispatch({ type: 'logout', payload: {} });
      goToLogin();
    });
  };

  return (
    <AppBar position="static" className="app-bar" style={{minHeight:'0px'}}>
      <Toolbar className="nav-bar" style={{minHeight:'0px'}}>
        {loggedIn ? (
          <React.Fragment>
            <Typography variant="h6" className="nav-bar--user">
              <AccountCircle />
              {`Hello ${name}`}
            </Typography>
            <Button onClick={handleLogOut} variant="contained" size="small">
              Log out
            </Button>
          </React.Fragment>
        ) : (
          <Button onClick={() => null} variant="contained">
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

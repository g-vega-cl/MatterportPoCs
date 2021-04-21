import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.scss';

import { AccountCircle } from '@material-ui/icons';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import AuthenticationService from '../../services/authenticationService';
import { AuthenticationStore } from '../../modules/Authentication/store';
import RemoveIcon from '@material-ui/icons/Remove';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
interface INavbar {
  showAdd: boolean;
  setShowAdd: any;
}

const NavBar: React.FC<INavbar> = ({ showAdd, setShowAdd }) => {
  const history = useHistory();
  const authStore = useContext(AuthenticationStore);
  const { name, loggedIn } = authStore.state.user;

  const goToLogin = () => {
    history.push('/auth/login');
  };

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  const handleLogOut = () => {
    AuthenticationService.logOut().then(() => {
      authStore.dispatch({ type: 'logout', payload: {} });
      goToLogin();
    });
  };

  return (
    <AppBar position="static" className="app-bar" style={{ minHeight: '0px' }}>
      <Toolbar className="nav-bar" style={{ minHeight: '0px' }}>
        {loggedIn ? (
          <React.Fragment>
            {!showAdd && (
              <Button onClick={toggleShowAdd} style= {{width:'10px', marginLeft:'-10%', padding:'0px'}}>
                <AddCircleOutlineIcon />
              </Button>
            )}
            {showAdd && (
              <Button onClick={toggleShowAdd} style= {{width:'10px', marginLeft:'-10%', padding:'0px'}}>
                <RemoveIcon />
              </Button>
            )}

            <Typography variant="body1" className="nav-bar--user">
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

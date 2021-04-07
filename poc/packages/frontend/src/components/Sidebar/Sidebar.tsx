import React, { useContext } from 'react';
import './Sidebar.scss';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { AuthenticationStore } from '../../modules/Authentication/store';

const SideBar: React.FC = () => {
    const authStore = useContext(AuthenticationStore);
    const { name, loggedIn, role } = authStore?.state?.user;
    console.log("authStore: ", authStore)
    //Check if authStore.state.user.role === admin. To add items
  
    return (
      <AppBar position="static">
        <div style={{height:"100%", backgroundColor:"red", width:"100%"}}>
            <p>alskdalsdj</p>
        </div>
      </AppBar>
    );
  };

export default SideBar;
  
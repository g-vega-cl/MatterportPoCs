import './MatterportPage.scss';
import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import MatterportBox from 'components/MatterportBox';
import Sidebar from 'components/Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
// services
// components

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "80vh"
  },
  sidebar:{
    width:"100%",
    height:"99vh"
  }
}));

const MatterportPage: React.FC<any> = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item sm={10}>
        <MatterportBox //The main box
        />
      </Grid>
      <Grid item className = {classes.sidebar} sm = {2}>
        <Sidebar/>
      </Grid>
    </Grid>
  );
};

export default MatterportPage;

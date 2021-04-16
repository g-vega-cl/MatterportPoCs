import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Slider, Switch, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import './styles.scss';

interface ILightOverlay {
  item: any;
  setShowOverlay: any;
}

const useStyles = makeStyles({
  slider: {
    width: 300,
  },
});

const LightOverlay: React.FC<ILightOverlay> = ({ item, setShowOverlay }) => {
  const sliderText = (value: any) => {
    return `${value}%`;
  };
  const closeOverlay = () => {
    setShowOverlay(false);
  };
  return (
    <Paper elevation={3} style={{ backgroundColor: '#f0faff', height: '80%' }}>
      <Grid container>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '16px'}}>
          <Box onClick={closeOverlay} style={{marginLeft:'20px', display:'flex'}}>
            <ArrowBackIosIcon style={{marginTop:'1px'}}/>
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', marginTop: '17px' }}>
          <Typography variant="body1" style={{marginLeft: '46px'}}>{item.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '9px' }}>
          <Switch />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', margin: '20px', justifyContent: "center"}}>
          <EmojiObjectsIcon />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', marginBottom: '7px', justifyContent: "center"}}>
          <Slider
            defaultValue={50}
            getAriaValueText={sliderText}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={10}
            min={10}
            max={100}
            style={{ width: '80%' }}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', marginBottom: '180px', justifyContent: "center"}}>
          {/* //! Here goes the value of the dimmer  */}
          <Typography variant="body1">50%</Typography>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: "center"}}>
          <Box style={{ backgroundColor: 'inherit' }}>
            <TimerIcon />
            <Typography style={{marginLeft: '-8px'}}>Timer</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: "center"}}>
          <Box style={{ backgroundColor: 'inherit' }}>
            <SettingsIcon />
            <Typography style={{marginLeft: '-16px'}}>Settings</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LightOverlay;

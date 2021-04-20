import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Slider, Switch, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LightTimer from './LightTimer';
import LightSettings from './LightSettings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
  const [dimmerValue, setDimmerValue] = useState(50);
  const [showTimer, setShowTimer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  const updateDimmerValue = (e: any, newValue: any) => {
    setDimmerValue(newValue);
  };

  const toggleTimer = () =>{
    setShowTimer(!showTimer)
  }

  const toggleSettings = () =>{
    setShowSettings(!showSettings);
  }

  if(showTimer){
    return(
      <LightTimer setShowTimer={setShowTimer} item={item}/>
    )
  }

  if(showSettings){
    return(
      <LightSettings setShowSettings={setShowSettings} item={item}/>
    )
  }


  return (
    <Paper
      elevation={30}
      style={{ backgroundImage: 'linear-gradient(#4287f5 , #42aaf5)', height: '80%', borderRadius:'30px' }}
    >
      <Grid container>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '16px' }}>
          <Box onClick={closeOverlay} style={{ marginLeft: '20px', display: 'flex' }}>
            <ArrowBackIosIcon style={{ marginTop: '1px' }} />
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', marginTop: '17px', justifyContent: 'center' }}>
          <Typography variant="body1">{item.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '9px' }}>
          <Switch />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', margin: '20px', justifyContent: 'center' }}>
          <img src="https://img.icons8.com/cotton/100/000000/innovation.png"/>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', marginBottom: '7px', justifyContent: 'center' }}
        >
          <Slider
            aria-labelledby="continuous-slider"
            style={{ width: '80%' }}
            value={dimmerValue}
            onChange={updateDimmerValue}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', paddingBottom: '50px', justifyContent: 'center' }}
        >
          <Typography variant="body1">{dimmerValue}%</Typography>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box style={{ backgroundColor: 'inherit' }} onClick={toggleTimer}>
            <TimerIcon />
            <Typography style={{ marginLeft: '-8px' }}>Timer</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box style={{ backgroundColor: 'inherit' }} onClick={toggleSettings}>
            <SettingsIcon />
            <Typography style={{ marginLeft: '-16px' }}>Settings</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LightOverlay;

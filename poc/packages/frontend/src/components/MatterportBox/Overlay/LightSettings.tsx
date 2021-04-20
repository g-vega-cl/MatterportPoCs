import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Slider, Switch, Paper, TextField, Typography } from '@material-ui/core';
import './styles.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Checkbox from '@material-ui/core/Checkbox';

interface ILightTimer {
  setShowSettings: any;
  item: any;
}
const LightTimer: React.FC<ILightTimer> = ({ setShowSettings, item }) => {
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);

  const handleChange1 = (event: any) => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = (event: any) => {
    setChecked2(event.target.checked);
  };
  const handleChange3 = (event: any) => {
    setChecked3(event.target.checked);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <Paper
      elevation={30}
      style={{
        backgroundImage: 'linear-gradient(#4287f5 , #42aaf5)',
        height: '80%',
        borderRadius: '30px',
      }}
    >
      <Grid container>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '16px' }}>
          <Box onClick={closeSettings} style={{ marginLeft: '20px', display: 'flex' }}>
            <ArrowBackIosIcon style={{ marginTop: '1px' }} />
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', marginTop: '17px', justifyContent: 'center' }}>
          <Typography variant="body1">{item.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '9px' }}>
          <Switch />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', paddingTop: '10px' }}>
          <Checkbox
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={checked1}
            onChange={handleChange1}
          />
          <Typography
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {' '}
            Switch on movement perception{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Checkbox
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={checked2}
            onChange={handleChange2}
          />
          <Typography
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {' '}
            Notify when in use{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Checkbox
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={checked3}
            onChange={handleChange3}
          />
          <Typography
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {' '}
            Save energy{' '}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LightTimer;

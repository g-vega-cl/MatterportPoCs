import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Slider, Switch, Paper, TextField, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './styles.scss';

interface ILightTimer {
  setShowTimer: any;
  item: any;
}
const LightTimer: React.FC<ILightTimer> = ({ setShowTimer, item }) => {
  const [startDate, setStartDate] = React.useState(new Date('2021-01-01T00:00:00.000Z'));
  const [endDate, setEndDate] = React.useState(new Date('2021-01-05T00:00:00.000Z'));

  const closeTimer = () => {
    setShowTimer(false);
  };

  const handleDateChangeStart = (date: any) => {
    setStartDate(date);
  };
  const handleDateChangeEnd = (date: any) => {
    setEndDate(date);
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
          <Box onClick={closeTimer} style={{ marginLeft: '20px', display: 'flex' }}>
            <ArrowBackIosIcon style={{ marginTop: '1px' }} />
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', marginTop: '17px', justifyContent: 'center' }}>
          <Typography variant="body1">{item.name}</Typography>
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', marginTop: '9px' }}>
          <Switch />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={8} style={{marginLeft:'20%', paddingTop:'15px'}}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Turn on at"
              value={startDate}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          <Grid item xs={8} style={{marginLeft:'20%', paddingTop:'15px'}}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Turn off at"
              value={endDate}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </Paper>
  );
};

export default LightTimer;

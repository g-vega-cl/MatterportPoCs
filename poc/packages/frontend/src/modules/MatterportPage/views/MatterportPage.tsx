import './MatterportPage.scss';
import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import MatterportBox from 'components/MatterportBox';

// services
// components

const MatterportPage: React.FC<any> = () => {
  return (
    <Grid container className="main-page">
      <Grid item md={10} xs={12}>
        <MatterportBox //The main box
        />
      </Grid>
      <Grid item md={2} xs={12}>
        
      </Grid>
    </Grid>
  );
};

export default MatterportPage;

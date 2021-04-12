import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';

interface IItemListProps {
  items: any;
}

const ItemList: React.FC<IItemListProps> = ({ items }) => {
  return (
    <Grid container spacing={1}>
      {items.map((item: any) => {
        return (
          <>
            <Grid item xs = {10}>
              <Typography variant="body1">{item.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              {item.type === 'Light' && <EmojiObjectsIcon/>}
              {item.type === 'Tv' && <TvIcon/>}
              {item.type === 'Thermostat' && <AcUnitIcon/>}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default ItemList;

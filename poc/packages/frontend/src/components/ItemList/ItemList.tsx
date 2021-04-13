import React from 'react';
import { Button, Grid, Switch, Typography } from '@material-ui/core';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';

interface IItemListProps {
  items: any;
  matterPortService: any;
}

const ItemList: React.FC<IItemListProps> = ({ items, matterPortService }) => {
  
  const navigateToItemId = (matterportId:string)=>{
      matterPortService.navigateToTag(matterportId);
  }

  return (
    <Grid container spacing={1} justify="flex-end" alignItems="center">
      {items.map((item: any, index: number) => {
        return (
          <>
            <Grid item xs={2} style={{ marginRight: '15px' }}>
              <Switch
                // checked={checkedB}
                // onChange={}
                name={`switch-${index}`}
                color="primary"
                size="small"
              />
            </Grid>
            <Grid item xs={7}>
                <Button  onClick={()=>navigateToItemId(item.matterportId)}>{item.name}</Button>
            </Grid>
            <Grid item xs={2}>
              {item.type === 'Light' && <EmojiObjectsIcon />}
              {item.type === 'Tv' && <TvIcon />}
              {item.type === 'Thermostat' && <AcUnitIcon />}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default ItemList;

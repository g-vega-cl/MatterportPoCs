import React from 'react';
import { Button, Grid, Switch, Typography } from '@material-ui/core';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';

interface IItemListProps {
  items: any;
  sdk: any;
}

const ItemList: React.FC<IItemListProps> = ({ items, sdk }) => {
  
  const navigateToItemId = (id:number)=>{
      console.log("navigateSDK", sdk.Mattertag.navigateToTag("5"), " id",id) //IS SID not ID
      sdk.Mattertag.navigateToTag(id.toString()).then((data:any) => console.log("return data: ",data));
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
                <Button  onClick={()=>navigateToItemId(item.id)}>{item.name}</Button>
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

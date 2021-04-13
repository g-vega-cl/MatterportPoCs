import React from 'react';
import { Button, Grid, Switch, Typography } from '@material-ui/core';
import ItemsService from 'services/itemsService';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/Delete';

interface IItemListProps {
  items: any;
  matterPortService: any;
  deleteItem: (id:number) => void;
}

const ItemList: React.FC<IItemListProps> = ({ items, matterPortService,deleteItem }) => {
  
  const navigateToItemId = (matterportId:string)=>{
      matterPortService.navigateToTag(matterportId);
  }

  const handleDeleteItem = (e: any,id: number, matterportId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!matterPortService) return;

    ItemsService.deleteItem(id).then(() => {
      matterPortService.deleteTag(matterportId).then(() => {
        deleteItem(id);
      });
    });
  };

  return (
    <Grid container>
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
            <Grid item xs={6}>
                <Button  onClick={()=>navigateToItemId(item.matterportId)}>{item.name}</Button>
            </Grid>
            <Grid item xs={1}>
              {item.type === 'Light' && <EmojiObjectsIcon />}
              {item.type === 'Tv' && <TvIcon />}
              {item.type === 'Thermostat' && <AcUnitIcon />}
            </Grid>
            <Grid item xs={1}>
              <Button onClick={(e)=>handleDeleteItem(e,item.id,item.matterportId)}>
                <DeleteIcon/>
              </Button>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default ItemList;

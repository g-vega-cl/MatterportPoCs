import React, { useState } from 'react';
import { Button, Grid, Switch, Typography, Slider } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/Delete';
import ItemsService, { IItem } from 'services/itemsService';

interface IItemListProps {
  items: any;
  matterPortService: any;
  deleteItem: (id: number) => void;
}

const ItemList: React.FC<IItemListProps> = ({ items, matterPortService, deleteItem }) => {
  const navigateToItemId = (matterportId: string) => {
    matterPortService.navigateToTag(matterportId);
  };

  const handleSwitchChange = (item: IItem) => {
    ItemsService.updateItem({
      id: item.id,
      name: item.name,
      description: item.description,
      matterportId: item.matterportId,
      position: item.position,
      normal: item.normal,
      value: item.value,
      isPowered: !item.isPowered,
      media: item.media,
      color: item.color,
      type: item.type,
    });
  };

  const MySlider = (item: IItem) => {
    const [temp, setTemp] = useState(item.value);
    const changeSliderState = (val: number) => {
      setTemp(val);
      console.log(val);
      item.value = temp;
      handleSwitchChange(item);
    };
    return (
      <React.Fragment>
          <Grid item xs={3} style={{ marginRight: '15px', marginLeft:'7px', marginTop:'10px' }}>
          <Slider
            defaultValue={temp}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={() => changeSliderState(temp)}
            step={1}
            marks
            min={0}
            max={110}
            style={{marginLeft:'11px'}}
          />
        </Grid>
        <Grid item xs={5}>
          <Button onClick={() => navigateToItemId(item.matterportId)} style={{marginTop:'6px'}}>{item.name}</Button>
        </Grid>

        <Grid item xs={1} style={{marginTop:'6px'}}>
          {item.type === 'Light' && <EmojiObjectsIcon />}
          {item.type === 'Tv' && <TvIcon />}
          {item.type === 'Thermostat' && <AcUnitIcon />}
        </Grid>
        <Grid item xs={1}>
          <Button onClick={(e) => handleDeleteItem(e, item.id, item.matterportId)}>
            <DeleteIcon />
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const MySwitch = (item: IItem) => {
    const [isOn, setOn] = useState(item.isPowered);
    const changeSwitchState = (item: IItem) => {
      setOn(!isOn);
      handleSwitchChange(item);
    };
    return (
      <React.Fragment>
        <Grid item xs={3} style={{ marginRight: '15px', marginLeft:'7px', marginTop:'10px' }}>
          <Switch
            checked={isOn}
            onChange={() => changeSwitchState(item)}
            name={`switch-${item.id}`}
            color="primary"
            size="small"
          />
        </Grid>
        <Grid item xs={5}>
          <Button onClick={() => navigateToItemId(item.matterportId)} style={{marginTop:'6px'}}>{item.name}</Button>
        </Grid>
        <Grid item xs={1} style={{marginTop:'6px'}}>
          {item.type === 'Light' && <EmojiObjectsIcon />}
          {item.type === 'Tv' && <TvIcon />}
          {item.type === 'Thermostat' && <AcUnitIcon />}
        </Grid>
        <Grid item xs={1}>
          <Button onClick={(e) => handleDeleteItem(e, item.id, item.matterportId)}>
            <DeleteIcon />
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const handleDeleteItem = (e: any, id: number, matterportId: string) => {
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
      {items.map((item: IItem, index: number) => {
        return <>{item.type === 'Thermostat' ? MySlider(item) : MySwitch(item)}</>;
      })}
    </Grid>
  );
};

export default ItemList;

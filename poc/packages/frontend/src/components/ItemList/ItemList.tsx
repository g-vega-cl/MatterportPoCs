import React, { useState } from 'react';
import { Button, Grid, Slider, Switch, Typography } from '@material-ui/core';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ItemsService, { IItem } from 'services/itemsService';

interface IItemListProps {
  items: any;
  sdk: any;
}

const ItemList: React.FC<IItemListProps> = ({ items, sdk }) => {
  const navigateToItemId = (id: number) => {
    console.log("navigateSDK", sdk.Mattertag.navigateToTag("5"), " id", id) //IS SID not ID
    sdk.Mattertag.navigateToTag(id.toString()).then((data: any) => console.log("return data: ", data));
  }

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
      type: item.type
    });
  }

  const MySlider = (item: IItem) => {
    const [temp, setTemp] = useState(item.value);
    const changeSliderState = (event: any, newValue: number) => {
      setTemp(newValue);
      console.log(newValue);
      item.value = newValue;
      handleSwitchChange(item);
    }
    return (
      <React.Fragment>
        <Grid item xs={9}>
          <Button onClick={() => navigateToItemId(item.id)}>{item.name}</Button>
        </Grid>
        <Grid item xs={2}>
          {item.type === 'Light' && <EmojiObjectsIcon />}
          {item.type === 'Tv' && <TvIcon />}
          {item.type === 'Thermostat' && <AcUnitIcon />}
        </Grid>
        <Grid item xs={11} style={{ marginRight: '15px' }}>
          <Slider
            value={temp}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={changeSliderState}
            step={1}
            marks
            min={1}
            max={110}
          />
        </Grid>
      </React.Fragment>);

  }

  const MySwitch = (item: IItem) => {
    const [isOn, setOn] = useState(item.isPowered);
    const changeSwitchState = (item: IItem) => {
      setOn(!isOn);
      handleSwitchChange(item);
    }
    return (
      <React.Fragment>
        <Grid item xs={2} style={{ marginRight: '15px' }}>
          <Switch
            checked={isOn}
            onChange={() => changeSwitchState(item)}
            name={`switch-${item.id}`}
            color="primary"
            size="small"
          />
        </Grid>
        <Grid item xs={7}>
          <Button onClick={() => navigateToItemId(item.id)}>{item.name}</Button>
        </Grid>
        <Grid item xs={2}>
          {item.type === 'Light' && <EmojiObjectsIcon />}
          {item.type === 'Tv' && <TvIcon />}
          {item.type === 'Thermostat' && <AcUnitIcon />}
        </Grid>
      </React.Fragment>);
  }

  return (
    <Grid container spacing={1} justify="flex-end" alignItems="center">
      {items.map((item: IItem, index: number) => {
        return (
          <>

            {item.type === "Thermostat" ? MySlider(item) : MySwitch(item)}

          </>
        );
      })}
    </Grid>
  );
};

export default ItemList;

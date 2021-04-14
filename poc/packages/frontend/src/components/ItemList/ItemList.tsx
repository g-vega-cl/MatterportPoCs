import React, { useEffect, useState, useRef } from 'react';
import { Button, Grid, Switch, TextField } from '@material-ui/core';
import ItemsService from 'services/itemsService';
import './styles.scss';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import TvIcon from '@material-ui/icons/Tv';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import DeleteIcon from '@material-ui/icons/Delete';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

interface IItemListProps {
  items: any;
  matterPortService: any;
  deleteItem: (id: number) => void;
}

const ItemList: React.FC<IItemListProps> = ({ items, matterPortService, deleteItem }) => {
  const [itemsValues, setItemsValues] = useState<any[]>([]);
  const firstPopulation = useRef<boolean>(true);

  //First time it runs, set the values. At first all false, when I get the database, they will be taken from the db.
  //The item should have the value. ? eventually it will be like item.status or state or something.
  useEffect(() => {
    const initialItemsValues: any[] = [];
    if (firstPopulation.current) {
      items.forEach((item: any) => {
        if (item.type === 'Thermostat') {
          initialItemsValues.push({'temp':25, 'mode':'Cold'});
        } else {
          initialItemsValues.push(false);
        }
        firstPopulation.current = false;
      });
      setItemsValues(initialItemsValues);
    }
  }, [setItemsValues, items]);

  const navigateToItemId = (matterportId: string) => {
    matterPortService.navigateToTag(matterportId);
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

  //! Pretty function with many parameters.
  const updateItemValue = (index:number, type:string) => (e: any) => {
      const newItemsValues = [...itemsValues];
      if(type !== "Thermostat"){
        newItemsValues[index] = !newItemsValues[index];
        setItemsValues(newItemsValues);
      } else{
        newItemsValues[index].temp = e.target.value;
        setItemsValues(newItemsValues);
      }
  };

  const toggleACMode = (index:number) => (e:any) =>{
    const newItemsValues = [...itemsValues];
    newItemsValues[index].mode = newItemsValues[index].mode == "Cold" ? "Hot" : "Cold";
    setItemsValues(newItemsValues);
  }

  return (
    <Grid container style={{ marginTop: '5px' }}>
      {items.map((item: any, index: number) => {
        return (
          <>
            <Grid item xs={2} style={{ marginRight: '15px', marginTop: '10px' }}>
              {item.type !== 'Thermostat' ? (
                <Switch
                  checked={itemsValues[index]}
                  onChange={updateItemValue(index,item.type)}
                  name={`switch-${index}`}
                  color="primary"
                  size="small"
                />
              ) : (
                <TextField
                  id={`outlined-basic-${index}`}
                  label={`C°`}
                  variant="outlined"
                  value={itemsValues[index]?.temp}
                  onChange={updateItemValue(index,item.type)}
                />
              )}
            </Grid>
            <Grid item xs={6} style={{ marginTop: '5px' }}>
              <Button onClick={() => navigateToItemId(item.matterportId)} style={{ fontSize: '12px' }}>{item.name}</Button>
            </Grid>
            <Grid item xs={1} style={{ marginTop: '6px' }}>
              {item.type === 'Light' && <EmojiObjectsIcon />}
              {item.type === 'Tv' && <TvIcon />}
              {item.type === 'Thermostat' && 
              <Button onClick={toggleACMode(index)} style={{marginLeft:'-20px'}}>
              {itemsValues[index]?.mode == "Cold" ? <AcUnitIcon /> : <WbSunnyIcon/> }
              </Button>
              
              }
            </Grid>
            <Grid item xs={1} style={{marginTop:'3px'}}>
              <Button onClick={(e) => handleDeleteItem(e, item.id, item.matterportId)}>
                <DeleteIcon />
              </Button>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default ItemList;

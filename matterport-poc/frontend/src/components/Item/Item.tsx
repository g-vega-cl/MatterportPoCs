import './Item.scss';

import { Edit, RemoveCircle } from '@material-ui/icons';
import {
  IconButton,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
} from '@material-ui/core';
import React, { useContext } from 'react';

import { MatterSdkStore } from '../../modules/MatterportPage/store';
import ItemsService, { IItem } from '../../services/itemsService';
import { useMatterportService } from '../../services/useMatterportService';

interface IItemProps {
  item: IItem;
  selectedItem: string;
  editItem: (item: IItem) => void;
  deleteItem: (id: number) => void;
  setSelectedItem: (matterportId: string) => void;
}

const Item: React.FC<IItemProps> = ({
  item,
  selectedItem,
  editItem,
  deleteItem,
  setSelectedItem,
}) => {
  const { sdk } = useContext(MatterSdkStore);
  console.log("Item.tsx sdk", sdk)
  const matterPortService = useMatterportService(sdk);

  const handleDeleteItem = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!matterPortService) return;

    ItemsService.deleteItem(item.id).then(() => {
      matterPortService.deleteTag(item.matterportId).then(() => {
        deleteItem(item.id);
      });
    });
  };

  const handleEditItem = (e: any) => {
    e.preventDefault();
    editItem(item);
  };

  const handleSelectItem = () => {
    if (!matterPortService) return;
    setSelectedItem(item.matterportId);
    matterPortService.navigateToTag(item.matterportId);
  };

  return (
    <React.Fragment>
      <ListItem button selected={selectedItem === item.matterportId} onClick={handleSelectItem}>
        <ListItemText
          primary={<Typography variant="h6">{item.name}</Typography>}
          secondary={item.description ? item.description : ''}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={handleEditItem}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDeleteItem} color="secondary">
            <RemoveCircle />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider component="li" />
    </React.Fragment>
  );
};

export default Item;

import React, { useContext, useState, useRef } from 'react';
import './Sidebar.scss';
import { AppBar, Button, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import { AuthenticationStore } from '../../modules/Authentication/store';
import ItemsService, { IItem } from '../../services/itemsService';
import { useMatterportService } from '../../services/useMatterportService';
import { MatterSdkStore } from '../../modules/MatterportPage/store';
import {AddItem} from 'components/AddItem/AddItem';

interface ISidebarProps {
  coords: {
    position: { x: number; y: number; z: number };
    normal: { x: number; y: number; z: number };
  };
  items: any;
  addItem: (item: IItem) => void;
}

const SideBar: React.FC<ISidebarProps> = ({ coords, items, addItem }) => {
  console.log('items ', items);
  const authStore = useContext(AuthenticationStore);
  const { name, loggedIn, role } = authStore?.state?.user;
  // console.log("authStore: ", authStore)
  //! Check if authStore.state.user.role === admin. To add items
  const initialFormValues = {
    name: '',
    description: '',
    type: '',
  };
  const [values, setValues] = useState(initialFormValues);
  const { sdk } = useContext(MatterSdkStore);
  const matterPortService = useMatterportService(sdk);

  const handleAddTag = () => {
    if (!matterPortService) return;
    matterPortService
      .addTags([
        {
          id: 404,
          matterportId: '404',
          ...values,
          ...coords,
          color: { r: 0, g: 0, b: 1.0 },
        },
      ])
      .then((items: IItem[]) => {
        ItemsService.createItem(items[0]).then((item: IItem) => {
          addItem(item);
        });
      });
  };

  const updateValueName = (e: any) => {
    setValues({ ...values, name: e.target.value });
  };

  return (
    <AppBar position="static" style={{ height: '100%' }}>
      <div style={{ height: '100%', backgroundColor: 'red', width: '100%' }}>
        <p>Dashboard</p>
        <AddItem
        coords = {coords}
        handleAddTag = {handleAddTag}
        updateValueName = {updateValueName}
        values = {values}
        >

        </AddItem>
      </div>
    </AppBar>
  );
};

export default SideBar;

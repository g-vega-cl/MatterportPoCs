import React, { useContext, useState, useRef } from 'react';
import './Sidebar.scss';
import { AppBar, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { AuthenticationStore } from '../../modules/Authentication/store';
import ItemsService, { IItem } from '../../services/itemsService';
import { useMatterportService } from '../../services/useMatterportService';
import { MatterSdkStore } from '../../modules/MatterportPage/store';

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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField onChange={updateValueName} label="Name" />
          </Grid>
          <Grid item xs={12}>
            <>
              <Tooltip title="Hover over an area for 1 second to get the coordinates">
                <Typography variant="body1">Selected coordinates:</Typography>
              </Tooltip>
              <Typography variant="body1">{`x:${coords?.normal?.x.toFixed(
                1,
              )},  y:${coords?.normal?.y.toFixed(1)},  z:${coords?.normal?.z.toFixed(
                1,
              )}`}</Typography>
            </>
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Define a name to add an item">
              <Button
                variant="contained"
                onClick={handleAddTag}
                disabled={values.name ? false : true}
              >
                Add item
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </AppBar>
  );
};

export default SideBar;

import React, { useContext, useEffect, useState, useRef } from 'react';
import './Sidebar.scss';
import { AppBar } from '@material-ui/core';
import ItemsService, { IItem } from '../../services/itemsService';
import { useMatterportService } from '../../services/useMatterportService';
import { MatterSdkStore } from '../../modules/MatterportPage/store';
import { AddItem } from 'components/AddItem/AddItem';
import ProfileService, { IProfile } from 'services/profileService';
import { Typography } from '@material-ui/core';
import ItemList from 'components/ItemList/ItemList';

interface ISidebarProps {
  coords: {
    position: { x: number; y: number; z: number };
    normal: { x: number; y: number; z: number };
  };
  items: any;
  deleteItem: (id:number) => void; 
  addItem: (item: IItem) => void;
}

const SideBar: React.FC<ISidebarProps> = ({ coords, items, addItem, deleteItem}) => {
  const [profile, setProfile] = useState<IProfile>();
  const [type, setType] = useState('Light'); //! Get predetermined types.

  useEffect(() => {
    (async function callGetProfile() {
      const response = await ProfileService.getProfile();
      setProfile(response);
    })();
  }, [setProfile]);

  const initialFormValues = {
    name: '',
    description: '',
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
          type,
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
    <AppBar position="static" style={{ height: '100%', width: '100%' }}>
      <div style={{ height: '100%', backgroundColor: '#ff3158' }}>
        <div style={{ paddingLeft: '7px',backgroundColor: '#ff3158'  }}>
          <Typography variant="h6">Dashboard</Typography>
          {profile?.role && (
            <AddItem
              coords={coords}
              handleAddTag={handleAddTag}
              updateValueName={updateValueName}
              values={values}
              type={type}
              setType={setType}
            />
          )}
          <ItemList items={items} matterPortService={matterPortService} deleteItem={deleteItem}/>
        </div>
      </div>
    </AppBar>
  );
};

export default SideBar;

import './MatterportPage.scss';
import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import MatterportBox from 'components/MatterportBox';
import Sidebar from 'components/Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import ItemsService, { IItem } from '../../../services/itemsService';
import useMatterportSdk from '../../../utils/hooks/matterport/useMatterPortSdk';
import { useMatterportService } from '../../../services/useMatterportService';
import { BASE_COORDS, CoordsPoint, MATTERPORT_CONNECTION } from '../constants';
import { MatterSdkStore } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  sidebar: {
    height: '100%',
  },
}));

interface TagCoords {
  position: CoordsPoint;
  normal: CoordsPoint;
}

const MatterportPage: React.FC<any> = () => {
  const { setSdk } = useContext(MatterSdkStore);
  const [items, setItems] = useState<any[]>([]);
  const [tagCoords, setTagCoords] = useState<TagCoords>({
    position: { ...BASE_COORDS },
    normal: { ...BASE_COORDS },
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { sdk } = useMatterportSdk({ ...MATTERPORT_CONNECTION, iframeRef });
  const matterPortService = useMatterportService(sdk);

  useEffect(() => {
    if (!!sdk) {
      setSdk(sdk);
    }
  }, [sdk, setSdk]);

  const getItems = useCallback(() => {
    if (!matterPortService) return;
    ItemsService.getItems().then((items) => {
      return matterPortService
        .addTags(items)
        .then((itemsWithTags: IItem[]) => setItems(itemsWithTags));
    });
  }, [matterPortService]);

  const addItem = (item: IItem) => {
    setItems([...items, item]);
    setTagCoords({
      position: { ...BASE_COORDS },
      normal: { ...BASE_COORDS },
    });
  };

  const deleteItem = (id: number) => {
    let deleted: boolean = false;
    let index = 0;
    let newItems = [...items];
    while (index < items.length && !deleted) {
      if (items[index].id === id) {
        newItems.splice(index, 1);
        deleted = !deleted;
      }
      index++;
    }
    setItems(newItems);
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item sm={10}>
        <MatterportBox //The main box
          setTagCoords={setTagCoords}
          onLoad={getItems}
          iframeRef={iframeRef}
        />
      </Grid>
      <Grid item className={classes.sidebar} sm={2}>
        <Sidebar coords={tagCoords} addItem={addItem} items={items} />
      </Grid>
    </Grid>
  );
};

export default MatterportPage;

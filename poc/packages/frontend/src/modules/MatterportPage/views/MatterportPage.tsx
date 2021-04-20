import './MatterportPage.scss';
import { Grid, Button } from '@material-ui/core';
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
    display:'flex',
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
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayItem, setOverlayItem] = useState({});

  const updateOverlay  = (item:any) =>{
    setShowOverlay(true);
    setOverlayItem(item);
  }

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

  //Images taken from https://icons8.com/icons/
  useEffect(()=>{
    if(sdk){
      if(sdk.Mattertag){
        items.forEach((item)=>{
          switch(item.type){
            case "Light":
              sdk?.Mattertag.getData().then((data:any)=>{
                sdk.Mattertag.registerIcon('88889', 'https://img.icons8.com/cotton/100/000000/innovation.png').then((empty:any)=>{
                  sdk.Mattertag.editIcon(item.matterportId, '88889');
                })
              })
              break;
            case "Thermostat":
              sdk?.Mattertag.getData().then((data:any)=>{
                sdk.Mattertag.registerIcon('88890', 'https://img.icons8.com/doodle/100/000000/air-conditioner.png').then((empty:any)=>{
                  sdk.Mattertag.editIcon(item.matterportId, '88890');
                })
              })
              break;
            case "Tv":
              sdk?.Mattertag.getData().then((data:any)=>{
                sdk.Mattertag.registerIcon('88891', 'https://img.icons8.com/plasticine/100/000000/retro-tv.png').then((empty:any)=>{
                  sdk.Mattertag.editIcon(item.matterportId, '88891');
                })
              })
              break;
            default:
              break;
          }
        })
      }
    };
  },[items])

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
  const pageheight='94vh'
  return (
    <Grid container className={classes.root} spacing={0} style={{height: pageheight}}>
      <Grid item lg={9} md={8} sm={7} xs = {12} style={{height: pageheight}}>
        <MatterportBox //The main box
          setTagCoords={setTagCoords}
          onLoad={getItems}
          iframeRef={iframeRef}
          showOverlay = {showOverlay}
          setShowOverlay={setShowOverlay}
          overlayItem={overlayItem}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={5} xs = {12} className="sidebar-grid" style={{height: pageheight}}>
        <Sidebar coords={tagCoords} addItem={addItem} items={items} deleteItem={deleteItem} updateOverlay={updateOverlay}/> 
      </Grid>
    </Grid>
  );
};

export default MatterportPage;

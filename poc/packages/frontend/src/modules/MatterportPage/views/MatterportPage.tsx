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

  useEffect(()=>{
    if(sdk){
      if(sdk.Mattertag){
        items.forEach((item)=>{
          if(item.type === "Light"){
            sdk?.Mattertag.getData().then((data:any)=>{
              let currentSID = data[0]?.sid;
              sdk.Mattertag.registerIcon('88889', 'https://img.icons8.com/cotton/64/000000/innovation.png').then((empty:any)=>{
                console.log("iconRegistered", empty)
                sdk.Mattertag.editIcon(currentSID, '88889');
              }).then((empty:any)=>{
                console.log("Icon edited ", empty);
              })
            })
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


  // const registerSID =()=>{
  //   if(sdk){
  //     if(sdk.Mattertag){
  //       if(item.type === "Light"){
  //         sdk?.Mattertag.getData().then((data:any)=>{
  //           let currentSID = data[0]?.sid;
  //           sdk.Mattertag.registerIcon('88889', 'https://img.icons8.com/cotton/64/000000/innovation.png').then((empty:any)=>{
  //             console.log("iconRegistered", empty)
  //             sdk.Mattertag.editIcon(currentSID, '88889');
  //           }).then((empty:any)=>{
  //             console.log("Icon edited ", empty);
  //           })
  //         })
  //       }
  //     }
  //   };
  // }

  

  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} spacing={0} style={{height: "89vh"}}>
      <Grid item lg={9} md={8} sm={7} xs = {12}>
        <MatterportBox //The main box
          setTagCoords={setTagCoords}
          onLoad={getItems}
          iframeRef={iframeRef}
        />
      </Grid>
      <Grid item lg={3} md={4} sm={5} xs = {12}>
        <Sidebar coords={tagCoords} addItem={addItem} items={items} deleteItem={deleteItem} />
      </Grid>
      {/* <Grid item xs = {1} style={{backgroundColor:'green'}}>
        <Button onClick={registerSID}>REGISTER SID <img src={"https://img.icons8.com/cotton/64/000000/innovation.png"} alt="Logo" style={{height:'50px', width:'50px'}}/>;</Button>
      </Grid> */}
    </Grid>
  );
};

export default MatterportPage;

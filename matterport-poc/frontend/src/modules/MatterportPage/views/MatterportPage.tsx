import './MatterportPage.scss';

import { Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';

import Items from '../../../components/Items';
import MatterportBox from '../../../components/MatterportBox';
import TagForm from '../../../components/TagForm';
import ItemsService, { IItem } from '../../../services/itemsService';
import useMatterportSdk from '../../../utils/hooks/matterport/useMatterPortSdk';
import { useMatterportService } from '../../../services/useMatterportService';
import { BASE_COORDS, CoordsPoint, MATTERPORT_CONNECTION } from '../constants';
import { MatterSdkStore } from '../store';

// services
// components
interface TagCoords {
  position: CoordsPoint;
  normal: CoordsPoint;
}
const MatterportPage: React.FC<any> = () => {
  const { setSdk } = useContext(MatterSdkStore);
  const [formMode, setFormMode] = useState<'ADD' | 'EDIT'>('EDIT');
  const [itemToUpdate, setItemToUpdate] = useState<IItem>({
    id: 0,
    name: '',
    description: '',
    matterportId: '',
    color: { r: 0, g: 0, b: 0 },
    position: { ...BASE_COORDS },
    normal: { ...BASE_COORDS },
  });
  const [items, setItems] = useState<any[]>([]);
  const [showFormTag, setShowFormTag] = useState(false);
  const [tagCoords, setTagCoords] = useState<TagCoords>({
    position: { ...BASE_COORDS },
    normal: { ...BASE_COORDS },
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  console.log("iframeRef in MatterportPage.tsx", iframeRef);
  const { sdk } = useMatterportSdk({ ...MATTERPORT_CONNECTION, iframeRef });
  const matterPortService = useMatterportService(sdk);

  useEffect(() => {
    if (!!sdk) {
      setSdk(sdk);
    }
    console.log("sdkUseEffect");
  }, [sdk, setSdk]);

  const activateAddMode = () => {
    setShowFormTag(true);
    setFormMode('ADD');
    console.log("activateAddMode");
  };

  const activateEditMode = (item: IItem) => {
    setShowFormTag(true);
    setItemToUpdate(item);
    setTagCoords({ position: item.position, normal: item.normal });
    setFormMode('EDIT');
    console.log("activateEditMode");
  };

  const getItems = useCallback(() => {
    if (!matterPortService) return;

    ItemsService.getItems().then((items) => {
      console.log("itemService item ", items)
      return matterPortService
        .addTags(items)
        .then((itemsWithTags: IItem[]) => setItems(itemsWithTags));
    });
    console.log("getItems");
  }, [matterPortService]);

  const addItem = (item: IItem) => {
    setItems([...items, item]);
    setTagCoords({
      position: { ...BASE_COORDS },
      normal: { ...BASE_COORDS },
    });
    closeTagForm();
    console.log("addItem", item, "COORDS ", BASE_COORDS);
  };

  const updateItem = (item: IItem) => {
    let updated: boolean = false;
    let index = 0;
    let newItems = [...items];
    while (index < items.length && !updated) {
      if (items[index].id === item.id) {
        newItems[index] = item;
        updated = !updated;
      }
      index++;
    }
    setItems(newItems);
    setItemToUpdate({
      id: 0,
      name: '',
      description: '',
      matterportId: '',
      color: { r: 0, g: 0, b: 0 },
      position: { ...BASE_COORDS },
      normal: { ...BASE_COORDS },
    });
    closeTagForm();
    console.log("updateItem");
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
    console.log("deleteItem");
  };

  const closeTagForm = () => {
    console.log("closeTagForm");
    setShowFormTag(false);
  };

  return (
    <Grid container className="main-page">
      <Grid item md={8} xs={12}>
        <MatterportBox //The main box
          iframeRef={iframeRef}
          showFormTag={showFormTag}
          tagCoords={tagCoords}
          setTagCoords={setTagCoords}
          onLoad={getItems}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        {showFormTag && (
          <TagForm //The form shown when you click the AddCicrcleIcon
            item={itemToUpdate}
            coords={tagCoords}
            mode={formMode}
            addItem={addItem}
            updateItem={updateItem}
            onCancel={closeTagForm}
          />
        )}
        <Items items={items} deleteItem={deleteItem} editItem={activateEditMode} />
        {!showFormTag && (
          <IconButton onClick={activateAddMode}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default MatterportPage;

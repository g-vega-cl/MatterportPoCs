import React, { useContext } from 'react';
import './TagForm.scss';

import { LocationOn, LocationOff } from '@material-ui/icons';
import { TextField, Button, Typography } from '@material-ui/core';

// services
import ItemsService, { IItem } from '../../services/itemsService';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMatterportService } from '../../services/useMatterportService';
import { MatterSdkStore } from '../../modules/MatterportPage/store';

interface ITagFormProps {
  item: IItem;
  coords: {
    position: { x: number; y: number; z: number };
    normal: { x: number; y: number; z: number };
  };
  mode: 'ADD' | 'EDIT';
  addItem: (item: IItem) => void;
  updateItem: (item: IItem) => void;
  onCancel: () => void;
}

const MatterportBox: React.FC<ITagFormProps> = ({
  item,
  coords,
  mode,
  addItem,
  updateItem,
  onCancel,
}) => {
  const { sdk } = useContext(MatterSdkStore);
  console.log("TAGFORM sdk", sdk)
  const matterPortService = useMatterportService(sdk);

  const handleAddTag = (values: typeof initialFormValues) => {
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

  const handleUpdateTag = (values: typeof initialFormValues) => {
    if (!matterPortService) return;

    ItemsService.updateItem({ ...item, ...values }).then((item: IItem) => {
      matterPortService.updateTag(item).then((item: IItem) => {
        updateItem(item);
      });
    });
  };

  const initialFormValues = {
    name: mode === 'EDIT' && item ? item.name : '',
    description: mode === 'EDIT' && item ? item.description : '',
  };

  const validationSchema = yup.object<typeof initialFormValues>({
    name: yup.string().required(),
    description: yup.string(),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (mode === 'EDIT') {
          handleUpdateTag(values);
        } else {
          handleAddTag(values);
        }
      }}
    >
      {({ submitForm, values, handleChange, handleBlur, dirty, isValid, errors }) => {
        return (
          <div className="tag-form">
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              error={!!errors.name}
              helperText={!!errors.name ? errors.name : ''}
            />
            <TextField
              id="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              error={!!errors.description}
              helperText={!!errors.description ? errors.description : ''}
            />

            <div className="tag-form--coords">
              {coords.position.x && coords.position.y && coords.position.z ? (
                <React.Fragment>
                  <LocationOn style={{ fontSize: '1.2rem', color: 'green' }} />
                  <Typography>
                    {`${coords.position.x.toFixed(4)}, ${coords.position.y.toFixed(
                      4,
                    )}, ${coords.position.z.toFixed(4)}`}
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LocationOff style={{ fontSize: '1.2rem', color: '#9c1a33' }} />
                  <Typography>No location selected</Typography>
                </React.Fragment>
              )}
            </div>
            <div className="tag-form--buttons">
              <Button onClick={onCancel} variant="contained" size="small">
                Cancel
              </Button>
              <Button
                disabled={!isValid || !dirty}
                onClick={submitForm}
                variant="contained"
                color="primary"
                style={{ marginLeft: '4px' }}
                size="small"
                className="main-button"
              >
                {mode === 'ADD' ? 'Create' : 'Update'}
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default MatterportBox;

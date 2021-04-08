import { AppBar, Button, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import ItemsService, { IItem } from '../../services/itemsService';

interface IAddItemInterface {
    coords: {
      position: { x: number; y: number; z: number };
      normal: { x: number; y: number; z: number };
    };
    handleAddTag: any;
    updateValueName: any;
    values: any;
  }

export const AddItem: React.FC<IAddItemInterface> = ({coords, handleAddTag, updateValueName, values}) =>{
    return (
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
    )
}
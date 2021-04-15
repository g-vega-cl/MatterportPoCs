import { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

interface IAddItemInterface {
  coords: {
    position: { x: number; y: number; z: number };
    normal: { x: number; y: number; z: number };
  };
  handleAddTag: any;
  updateValueName: any;
  values: any;
  type: string;
  setType: any;
}

export const AddItem: React.FC<IAddItemInterface> = ({
  coords,
  handleAddTag,
  updateValueName,
  values,
  type,
  setType,
}) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
  };

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  const buttonsWidth = '265px';
  if (showAdd) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <TextField onChange={updateValueName} label="Name" style={{ width: buttonsWidth }} />
        </Grid>
        <Grid item xs={2} style={{marginTop:'5px'}}>
          <Button onClick={toggleShowAdd}><CancelIcon/></Button>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '5px' }}>
          <>
            <Tooltip title="Hover over an area for 1 second to get the coordinates">
              <Typography variant="body1">{`x:${coords?.normal?.x.toFixed(
                3,
              )},  y:${coords?.normal?.y.toFixed(3)},  z:${coords?.normal?.z.toFixed(
                3,
              )}`}</Typography>
            </Tooltip>
          </>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined">
            <Typography variant="body1" style={{ marginBottom: '3px' }}>
              Item type
            </Typography>
            <Select
              labelId="inputType"
              id="inputType"
              value={type}
              onChange={handleTypeChange}
              style={{ width: buttonsWidth }}
            >
              <MenuItem value={'Light'}>Light</MenuItem>
              <MenuItem value={'Tv'}>Tv</MenuItem>
              <MenuItem value={'Thermostat'}>Thermostat</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Tooltip title="Define a name to add an item">
          <Grid item xs={12} style={{marginBottom:'10px'}}>
            <Button
              variant="contained"
              onClick={handleAddTag}
              disabled={values.name ? false : true}
              style={{ width: buttonsWidth }}
            >
              Add item
            </Button>
          </Grid>
        </Tooltip>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={1} justify="center" alignContent="center" >
        <Tooltip title="Click to add an item">
          <Button variant="contained" onClick={toggleShowAdd} style={{marginTop:'10px'}}>Open add item menu</Button>
        </Tooltip>
      </Grid>
    );
  }
};

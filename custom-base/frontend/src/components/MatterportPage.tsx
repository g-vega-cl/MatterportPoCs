import React from "react";
import { Grid } from "@material-ui/core";
import { MatterportBox } from "components/MatterportBox";
export const MatterportPage: React.FC<any> = () => {
  return (
    <Grid container className="main-page">
      <Grid item md={12} xs={12}>
        <MatterportBox />
      </Grid>
    </Grid>
  );
};

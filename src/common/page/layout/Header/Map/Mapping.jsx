import React from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Cards from "./Cards";
import "./Cards.scss"


const Mapping = ({ open, close }) => {

  const Closed = () => {
    close({
      division: "Mapping",
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="lg"
      fullScreen={fullScreen}
      onClose={Closed}
    >

      <DialogContent dividers>
        <button className="fun" >어디로 갈래</button>
           <Cards close={close}/>
      </DialogContent>
     
      <DialogActions>
        <Button onClick={Closed} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Mapping;

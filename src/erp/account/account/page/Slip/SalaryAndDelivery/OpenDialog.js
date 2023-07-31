import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MonthSalary from "./MonthSalary";
import Delivery from "./Delivery";
import Order from "./Order";

const OpenDialog = ({ open, close, value }) => {
  const [division, setDivision] = React.useState(2);
  const Close = () => {
    close({
      division: "SalaryDialog", //Delivery
    });
  };
  const handleChange = (event, newValue) => {
    setDivision(newValue);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  return(
      <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          fullWidth={true}
          fullScreen={true}

      >
        <DialogTitle id="simple-dialog-title" Align="center">
          발주/납품
          <DialogActions>
            <Button variant="contained" onClick={Close} color="primary">
              X
            </Button>
          </DialogActions>
        </DialogTitle>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={division} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="발주" />
              <Tab label="납품"  />
            </Tabs>
          </AppBar>
          {
              division===0&&
              <Order close={close}/>
          }
          {
              division===1&&
              <Delivery close={close}/>
          }
          {/* {
          division===2&&
            <MonthSalary  close={close}></MonthSalary>   //임금  
        } */}
        </div>
      </Dialog>
  )


}


export default OpenDialog;

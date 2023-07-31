import React from "react";
import UseStyles from "./UseStyles";
import {
  Paper,
  Grid,
  AppBar,
  Tab,
  Toolbar,
  Typography,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import { TabList, TabPanel } from "@material-ui/lab";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import EmploymentSearchGrid from "./EmploymentSearchGrid";
import EmploymentAddGrid from "./EmploymentAddGrid";
import { SEARCH_EMPLOYMENT } from "erp/hr/attendance/saga/SearchEmploySaga";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
//useSelector 스토어 에있는거 빼서 사용하는애
//useDispatch createaction 실행 
const Employment = props => {
  
  //tab style
  const classes = UseStyles();
  const [value, setValue] = React.useState("1");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const handleEmployment = (startDate, endDate, empCode) => {
  
    dispatch({
      type: SEARCH_EMPLOYMENT,
      params: {
        startDate: startDate,
        endDate: endDate,
        empCode: empCode,
      },
    });
  };

 
//insert는 state로 따로 관리할 필요 없이 값만 db로 집어넣으면 끝나기 때문에 굳이 saga사용할 필요x
    async function insertEmployment(employment){
    try{
      await  Axios.post('http://localhost:8282/hr/certificate/insertCertificateRequest', employment)
      .then(function(respones){
       
        if(parseInt(respones.data.errorCode) === 0 ){
          alert("신청 성공하였습니다.");
        }else{
          alert("신청 실패하였습니다.");
        }
      })
    }catch(e){
      alert(e)
    }
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">재직증명서 신청/조회/발급</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.centerPaper}>
            <TabContext value={value}> 
              <AppBar position="static">
                <TabList onChange={handleChange} scrollButtons="auto">
                  <Tab label="재직증명서 신청" value="1" />
                  <Tab label="재직증명서 조회/발급" value="2" />
                </TabList>
              </AppBar>
              <TabPanel value="1">
                <EmploymentAddGrid insertEmployment={insertEmployment}/>
              </TabPanel>
              <TabPanel value="2">
                <EmploymentSearchGrid handleEmployment={handleEmployment} />
              </TabPanel>
            </TabContext>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Employment;

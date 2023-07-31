import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseStyles from "./UseStyles";
import moment from "moment";
import {
  Paper,
  TextField,
  Button,
  Grid,
  AppBar,
  InputLabel,
  Box,
  Typography,
  Toolbar,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function EmploymentAddGrid(props) {
  const today = new Date();
  // const requestDate =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let requestDate = moment(new Date()).format("yyyy-MM-DD");

  const classes = UseStyles();

  const empInfo = useSelector(state => state.logInOutReducer.empInfo);


  //각 항목들의 초기값
  const useDate = "";
  const usageCode = "";
  const etc = "";
  const empCode = empInfo.empCode;

  //아래 항목들을 useState에 담아서 한번에 관리하는게 좋음 (certificateTO 하나의 객체로 관리하는게 좋기 때문)
  const [employment, setEmployment] = React.useState({});

  const insertCertificate = e => {
    
    props.insertEmployment(employment)
  };

  //{e => {  setEmployment({...employment ,[e.target.id]:e.target.value}); }} 를 좀 더 깔끔하게 하고싶다면 onChange함수를 바깥으로 빼는 방법도 있음
  // const onChange = e => {
 
  // };

  useEffect(()=>{
    setEmployment({
      empCode,
      requestDate,
      approvalStatus : "승인대기"
    })
    return setEmployment({
      empCode,
      requestDate,
      approvalStatus : "승인대기"
    });
  },[]);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.leftPaper}>
            <form>
              <TextField
                id="requestDate"
                label="신청일"
                type="date"
                defaultValue={requestDate}
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <br />
              <TextField
                id="empName"
                label="신청자"
                variant="outlined"
                defaultValue={empInfo.empName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <input type="hidden" value={empCode} />
              <br />
              <TextField
                id="deptName"
                label="부서명"
                variant="outlined"
                defaultValue={empInfo.deptName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <br />
              <TextField
                id="useDate"
                label="사용일자"
                type="date"
                defaultValue={useDate}
                onChange={e => {
                  setEmployment({...employment ,[e.target.id]:e.target.value});
                }}
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-cost-simple">
                  용도 선택
                </InputLabel>
                <Select name='usageCode' onChange={e => {
                  setEmployment({...employment ,[e.target.name]:e.target.value});
                }}
                  defaultValue={usageCode}
                  input={
                    <OutlinedInput name="cost" id="outlined-cost-simple" />
                  }
                >
                  <MenuItem value="ELM001">금융기관 제출용</MenuItem>
                  <MenuItem value="ELM002">관공서 제출용</MenuItem>
                  <MenuItem value="ELM003">회사 제출용</MenuItem>
                  <MenuItem value="ELM004">기타 제출용</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="etc"
                label="비고"
                variant="outlined"
                defaultValue={etc}
                onChange={e => {
                  setEmployment({...employment ,[e.target.id]:e.target.value});
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <Box textAlign="right">
              <Button
                variant={"outlined"}
                color={"primary"}
                className={classes.button}
                onClick={insertCertificate}
              >
                신청
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EmploymentAddGrid;

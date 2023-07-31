import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseStyles from "./UseStyles";
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
import useInput from "util/useInput";

import { REST_ATTD_REQUEST } from "erp/hr/ActionType/ActionType";
import Axios from "axios";

function EmploymentGrid(props) {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const classes = UseStyles();
  // const [emp, setEmp] = useState("");
  // const { workPlace, departmentList } = useSelector(state => state.HrReducer);
 

  const empInfo = useSelector(state => state.logInOutReducer.empInfo);


  // const [data, setData] = useState([]);
  // useEffect(()=>{
  //   Axios.get()
  // })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.topPaper}>
            <FormControl variant="outlined" className={classes.topFormControl}>
              <InputLabel htmlFor="outlined-attdRestTypeCode-simple">
                ATTD TYPE
              </InputLabel>

              <Select
                input={
                  <OutlinedInput
                    name="attdRestTypeCode"
                    id="outlined-attdRestTypeCode-simple"
                  />
                }
              >
                <option value="ASC008">재직증명서 신청</option>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.leftPaper}>
            <AppBar position="relative" className={classes.subCategory}>
              <Toolbar>
                <Typography variant="h5">재직증명서 신청</Typography>
              </Toolbar>
            </AppBar>
            <br />
            <form>
              <TextField
                id="requestDate"
                label="신청일"
                type="date"
                defaultValue={date}
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
                id="cause"
                label="신청자"
                variant="outlined"
                defaultValue={empInfo.empName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <TextField
                id="cause"
                label="부서"
                variant="outlined"
                defaultValue={empInfo.empName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <TextField
                id="requestDate"
                label="사용일자"
                type="date"
                defaultValue=""
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
                <Select
                  input={
                    <OutlinedInput name="cost" id="outlined-cost-simple" />
                  }
                >
                  <MenuItem value="ASC008">초과근무</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="cause"
                label="비고"
                variant="outlined"
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
              >
                재직증명서 신청
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.rightPaper}>
            <AppBar position="relative" className={classes.subCategory}>
              <Toolbar>
                <Typography variant="h5">재직증명서 조회/발급/신청</Typography>
              </Toolbar>
            </AppBar>
            <br />
            <div>
              <TextField
                id={"fromDate"}
                label={"검색날짜"}
                type={"date"}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              ~
              <TextField
                id={"toDate"}
                label={"검색날짜"}
                type={"date"}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <Button
                variant={"outlined"}
                color={"primary"}
                className={classes.button}
              >
                조회
              </Button>
            </div>
            <div
              className={"ag-theme-material"}
              style={{
                height: "400px",
                width: "100%",
              }}
            ></div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EmploymentGrid;

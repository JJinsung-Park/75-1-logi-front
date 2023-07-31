import React, { useState, useEffect, useRef, useCallback } from 'react';
import UseStyles from "./UseStyles";
import {
  Paper, TextField, Button, Grid, AppBar, InputLabel, Typography, Toolbar, MenuItem, Select,
  FormControl, OutlinedInput
} from "@material-ui/core"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AttdApplInput from "./AttdApplInput";
import useInput from "util/useInput";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

//***************************** 결제승인관리 시작 재영 ***************************/
const AttdAppl = (props) => {

  const radioValue = useInput();
  const columnDefs = AttdApplInput;
  const classes = UseStyles();
  const fromDate = useInput("2021-01-01");
  const toDate = useInput("2021-12-31");
  const deptCode = useInput();
  const [checkData, setCheckData] = useState(0);

  const searchAttdAppl = () => {

    if (deptCode.value === undefined) {
      alert('부서를 선택해 주세요.')
      return;
    }
    props.searchAttdApplList({ deptCode: deptCode.value, startDate: fromDate.value, endDate: toDate.value });
  };

  const handleChange = (event) => {
    radioValue.setValue(event.target.value);
    const size = checkData.length;
    for (let a = 0; a < size; a++) {
      if (event.target.value === '승인') {
        checkData[a].applovalStatus = 'apploval';
      } else if (event.target.value === '승인취소') {
        checkData[a].applovalStatus = 'cancel';
      } else {
        checkData[a].applovalStatus = 'return';
      }
    }
  };

  const onRowSelected = useCallback((e) => {
    setCheckData(e.api.getSelectedRows())
  }, [])

  const updateAttdAppl = () => {
    props.update(checkData, deptCode.value, fromDate.value, toDate.value);
  }

  const onChangeDeptCode = (e) => {
    deptCode.setValue(e.target.value)
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.mainPaper}>
        <AppBar position="relative" className={classes.subCategory}>
          <Toolbar>
            <Typography variant="h5">결재승인관리</Typography>
          </Toolbar>
        </AppBar>
        <br />
        <div>
          <FormControl variant="outlined" className={classes.searchTextField}>
            <InputLabel

              htmlFor="outlined-cost-simple"
            >
              조회부서
            </InputLabel>
            <Select
              onChange={onChangeDeptCode}
              input={
                <OutlinedInput
                  name="deptDivision"
                  id="outlined-cost-simple"
                />
              }
            >
              <MenuItem value="DPT-01">총무부</MenuItem>
              <MenuItem value="DPT-02">영업부</MenuItem>
              <MenuItem value="DPT-03">생산부</MenuItem>
              <MenuItem value="DPT-04">인사부</MenuItem>
              <MenuItem value="DPT-05">개발부</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id={"fromDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={fromDate.value}
            onChange={fromDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
          <TextField
            id={"toDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={toDate.value}
            onChange={toDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
          <Button
            variant={"outlined"}
            color={"primary"}
            className={classes.searchButton}
            onClick={searchAttdAppl}
          >
            조회
          </Button>
        </div>
        <br />
        <div className={classes.radio}>
          <FormControl component="fieldset" >
            <RadioGroup row aria-label="position" value={radioValue.value} onChange={handleChange} >
              <FormControlLabel value="승인" control={<Radio />} label="승인" />
              <FormControlLabel value="승인취소" control={<Radio />} label="승인취소" />
              <FormControlLabel value="반려" control={<Radio />} label="반려" />
            </RadioGroup>
          </FormControl>
          <Button
            variant={"outlined"}
            color={"primary"}
            name={"confirm"}
            onClick={updateAttdAppl}
          >
            확정
          </Button>
        </div>
        <br />
        <div
          className={"ag-theme-material"}
          style={{
            height: "400px",
            width: "100%"
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={props.attdApplList}
            suppressRowClickSelection={"true"}
            onRowSelected={onRowSelected}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            onGridReady={(event) => {
              event.api.sizeColumnsToFit();
            }}
            rowSelection="multiple" //여러개선택가능 
          />
        </div>
      </Paper>

    </Grid>
  );
}

export default AttdAppl;
//***************************** 결제승인관리 종료 재영 ***************************/
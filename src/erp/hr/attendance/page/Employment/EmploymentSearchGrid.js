import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseStyles from "./UseStyles";
import {
  Paper,
  TextField,
  Button,
  Grid,
  AppBar,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useInput from "util/useInput";
import EmploymentInput from "./EmploymentInput";
import Axios from "axios";
import moment from "moment";

function EmploymentSearchGrid(props) {
  //2020년1월1일부터 현재날짜
  const today = new Date();
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let date = moment(new Date()).format("yyyy-MM-DD");
  const classes = UseStyles();
  // const startDate = useInput(today.getFullYear() + "-01-01");

  const [startDate, setStartDate] = useState(today.getFullYear() + "-01-01");
  const [endDate, setEndDate] = useState(date);
  const [deleteGridList ,setDeleteGridList] = useState(null);
  const [delData, setDelData] = useState([]);

  //empInfo에 저장된 정보 가져옴
  const empInfo = useSelector(state => state.logInOutReducer.empInfo);
  const empName = empInfo.empName;
  const empCode = empInfo.empCode;



  //그리드 value값
  const columnDefs = EmploymentInput;

  const searchEmployment = () => {
    
    props.handleEmployment(startDate, endDate, empCode);
  };

  //선택한 rowData delData에 저장
  const onRowSelected = e => {
    setDelData(e.api.getSelectedRows());
  }

  const deleteEmployment = () => {
    
    if(delData.length === 0 ){
      alert("삭제할 항목을 체크 해주세요.");
    }else{
      Axios.post('http://localhost:8282/hr/certificate/deleteCertificate', delData)
      .then(function(respones){
        const errorCode = respones.data.errorCode
        if(parseInt(errorCode) === 0){
          alert("삭제 성공하였습니다.")
          deleteGridList.updateRowData({ remove: delData });
        }else{
          alert("삭제 실패하였습니다.");
        }
      })
    }
  }

  const data = useSelector(({hr}) => hr.attdance.searchEmployment.certificateList);
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.rightPaper}>
            <div>
              <TextField
                id={"startDate"}
                label={"검색날짜"}
                type={"date"}
                defaultValue={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              ~
              <TextField
                id={"endDate"}
                label={"검색날짜"}
                type={"date"}
                defaultValue={endDate}
                onChange={e => {
                  setEndDate(e.target.value);
                }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <input type="hidden" value={empCode} />
              <TextField
                label="직원명"
                id={"empName"}
                defaultValue={empName}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                size="small"
                type={"text"}
              />
              <Button
                variant={"outlined"}
                color={"primary"}
                className={classes.button}
                onClick={searchEmployment}
              >
                조회
              </Button>
              <Button
                variant={"outlined"}
                color={"primary"}
                className={classes.button}
                onClick={deleteEmployment}
              >
                삭제
              </Button>
            </div>
            <div
              className={"ag-theme-material"}
              style={{
                height: "500px",
                width: "100%",
              }}
            >
              <AgGridReact 
              columnDefs={columnDefs} 
              rowData={data} 
              getRowStyle={function (param) { return { "text-align": "center" }; }}
              rowSelection="multiple"
              onRowSelected={onRowSelected}
              onGridSizeChanged={event => {
                event.api.sizeColumnsToFit();
              }}
              onGridReady={event => {
                event.api.sizeColumnsToFit();
                setDeleteGridList(event.api);
              }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default EmploymentSearchGrid;

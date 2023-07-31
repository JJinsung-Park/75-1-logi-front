import React, { useEffect, useState } from "react";
import GridStyle from "./GridStyle";
import useInput from "util/useInput";
import "./App.css";
import CustomizedSelects from "./Combo";
import moment from "moment";
import {
  Paper,
  TextField,
  Button,
  Grid,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

//===========================재영 일근태 기록/조회 20-08-27======================//
const DayAttdGrid = props => {

  // sessionStorage.getItem 모든값을 문자로 저장
  const empCode = sessionStorage.getItem("empCodeInfo_token");
  // Grid
  const classes = GridStyle();
  // 현재시간
  let thisTime = moment().format("HH:mm");
  // 오늘 날짜
  let today = moment().format("YYYY-MM-DD");
  // 적용일
  const [applyDay, setApplyDay] = useState(today);
  // 근태구분코드
  const attdType = useInput();
  // 근태구분명
  const attdTypeName = useInput();
  // 출퇴근시간
  const [time, setTime] = useState(thisTime);

  const [delData, setDelData] = useState([]);

  const [deleteGridList, setDeleteGridList] = useState(null);

  const column = {
    columnDefs: [
      { headerName: "사원코드", field: "empCode", hide: true }, // 숨기기
      { headerName: "일련번호", field: "dayAttdCode", hide: true },
      {
        headerName: "적용일",
        field: "applyDay",
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      }, //체크박스창
      { headerName: "근태구분코드", field: "attdTypeCode", hide: true },
      { headerName: "근태구분명", field: "attdTypeName" },
      { headerName: "출/퇴근", field: "time" },
    ],
  };

  useEffect(() => {
    
    props.handleDayAttd(applyDay, empCode);
  }, []);

  const searchDayAttd = () => {
    props.handleDayAttd(applyDay, empCode);
  };

  const insertDayAttd = () => {
    if (!attdType.value) {
      alert("근태구분을 선택 해주세요.");
    }
    props.handleInsertDayAttd(
      empCode,
      applyDay,
      attdType.value,
      attdTypeName.value,
      time.replace(":", ""),
    );
    if (!!props.attdData) {
      alert(attdTypeName.value + " 기록이 완료 되었습니다.");
    }
  };

  const onRowSelected = e => {
    setDelData(e.api.getSelectedRows());
  };

  const deleteDayAttd = () => {
   
    if (delData.length === 0) {
      alert("삭제할 항목을 체크해 주세요");
    } else {
      props.deleteDayAttdStart({ data: delData });
      alert("선택한 항목이 삭제 되었습니다.");
      deleteGridList.updateRowData({ remove: delData });
    }
  };

  return (
    <React.Fragment>
      <div className="ui primary segment">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography component="h2" variant="h4">
              일근태 조회 / 기록
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <br />
      <div>
        <Grid
          container
          spacing={8}
          alignContent="center"
          justify="center"
          alignItems="baseline"
        >
          <Grid item xs={3}>
            <Paper className={classes.leftPaper}>
              <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                  <Typography variant="h5">일근태 기록</Typography>
                </Toolbar>
              </AppBar>
              <br />
              <br />
              <br />
              <br />
              <form>
                <TextField
                  id="requestDate"
                  label="적용일자"
                  type="date"
                  defaultValue={applyDay}
                  onChange={e => {
                    setApplyDay(e.target.value);
                  }}
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  id="time"
                  label="시간"
                  type="time"
                  defaultValue={time}
                  color="secondary"
                  margin="dense"
                  onChange={e => {
                    setTime(e.target.value.replace(":", "")); //"0900"
                  }}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <br />
                <br />
                <CustomizedSelects
                  className={classes.combo}
                  attdType={attdType}
                  attdTypeName={attdTypeName}
                ></CustomizedSelects>
                <br />
                <br />
                <div align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={searchDayAttd}
                  >
                    조회
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={insertDayAttd}
                  >
                    기록하기
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={7} alignContent={"center"}>
            <Paper className={classes.rightPaper}>
              <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                  <Typography variant="h5">일근태 조회</Typography>
                </Toolbar>
              </AppBar>
              <br />
              <div align="center">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={deleteDayAttd}
                >
                  삭제하기
                </Button>
              </div>
              <br />
              <div
                className={"ag-theme-material"}
                //skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"
                rowStyle={{ "text-align": "center" }}
                style={{
                  height: "500px",
                  width: "100%",
                }}
                cellStyle={{ textAlign: "center" }}
              >
                <AgGridReact
                  columnDefs={column.columnDefs}
                  rowData={props.attdData}
                  getRowStyle={function (param) {
                    return { "text-align": "center" };
                  }}
                  onRowSelected={onRowSelected}
                  onGridSizeChanged={event => {
                    event.api.sizeColumnsToFit();
                  }}
                  onGridReady={event => {
                    event.api.sizeColumnsToFit();
                    setDeleteGridList(event.api);
                  }}
                  rowSelection="multiple" //여러개선택가능
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default DayAttdGrid;

import React, { useEffect, useState, Component } from "react";
import GridStyle from "./GridStyle";
import "./App.css";
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

//===========================범석 탄력근무제 신청 / 조회 21-09-03======================//
const ElasticGrid = props => {

    // sessionStorage.getItem 모든값을 문자로 저장
    // 여기서 session 저장해놧기때메 empCode 가 바로 나오는거네
    const empCode = sessionStorage.getItem("empCodeInfo_token");
    // Grid
    const classes = GridStyle();
    // 현재시간
    let thisTime = moment().format("HH:mm");
    // 오늘 날짜
    let today = moment().format("YYYY-MM-DD");
    // 적용일
    const [applyDay, setApplyDay] = useState(today);
    // 시작시간
    const [startTime, setstartTime] = useState(thisTime);
    // 종료시간
    const [endTime, setendTime] = useState(thisTime);
    // list
    const [list, setList] = useState([]);
    // 삭제데이터
    const [delData, setDelData] = useState([]);


    const column = {
        columnDefs: [
            { headerName: "사원코드", field: "empCode", hide: true }, // 숨기기
            {
                headerName: "적용일",
                field: "applyDay",
                sortable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            { headerName: "사원명", field: "empName", hide: true },
            { headerName: "시작시간", field: "startTime" },
            { headerName: "종료시간", field: "endTime" },
            { headerName: "비고", field: "text" },
        ],
    };

    const searchElastic = () => {

        props.handleElastic(empCode, applyDay);
    };

    const insertElastic = (e) => {
        if (!empCode) { alert('사원번호가없습니다~') }

        props.handleInsertElastic(empCode, applyDay, startTime.replace(":", ""), endTime.replace(":", ""))
        // window.loaction.reload()
    };

    const onRowSelected = e => {
        setDelData(e.api.getSelectedRows());
    };

    const deleteElastic = () => {
   
        if (delData.length === 0) {
            alert('삭제 항목을 선택해 주세요~');
        } else {
            props.delElastic({ data: delData });
        }
    }

    return (
        <React.Fragment>
            <div className="ui primary segment">
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography component="h2" variant="h4">
                            탄력근무제 신청 / 조회
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
                                    <Typography variant="h5">탄력근무제 신청</Typography>
                                </Toolbar>
                            </AppBar>
                            <br />
                            <br />
                            <form>
                                <TextField
                                    id="requestDate"
                                    label="사원번호"
                                    type="text"
                                    defaultValue={empCode}
                                    // onChange={e => {
                                    //     setApplyDay(e.target.value);
                                    // }}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br />
                                <br />
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
                                    id="startTime"
                                    label="시작시간"
                                    type="time"
                                    defaultValue={startTime}
                                    color="secondary"
                                    margin="dense"
                                    onChange={e => {
                                        setstartTime(e.target.value.replace(":", "")); //"0900"
                                    }}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></TextField>
                                <br />
                                <br />
                                <TextField
                                    variant="outlined"
                                    id="endTime"
                                    label="종료시간"
                                    type="time"
                                    defaultValue={endTime}
                                    color="secondary"
                                    margin="dense"
                                    onChange={e => {
                                        setendTime(e.target.value.replace(":", "")); //"0900"
                                    }}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                ></TextField>
                                <br />
                                <br />
                                <br />
                                <div align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={searchElastic}
                                    >
                                        조회
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={insertElastic}
                                    >
                                        신청
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={7} alignContent={"center"}>
                        <Paper className={classes.rightPaper}>
                            <AppBar position="relative" className={classes.subCategory}>
                                <Toolbar>
                                    <Typography variant="h5">탄력근무제 조회</Typography>
                                </Toolbar>
                            </AppBar>
                            <br />
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
                                <div align="center">
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={deleteElastic}
                                    >
                                        삭제하기
                                    </Button>
                                </div>
                                <br />
                                <br />
                                <AgGridReact
                                    columnDefs={column.columnDefs}
                                    rowData={props.elasticData}
                                    getRowStyle={function (param) {
                                        return { "text-align": "center" };
                                    }}
                                    onRowSelected={onRowSelected}
                                    // onGridSizeChanged={event => {
                                    //     event.api.sizeColumnsToFit();
                                    // }}
                                    // onGridReady={event => {
                                    //     event.api.sizeColumnsToFit();
                                    //     setDeleteGridList(event.api);
                                    // }}
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

export default ElasticGrid;

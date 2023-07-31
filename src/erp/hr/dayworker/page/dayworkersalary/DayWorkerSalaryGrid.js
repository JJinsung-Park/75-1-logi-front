import React, { useState } from "react";
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

//===========================예솔 일용직 급여 관리 등록/조회 21.12.27======================//
const DayWorkerSalaryGrid= props => {

    const [empCode, setEmpCode ] = useState();
    const [empName, setEmpName ] = useState();
    const [joinDate, setJoinDate ] = useState();
    const [workTime, setWorkTime ] = useState();
        // Grid
        const classes = GridStyle();
 

    const column = {
        columnDefs: [
            { headerName: "사원코드", field: "empCode"}, 
            {
                headerName: "마지막일자",
                field: "joinDate",
                sortable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            { headerName: "사원명", field: "empName", hide: true },
        ],
    };

    const selectDayWorkerSalary = () => {
   
        props.selectDayWorkerSalary(empCode, empName);
    };
    const insertDayWorkerSalary = (e) => {

           props.insertDayWorkerSalaryHandler(empCode,empName,workTime); 
    }
  

     const insertMonthyWorkerSalary = (e) => {     //월급 프로시저

        props.insertMonthWorkerSalaryHandler(empCode, empName,joinDate)
        // window.loaction.reload()
     };

    return (
        <>
        <AppBar position="relative">
                    <Toolbar>
                        <Typography component="h2" variant="h4">
                             급여계산 및 조회
                        </Typography>
                    </Toolbar>
                </AppBar>
          
                <Grid container spacing={1}>
                         
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
                                      <br />
                            <br />
                                <div align="center">
                                <TextField
                                    id="requestDate"
                                    label="사원번호"
                                    type="text"
                                    defaultValue={empCode}
                                    onChange={e => {     //지정한 값을 설정한다.
                                    setEmpCode(e.target.value);
                                    }}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="requestDate"
                                    label="사원명"
                                    type="text"
                                    defaultValue={empName}
                                    onChange={e => {
                                    setEmpName(e.target.value);
                                    }}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                     <TextField
                                    id="requestDate"
                                    label="근무시간"
                                    type="text"
                                    defaultValue={workTime}
                                    onChange={e => {  
                                    setWorkTime(e.target.value);
                                    }}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />
                                     <TextField
                                    id="requestDate"
                                    label="퇴사날짜"
                                    type="text"
                                    defaultValue={joinDate}
                                    onChange={e => {  
                                    setJoinDate(e.target.value);
                                    }}
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    />    <br/>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={selectDayWorkerSalary}
                                    >조회
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={insertDayWorkerSalary}
                                    >일급계산하기
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={insertMonthyWorkerSalary}
                                    >월급계산하기
                                    </Button>
                                </div>
                                <br />
                                <br />
                                <AgGridReact
                                    columnDefs={column.columnDefs}
                                    rowData={props.dayworkerSalaryData}
                                    getRowStyle={function (param) {
                                        return { "text-align": "center" };
                                    }}
                                    
                                />
                            </div>
                            </Grid>
             </>
    );
};

export default DayWorkerSalaryGrid;

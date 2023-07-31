import React, { useState,useEffect } from "react";
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
import FormDialog from './DayWorkerModal';

//===========================예솔 일용직 관리 등록/조회 21.12.22======================//
const DayWorkerGrid= props => {

    // sessionStorage.getItem 모든값을 문자로 저장
    // 여기서 session 저장해놧기때메 empCode 가 바로 나오는거네
    // const empCode = sessionStorage.getItem("empCodeInfo_token");
    //일용직 사원인데 저장한 session으로 사용해도 될까? ==>an)일용직 사원을 등록하고 관리하는 건 일반 사원이 할 일이다.
   
    const initialValue={
        empCode:"",
        empName: "",
        joinDate: "",
        dept: "",
        phoneNumber: "",
        accountNumber: "",
        accountHolder: "",
        salary: "",
        timeSalary: ""
    }
    
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    //const [reload, setReload] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue)
      };
    
      const onChange = (e) => { 
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
      }

    useEffect(() => {
        getDayWorker()
      }, []); 

 
  
  //fetching user data from server
  const getDayWorker = () => {
    searchDayWorker();

  }
    //사원코드
    const [empCode, setEmpCode] = useState();
    //사원명 
    const [empName, setEmpName] = useState();
    // Grid
    const classes = GridStyle();
    // 오늘 날짜
    let today = moment().format("YYYY-MM-DD");
    // 삭제데이터
    const [delData, setDelData] = useState([]);


    const handleFormSubmit = () => {
        const confirm = window.confirm("해당 일용직 사원을 추가하시겠습니까?");
        
        if (confirm) {
           props.insertDayWorker(formData); // SAGA로 바로 넘겨줘야 데이터가 전부 같이 들어간다. 
          handleClose();
      } else {
        
      }
    }



  
    const column = {
        columnDefs: [
            { headerName: "사원코드", field: "empCode", hide: true }, // 숨기기
            {
                headerName: "귀속년월",
                field: "joinDate",
                sortable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            { headerName: "사원명", field: "empName" },
            { headerName: "부서명", field: "dept" },
            { headerName: "휴대폰 번호", field: "phoneNumber" },
            { headerName: "계좌번호", field: "accountNumber" },
            { headerName: "예금주", field: "accountHolder" },
            { headerName: "급여", field: "salary" },
            { headerName: "시간당 급여", field: "timeSalary" },
        ],
    };

    const searchDayWorker = () => {
    
        props.handleDayWorker(empCode, empName);
    };


    const onRowSelected = e => {
        setDelData(e.api.getSelectedRows());
    };

    const deleteDayWorker = () => {
    
        if (delData.length === 0) {
            alert('삭제완료');
        } else {
            props.delDayWorker({ data: delData });
        }
    }

    

    return (
        <>
        <AppBar position="relative">
                    <Toolbar>
                        <Typography component="h2" variant="h4">
                             일용직 등록 / 조회
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
                                    />    <br/>
                                    <Button
                                      //  className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={searchDayWorker}
                                    >조회
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickOpen}
                                    >등록창</Button>
                                    <FormDialog data={formData} open={open} handleClose={handleClose} 
                                      onChange={onChange} handleFormSubmit={handleFormSubmit}
                                    />
                                    <br/>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={deleteDayWorker}
                                    >삭제하기
                                    </Button>
                                </div>
                                <br />
                                <br />
                                <AgGridReact
                                    columnDefs={column.columnDefs}
                                    rowData={props.dayworkerData}
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
                            </Grid>
             </>
    );
};

export default DayWorkerGrid;

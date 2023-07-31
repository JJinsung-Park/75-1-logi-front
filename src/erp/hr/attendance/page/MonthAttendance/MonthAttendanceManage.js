import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import Select from "react-select";
import useMonth from "./useMonth";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import { FormControl } from "@material-ui/core";
import { Typography, AppBar, Toolbar } from "@material-ui/core"

const MonthAttendanceManage = () => {
  const set1 = useMonth();
 

  // monthList는 db에서 받아온 값 selectedmonth는 현재 Creatable에 사용할 state
  const [monthList, setMonthList] = useState([]);
  const [date, setDate] = useState("");
  const [gridEvent, setGridEvent] = useState();

  //이건 클릭 axios 이벤트 나중에 빼주세요
  function click1() {
    axios
      .get(
        "http://localhost:8282/hr/insa/attendance/monthAttendanceManage.do",
        {
          params: {
            applyYearMonth: date,
          },
        },
      )
      .then(response => {
        
        setMonthList(response.data.monthAttdMgtList);
      })
      .catch(e => {
       
      });
  }
  //입력값 없으면 alert

  //역시 그리드의 헤드
  const state = {
    columnDefs: [
      {
        headerName: "사원코드",
        field: "empCode",
        sortable: true,
        filter: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        resizable: true,
      },
      { headerName: "사원명", field: "empName" },
      { headerName: "적용연월", field: "applyYearMonth" },
      { headerName: "기준근무일수", field: "basicWorkDays" },
      { headerName: "평일근무일수", field: "weekdayWorkDays" },
      { headerName: "기준근무시간", field: "basicWorkHour" },
      { headerName: "실제근무시간", field: "workHour" },
      { headerName: "연장근무시간", field: "overWorkHour" },
      { headerName: "심야근무시간", field: "nightWorkHour" },
      { headerName: "휴일근무일수", field: "holidayWorkDays" },
      { headerName: "휴일근무시간", field: "holidayWorkHour" },
      { headerName: "지각일수", field: "lateDays" },
      { headerName: "결근일수", field: "absentDays" },
      { headerName: "반차일수", field: "halfHolidays" },
      { headerName: "휴가일수", field: "holidays" },
      { headerName: "마감여부", field: "finalizeStatus" },
      { headerName: "상태", field: "status", hide: true },
    ],
    rowData: monthList,
  };

  const handleChange = (newValue, actionMeta) => {
    //  console.group("Value Changed");

    //  console.groupEnd();
    setDate(newValue.value);
  };

  const handleInputChange = (inputValue, actionMeta) => {
    // console.group("Input Changed");

    // console.groupEnd();
  };

  //월 마감 함수 이것도 나중에 빼주세요
  const click2 = () => {
    let rowData = [];
    gridEvent.api.forEachNode(node => {
      rowData.push(node.data);
    });


    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:8282/hr/insa/attendance/monthAttendanceClose.do",
      data: rowData,
    })
      .then(response => {})
      .catch(e => {
        
      });
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    (
      <div>
        <div className="ui primary segment">      
        <AppBar position="static" color="primary">
        <Toolbar>
          <Typography component="h2" variant="h4">
          월근태관리         
          </Typography>
        </Toolbar>
      </AppBar>     
      </div>
      <br />
        <div>
          <FormControl style={{ minWidth: "450px" }}></FormControl>
          <FormControl style={{ minWidth: "250px" }}>
            <Select
              styles={customStyles}
              //menuPlacement="auto"
              //menuPosition="fixed"
              onChange={handleChange}
              onInputChange={handleInputChange}
              options={set1.selectedmonth}
              placeholder="값을 선택해주세요"
            ></Select>
          </FormControl>
          <FormControl>
            <Button variant="contained" color="primary" onClick={click1}>
              조회
            </Button>
          </FormControl>
          <FormControl style={{ minWidth: "50px" }}>
            <Button variant="contained" color="primary" onClick={click2}>
              마감
            </Button>
            <FormControl style={{ minWidth: "50px" }}></FormControl>
          </FormControl>
        </div>

        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "1500px",
          }}
        >
          <AgGridReact
            columnDefs={state.columnDefs}
            rowData={state.rowData}
            rowSelection="multiple"
            onGridReady={event => {
              event.api.sizeColumnsToFit();
              setGridEvent(event);
            }}
          ></AgGridReact>
        </div>
      </div>
    )
  );
};
export default MonthAttendanceManage;
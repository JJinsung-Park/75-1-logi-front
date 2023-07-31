import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./Grid.css"

//========================재영 월근태관리 그리드======================//

const Grid = ({ data }) => {
    
  const Grid = [
    // 칼럼정의
    {
      headerName: "사원코드",
      field: "empCode",
      sortable: true
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
  ];

  return (
    <>
      <br />     

      <div
        className={"ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"        
        rowStyle={{ "text-align": "center" }}
        style={{
          height: "600px",
          width: "100%",
          paddingTop: "25px",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        
          <AgGridReact
            columnDefs={Grid}
            rowData={data}            
            defaultColDef= {{ resizable: true }}
            rowSelection="single"            
            getRowStyle={function(param) {
              //가운데
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#dddddd" };
              }
              return { "text-align": "center" };
            }}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            // onGridReady={onGridReady}
            // onCellClicked={onCellClicked}
          />
      </div>
    </>
  )
};

export default Grid;

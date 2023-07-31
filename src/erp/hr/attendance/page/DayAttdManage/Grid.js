import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// import "./Grid.css"

//==========================재영 일근태관리 그리드=======================//

const Grid = ({ data, state }) => {
  
  // prop 값을 사용하기 편하게 비구조 할당
  
  const Grid = [
    // 칼럼정의
    {
      headerName: "사원코드",
      field: "empCode",
    },
    {
      headerName: "사원명",
      field: "empName",
    },
    {
      headerName: "적용일",
      field: "applyDays",
      width: 400    
    },
    {
      headerName: "일근태코드",
      field: "dayAttdCode",     
    },
    {
      headerName: "일근태명",
      field: "dayAttdName",     
    },
    {
      headerName: "출근시각",
      field: "attendTime",     
    },
    {
      headerName: "퇴근시각",
      field: "quitTime",     
    },
    {
      headerName: "지각여부",
      field: "lateWhether",     
    },
    {
      headerName: "총외출시간",
      field: "leaveHour",     
    },
    {
      headerName: "정상근무시간",
      field: "workHour",     
    },
    {
      headerName: "연장근무시간",
      field: "overWorkHour",     
    },
    {
      headerName: "심야근무시간",
      field: "nightWorkHour",
    },
    {
      headerName: "마감여부",
      field: "finalizeStatus",
    },     
    { 
      headerName: "상태", 
      field: "status", 
      hide: true }  
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

import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./Grid.css";
//"../MonthAttendance/Grid.css"

//========================은비 사원 간단 조회 그리드======================//

const Grid = ({ data, onRowClicked }) => {
    
  const Grid = [ 
    // 칼럼정의
    {headerName: "부서명",field: "deptName",},
    { headerName: "사원명", field: "empName" },
    { headerName: "직급", field: "positionName" },
    { headerName: "사원코드", field: "empCode", hide: true }
  ];

  return (
    <>
      <div
        className={"ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        //enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"        
        rowStyle={{ "text-align": "center" }}
        style={{
          height: "480px",
          width: "100%",
          marginTop: "-60px",
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
            // onGridReady={onGridReady}
            onRowClicked={onRowClicked}
          />
      </div>
    </>
  )
};

export default Grid;

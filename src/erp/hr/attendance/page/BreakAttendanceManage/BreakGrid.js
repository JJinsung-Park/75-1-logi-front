import React, { useState,useEffect } from "react";
import { AgGridReact,AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./BreakGrid.css"
import {Button} from '@mui/material';

const BreakGrid = (props) => {
    
  const Grid = [
    // 칼럼정의
    { headerName: "사원명", field: "empName",headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: "적용년월", field: "applyYearMonth" },
    { headerName: "반차사용개수", field: "afternoonOff" },
    { headerName: "연차사용개수", field: "monthlyLeave" },
    { headerName: "남은연차", field: "remainingHoliday" },
    { headerName: "마감여부", field: "finalizeStatus" },
  ];

  let takenData = [];
  const [selectRowData,setSelectRowData] = useState([]);

  const onSelectionChanged = (event) => {
    setSelectRowData(event.api.getSelectedRows());
   
  }

  function check(){
    
  }


  const recognitionBtn = ()=>{
    // 유효성검사
    if(selectRowData.length==0){
      alert("마감할 신청을 선택하세요 !");
      return;
    }
    // 초기화
    takenData = []
    selectRowData.forEach((item)=>{
      item.finalizeStatus="Y";
      takenData.push(item);
    })
    
    props.updateBreakAttdStart(takenData);
    // window.location.reload();
  }

  const recognitionCancelBtn = ()=>{
    // 유효성검사
    if(selectRowData.length==0){
      alert("승인할 신청 선택하세요 !");
      return;
    }
    // 초기화
    takenData = []
    selectRowData.forEach((item)=>{
      item.finalizeStatus="N";
      takenData.push(item);
    })
    
    props.updateBreakAttdStart(takenData);
    // window.location.reload();
  }




  return (
    <>
          {/* <div align='center'>

            <Button variant="contained" color="primary"  className="button" onClick={recognitionBtn}>
            승인완료
            </Button> 
            
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
            <Button variant="contained" color="primary"  className="button" onClick={recognitionCancelBtn}>
            승인취소
            </Button> 
          </div> */}
            <Button variant="contained" color="primary"  className="button" onClick={recognitionBtn}>
            마감완료
            </Button> 
            <Button variant="contained" color="primary"  className="button" onClick={recognitionCancelBtn}>
            마감취소
            </Button> 
    
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
            rowData={props.data}            
            defaultColDef= {{ resizable: true }}
            rowSelection="multiple"            
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
            onSelectionChanged={onSelectionChanged} // 선택한 체크박스 정보 가져오기
          />
          
      </div>
    </>
  )
};

export default BreakGrid;

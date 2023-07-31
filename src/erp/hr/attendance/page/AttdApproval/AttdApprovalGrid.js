import React, { useState,useEffect } from "react";
import { AgGridReact,AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./AttdApprovalGrid.css"
import {Button} from '@mui/material';

const AttdApprovalGrid = (props) => {
    
  const Grid = [
    // 칼럼정의
    { headerName: "사원명", field: "empName",headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: "근태구분명", field: "restTypeName" },
    { headerName: "신청일자", field: "requestDate" },
    { headerName: "시작일", field: "startDate" },
    { headerName: "종료일", field: "endDate" },
    { headerName: "시작시간", field: "startTime" },
    { headerName: "종료시간", field: "endTime" },
    { headerName: "일수", field: "numberOfDays" },
    { headerName: "사유", field: "cause" },
    { headerName: "승인여부", field: "applovalStatus" },
  ];

  let takenData = [];
  const [selectRowData,setSelectRowData] = useState([]);


  const onSelectionChanged = (event) => {
    setSelectRowData(event.api.getSelectedRows());
    

  }

  let gridData = props.data;

const searchBtn =()=>{
  
  props.search();

}

  const recognitionBtn = ()=>{
    // 유효성검사
    if(selectRowData.length==0){
      alert("승인할 신청 선택하세요 !");
      return;
    }
    // 초기화
    takenData = []
    selectRowData.forEach((item)=>{
      item.applovalStatus="승인";
      takenData.push(item);
    })
    
    props.updateExcusedAttdStart({sendData:takenData});
    
    alert("승인이 완료 되었습니다.")
    setSelectRowData([]);
    props.search();
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
      item.applovalStatus="승인취소";
      takenData.push(item);
    })
    
    props.updateExcusedAttdStart({sendData:takenData});
    
    alert("승인이 취소 되었습니다.")
    props.search();
  }




  return (
    <>
          <div align='center'>
            <Button variant="contained" color="primary"  className="button" onClick={searchBtn}>
                조회하기
            </Button> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
            <Button variant="contained" color="primary"  className="button" onClick={recognitionBtn}>
            승인완료
            </Button> 
            {/* 버튼사이 공간 */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
            <Button variant="contained" color="primary"  className="button" onClick={recognitionCancelBtn}>
            승인취소
            </Button> 
          </div>
            
    
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
            rowData={gridData}            
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
            onSelectionChanged={onSelectionChanged} // 선택한 체크박스 정보 가져오기
          />
          
      </div>
    </>
  )
};

export default AttdApprovalGrid;

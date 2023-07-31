//63기 EmpDetailed.js에서 쓰는 소스 현재는 사용안함



// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
// import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
// import React , {useState, useCallback} from 'react';
// import {
//   makeStyles,
//   Button, 
//   DialogContent,
//   List,
// } from "@material-ui/core";
// import { ModuleRegistry } from "ag-grid-community";



// ModuleRegistry.registerModules(
//   [ExcelExportModule]
// );

// const useStyles = makeStyles(theme => ({
  
//   buttons: {
//     margin: theme.spacing(1),
//   },
  
// }));



// const EmpListGrid = ({ EmpUpdateRequest,empDetailedInfo,selectedValue}) => {

  

//   const classes = useStyles();
 
  

//   ////////////////////////엑셀 내보내기에 필요한 코드 ///////////////////////////////
  
//   const [gridApi, setGridApi]  = useState('');

//   const onGridReady = useCallback(params => {
//     setGridApi(params.api);
//   },[]);
 

//   const handleClick = useCallback(()  => {
    

//     const title = '사원상세';

//     const params = {
//       skipHeader : false,
//       skipFooters : false,
//       columnGroups : true,
//       skipGroups : false,
//       skipPinnedTop : false,
//       skipPinnedBottom : false,
//       allColumns : true,
//       onlySelected : false,
//       fileName : title
//     };
//     gridApi.exportDataAsExcel(params);
//   },[gridApi]);
  
//   ////////////////////////////////////엑셀 내보내기 코드 종료///////////////////////////


//   //그리드 head
//   const empDetailedCoumnDefs =  [
//     {  headerName: "사번",
//     field: "empCode",
//     editable: false,
//     width: 110 },
//     { headerName: "사원명",
//     field: "empName",
//     editable: true,
//     width: 110 },
//     { headerName : "직급명",
//     field : "position",
//     editable : true,
//     width : 110},
//     {headerName: "성별",
//     field: "gender",
//     editable: true,
//     width: 90},
//     { 
//         headerName: "생일",
//         field: "birthDate",
//         editable: true,
//         width: 120},
//     { 
//         headerName: "휴대전화",
//         field: "mobileNumber",
//         editable: true,
//         width: 140 },
//     { 
//         headerName: "주소",
//         field: "address",
//         editable: true,
//         width: 300 },
//     {
//         headerName: "주소상세",
//         field: "detailAddress",
//         editable: true,
//         width: 300 },
//     {
//         headerName: "이메일",
//         field: "email",
//         editable: true,
//         width: 190},

//   ];

  
//   const [value , setValue] = useState('');
//   const [empArray, setEmpArray] = useState([]);


//   //사원정보 수정 함수
//   const handleUpdate = useCallback((event) => {
    

    
//     setValue(event.value);
//     setEmpArray(event.data);
 
    
//    if(event.event.key==='Enter'){
//      EmpUpdateRequest(
//       {
//        empArray :  empArray
//       }
//     )
//     }
//   },[ EmpUpdateRequest, empArray]);

//   return (
//     <div>
//       <div>
//       <Button
//         variant="outlined"
//         size = "small"
//         className={classes.buttons}
//         onClick={handleClick}
//       >Export to Excel</Button>
//       </div>
//       <DialogContent dividers>
//       <List >
//                 <div className={"ag-theme-balham"}
//                     style={{
//                         height: "300px",
//                         width: "100%",
//                         paddingTop: "8px"
//                     }}>
//                     <AgGridReact
//                         onGridReady={onGridReady}
//                         columnDefs={empDetailedCoumnDefs}
//                         rowData={empDetailedInfo}   // 뿌릴 data
//                         rowSelection='single'  // 하나만 선택 가능.
//                         onCellKeyPress={handleUpdate}
//                         modules={[ExcelExportModule]}
//                     />
//                 </div>
//             </List> 
//       </DialogContent>
//     </div>
//   );
// };

// export default EmpListGrid;
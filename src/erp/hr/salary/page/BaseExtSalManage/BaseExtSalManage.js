// //****************************************************2020-08-26 63기 손유찬 ********************************* **********************

// import React, { useState, useEffect, useCallback } from "react";
// import { AgGridReact } from "ag-grid-react";
// import axios from "axios";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";
// import Button from "@material-ui/core/Button";
// import { FormControl,AppBar,Toolbar,Typography,} from "@material-ui/core";
// import InputIcon from "@material-ui/icons/Input";

// const BaseExtSalManage = () => {

//     const [dataList, setDataList] = useState([]);

//     useEffect(() => {
//         axios
//             .get("http://localhost:8282/hr/salary/baseExtSalManage.do",)
//             .then(response => {
//              
//                 setDataList(response.data.baseExtSalList);
//               
//             })
//             .catch(e => {
//               
//             });
//     }, []);

// //수정된 값을 담을 배열
// let list = [];

// //콘솔에 찍어보려고 선언한 
// let count = 0; 

// //그리드 수정이 끝난후 발생하는 이벤트의 콜백메서드
// function CellEditingStopped(row) {
//     row.data.status = "update"
//     list.push(row.data);

//     count++;
// };

// //수정 버튼 이벤트
// const updateOnClick = event => {

//     if (list) {
//         
//         axios.post(
//             "http://localhost:8282/hr/salary/baseExtSalManage.do",
//             {
//                 baseExtSalList: list
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             },

//         );
//         alert("성공적으로 수정 되었습니다.");
//         window.location.reload(true);

//     } else 
//         alert("수정 된 내역이 없습니다.");
//     }
// ;


//   //AG 그리드의 헤드
//   const state = {
//     columnDefs: [
//       { headerName: "초과수당 코드", field: "extSalCode", },
//       { headerName: "초과수당명", field: "extSalName",},
//       { headerName: "초과수당 배수", field: "ratio", editable:true},

//     ],
//     rowData: dataList,
//   };


//   return (

//     (<div>
//           <div>
//           <AppBar position="relative">
//             <Toolbar>
//               <Typography variant="h5">초과수당관리</Typography>
//             </Toolbar>
//           </AppBar>
//         </div>
//         <div>
//         <FormControl style={{ minWidth: "410px" }}></FormControl>
//         <FormControl style={{ minWidth: "200px" }}></FormControl>
//         </div>

//         <br />
        
//         <div
//           className="ag-theme-balham"
//           style={{
//             height: "600px",
//             width: "600px",
//             textAlign:"center"
//           }}
//         >
//          <AgGridReact
//             columnDefs={state.columnDefs}
//             rowData={state.rowData}
//             onCellEditingStopped={CellEditingStopped}
//             onGridReady={event => {
//               event.api.sizeColumnsToFit();
//             }}
//           ></AgGridReact>
//           <br/>
//         </div>
//         <FormControl style={{ minWidth: "200px" }}/>
//         <FormControl style={{ minWidth: "200px" }}>
//            <Button
//             variant="contained"  color="primary"  size="large" onClick={updateOnClick}  startIcon={<InputIcon />} >  수정
//            </Button>
//       </FormControl>
//       </div>
      
//     )
//   );
// };
// export default BaseExtSalManage;

// //**************************2020-08-20 63기 손유찬 ********************************* 
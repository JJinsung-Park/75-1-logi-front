//**************************************** 2020-11-20 권은비 시작 ****************************************
import React, { useEffect } from "react";


import EmpDetailedSearch from './EmpDetailedSearch';
import EmpDetailedInfo from '../DetailEmpSearch/EmpDetailedInfo';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

//상세정보 조회할떄 empCode넘겨주기위해 dispatch
const EmpDetailed = props => {
 

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">사원정보 조회</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}  >
          <EmpDetailedSearch />
        </Grid>
        <Grid item xs={12} sm={8}>
          <EmpDetailedInfo />
        </Grid>
      </Grid>
    </>
  );
};

export default EmpDetailed;



//**************************************** 2020-11-20 권은비 종료 ****************************************




///////////////////원래63기사원상세조회////////////////////////
// import React, { useEffect } from "react";
// import {
//   makeStyles,
//   Paper,
//   Toolbar,
//   Typography,
//   AppBar,
// } from "@material-ui/core";
// import EmpListGrid from "erp/hr/Page/EmpDetailed/EmpListGrid";
// import SelectTag from "erp/hr/Page/EmpDetailed/SelectTag";

// const useStyles = makeStyles(theme => ({
//   paper: {
//     padding: theme.spacing(3, 4),
//   },
//   subCategory: {
//     background: "#232f3e",
//     color: "white",
//   },
//   buttons: {
//     margin: theme.spacing(1),
//   },
//   textField: {
//     margin: theme.spacing(1),
//     width: 50,
//   },

//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },

//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const EmpDetailed = ({
//   PositionListRequest,EmpDetailedInfoRequest, EmpUpdateRequest,
//   companyCode,workPlaceCode,positionList,empDetailedInfo }) => {

//   const classes = useStyles();

//   // 직급명을 가져오는 함수 셀렉트태그에 쓰임
//   useEffect(() => {
//     PositionListRequest();
//   }, [PositionListRequest]);


//   return (
//     <div>
//       <Paper className={classes.paper}>
//         <div>
//           <AppBar position="relative">
//             <Toolbar>
//               <Typography variant="h5">사원 상세조회</Typography>
//             </Toolbar>
//           </AppBar>
//         </div>
//         <br />
//         <div>
//           <SelectTag
//             EmpDetailedInfoRequest={EmpDetailedInfoRequest}
//             companyCode={companyCode}
//             workPlaceCode={workPlaceCode}
//             positionList={positionList}
//           />
//         </div>
//         <div>
//           <EmpListGrid
//             empDetailedInfo={empDetailedInfo}
//              EmpUpdateRequest={ EmpUpdateRequest}
//           />
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default EmpDetailed;



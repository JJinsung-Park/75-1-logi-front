//63기 EmpDetailed.js에서 쓰는 소스 현재는 사용안함




// import React, { useCallback, useState } from "react";
// import {
//   makeStyles,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   TextField,
// } from "@material-ui/core";
// import EmpDetailed from "./EmpDetailed";


// const useStyles = makeStyles(theme => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },

//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const SelectTag = ({ EmpDetailedInfoRequest, companyCode, workPlaceCode, positionList,selectedValueRequest, selectedValue}) => {
 

//   const classes = useStyles();


//   //세션에 담긴 positioncode
//   const positionCodeInfo_token =sessionStorage.getItem("positionCodeInfo_token");
//   //세션에 담긴 workPlacename
//   const workPlace_token =sessionStorage.getItem("workPlace_token");
  

//   //셀렉트태그에 메뉴아이템을 담아오기 위한 변수
//   const ComArray = [...companyCode];
//   const WorkArray = [...workPlaceCode];
//   const PositionArray = [...positionList];  

//  //배열 구조분해
//   const ComName = ComArray.map(c => c.companyName);
//   const WorkName = WorkArray.map(c => c.workplaceName);
//   const PositionName = PositionArray.map(c => c.positionName);

  
//   //메뉴아이템
//   const CompanyList = ComName.map((location, index) => (
//     <MenuItem key={index} value={location}>
//       {location}
//     </MenuItem>
//   ));
//   const WorkList = WorkName.map((location, index) => (
//     <MenuItem key={index} value={location}>
//       {location}
//     </MenuItem>
//   ));
//   const PositionList = PositionName.map((location, index) => (
//     <MenuItem key={index} value={location}>
//       {location}
//     </MenuItem> 
//   ));

//   //커스텀훅
//   const useInput = initValue => {
//     const [value, setter] = useState(initValue);
//     const handler = useCallback(e => {
//       setter(e.target.value);
//     }, []);
//     return [value, handler];
//   };

//   //셀렉트태그 value 세팅
//   const [company, setCompany] = useInput("");
//   const [workplace, setWorkplace] = useInput("");
//   const [position, setPosition] = useInput("");
//   const [empName, setEmpName] = useInput("");

 

//   //검색버튼 눌렀을 때 실행되는 함수
//   const handleOpenGrid = useCallback(
//     event => {
//       event.preventDefault(); //새로고침막음
    
//       //직급별 검색권한 제어 
//       if(positionCodeInfo_token===('POS-05')){
//         if(workPlace_token!==workplace){
//           alert('접근권한없음! 사업장명을 다시 선택해주세요');
//           return <EmpDetailed/>
//         }
//       }
          
//       EmpDetailedInfoRequest({
//         company: company,
//         workPlace: workplace,
//         position: position,
//         empName: empName,
//       });
//     },[EmpDetailedInfoRequest, company, workplace, position, empName, positionCodeInfo_token, workPlace_token]
//   );




//   return (
//     <div>
//       <form onSubmit={handleOpenGrid}>
//         <FormControl className={classes.formControl}>
//           <InputLabel> 회사명 </InputLabel>
//           <Select
//             classnames={classes.select}
//             value={company}
//             name="company"
//             onChange={setCompany}
//           >
//             {CompanyList}
//           </Select>
//         </FormControl>
//         <FormControl className={classes.formControl}>
//           <InputLabel> 사업장명 </InputLabel>
//           <Select
//             classnames={classes.select}
//             onChange={setWorkplace}
//             value={workplace}
//             name="workpalce"
//           >
//             {WorkList}
//           </Select>
//         </FormControl>
//         <FormControl className={classes.formControl}>
//           <InputLabel> 직급 </InputLabel>
//           <Select
//             classnames={classes.select}
//             value={position}
//             onChange={setPosition}
//             name="position"
//           >
//             {PositionList}
//           </Select>
//         </FormControl>
//         <FormControl className={classes.formControl}>
//           <TextField
//             variant="outlined"
//             classnames={classes.textField}
//             placeholder="이름"
//             type="search"
//             name="empName"
//             value={empName}
//             onChange={setEmpName}
//           />
//         </FormControl>
//         <FormControl className={classes.formControl}>
//           <Button
//             variant="outlined"
//             color="primary"
//             className={classes.buttons}
//             type="submit"
//             size="large"
//           >
//             검색
//           </Button>
//         </FormControl>
//       </form>
//     </div>
//   );
// };

// export default SelectTag;

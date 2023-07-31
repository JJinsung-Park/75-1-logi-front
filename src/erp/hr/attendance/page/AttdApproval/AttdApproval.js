import React, { useState } from "react";
import AttdApprovalGrid from "./AttdApprovalGrid";
import { Grid, Stack, TextField, Typography, Button,Box ,InputLabel,MenuItem,FormControl,Select     } from '@mui/material';
import useMonth from "./useMonth";
import Avatar from 'template/ui-component/extended/Avatar';
import { gridSpacing } from 'template/store/constant';
import AnimateButton from 'template/ui-component/extended/AnimateButton';

//======================================= 설재영 월근태 ===========================================//
// const MonthAttdManage = ({ searchMonthAttd, monthAttdMgtList, updateMonthAttdMgtList, errorCode, errorMsg }) => {
const AttdApproval = (props) => {

  const set1 = useMonth();
  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 당일 날짜
  const [date, setDate] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [empList,setEmpLIst] = useState([]);

  const handleChange = (newValue, actionMeta) => {

   
    setDate(newValue.value);
  };


  //조회하기
   function search(){
    
    props.handleSearchExcusedAttd(deptCode,startDate,endDate)
  };
  
  // 확정
  
  // const updateSend = ()=>{
  //   props.updateExcusedAttdStart(selectRowData);
  // }

  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: state.selectProps.width,
  //     borderBottom: "1px dotted pink",
  //     color: state.selectProps.menuColor,
  //     padding: 20,
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = "opacity 300ms";

  //     return { ...provided, opacity, transition };
  //   },
  // };

    return (
     
      <div>
        <React.Fragment>
       
      <div align='center'>
      <Grid container spacing={gridSpacing} alignItems="center">
        <FormControl></FormControl>
        <Grid item xs={12} sm={4} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">조회부서</InputLabel>
                <Select
                value={deptName}
                label="조회부서"
                onChange={(event)=>{
                    setDeptName(event.target.value);
                    if(event.target.value=="인사팀"){setDeptCode("DEP001");}
                    else if(event.target.value=="전산팀"){setDeptCode("DEP002");}
                    else if(event.target.value=="회계팀"){setDeptCode("DEP000");}
                    else if(event.target.value=="보안팀"){setDeptCode("DEP003");}
                    else if(event.target.value=="개발팀"){setDeptCode("DEP004");}
                }}
                >
                <MenuItem value={"인사팀"}>인사팀</MenuItem>
                <MenuItem value={"전산팀"}>전산팀</MenuItem>
                <MenuItem value={"회계팀"}>회계팀</MenuItem>
                <MenuItem value={"보안팀"}>보안팀</MenuItem>
                <MenuItem value={"개발팀"}>개발팀</MenuItem>
                </Select>
            </FormControl>
        </Grid>
            <Grid item xs={12} sm={4} >
                < TextField
                 fullWidth label="시작일"
                name="시작일"
                type={"date"}
                onChange={(event)=>{setStartDate(event.target.value)}}  
            />
        </Grid>
        <Grid item xs={12} sm={4}>
                < TextField
                fullWidth label="종료일"
                name="종료일"
                type={"date"}
                onChange={(event)=>{setEndDate(event.target.value)}}   
                defaultValue="xxxx-xx-xx"
            />
        </Grid>
            <Grid item xs={12} sm={3}>
           
            </Grid>
            
            <Grid item xs={12} sm={6} >
               
            </Grid>
            
            <Grid item xs={12} sm={3}>
            
            </Grid>

            <Grid item xs={12} sm={3} >
            
            </Grid>
           
        </Grid>
      </div>
       </React.Fragment>
        <div>
        {/* <Grid data={monthAttdMgtList} /> */}
        <AttdApprovalGrid
         data={props.restAttdList}
         updateExcusedAttdStart={props.updateExcusedAttdStart}
         search={search}
         deptCode = {startDate}
         startDate = {startDate}
         endDate = {endDate}
         />
        </div>
      </div>
    );
  }

export default AttdApproval;
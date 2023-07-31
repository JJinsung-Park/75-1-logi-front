import React, { useState } from "react";
import Grid from "./Grid";
import {  TextField, Button    } from '@mui/material';

import { FormControl } from "@material-ui/core";
import Select from "react-select";
import useMonth from "./useMonth";
import "./MonthAttdManage.css"

//======================================= 설재영 월근태 ===========================================//
const MonthAttdManage = ({ searchMonthAttd, monthAttdMgtList, updateMonthAttdMgtList, errorCode, errorMsg }) => {

  const set1 = useMonth();
  const [date, setDate] = useState('');

  const handleChange = (newValue, actionMeta) => {
    //  console.group("Value Changed");

    //  console.groupEnd();
    setDate(newValue.value);
  };

  //조회하기
  const search = () => {
   
    searchMonthAttd(date); 
  };

  //마감이벤트
  const finalize = e => {
  
    const monthAttd = monthAttdMgtList;
    for(let i=0; i<monthAttd.length; i++){ 
     delete monthAttd[i].errorCode
     delete monthAttd[i].errorMsg
     delete monthAttd[i].chk    
     //전체마감
     if(e.currentTarget.id === 'update'){
      if(monthAttd[i].finalizeStatus === 'Y'){
        alert('이미 마감처리 되었습니다.');
        return;
      }else if(monthAttd[i].finalizeStatus === 'N'){
        monthAttd[i].finalizeStatus='Y';
      }
      monthAttd[i].status='update'
    }else{ //마감취소
      if(monthAttd[i].finalizeStatus === 'N'){
        alert('마감처리를 확인해주세요.');
        return;
      } else if(monthAttd[i].finalizeStatus === 'Y'){
        monthAttd[i].finalizeStatus = 'N';
      }
      monthAttd[i].status='cancel'
    }
  }
  //Action 실행

    updateMonthAttdMgtList({monthAttdMgtList:monthAttd})
    if(!!errorMsg){
      alert(errorMsg);
    }
    if(!!monthAttdMgtList){
      alert('요청하신 처리가 완료 되었습니다.');
    }
    searchMonthAttd(date)
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

    return (
     
      <div>
        <React.Fragment>
        <div className="ui primary segment">      
      </div>
      <br />
      <div align='center'>
      <fieldset>
        <legend> [ 검색조건 ] </legend>
        <FormControl></FormControl>
          <FormControl style={{ minWidth: "250px" }}>
            <Select
              styles={customStyles}
              menuPlacement="auto"
              menuPosition="fixed"
              onChange={handleChange}
              options={set1.selectedmonth}
              placeholder="날짜를 선택해주세요"
            ></Select>
          </FormControl>
          <div className="box">
          <Button variant="contained" color="primary" onClick={search} className="button">
          조회하기
          </Button> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button id="update" variant="contained" color="primary" onClick={finalize}>
         전체마감하기
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button id="cancel" variant="contained" color="primary" onClick={finalize}>
         전체마감취소
          </Button>
          </div>
      </fieldset>
      </div>
       </React.Fragment>
        <div>
        <Grid data={monthAttdMgtList} />
        </div>
      </div>
    );
  }

export default MonthAttdManage;
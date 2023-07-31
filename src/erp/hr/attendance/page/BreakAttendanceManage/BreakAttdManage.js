import React, { useState } from "react";
import BreakGrid from "./BreakGrid";
import {  TextField, Button    } from '@mui/material';

import { FormControl } from "@material-ui/core";
import Select from "react-select";
import useMonth from "./useMonth";
import "./BreakAttdManage.css"

//======================================= 설재영 월근태 ===========================================//
const BreakAttdManage = ({ searchBreakAttd, updateBreakAttdStart, restAttdList}) => {

  const set1 = useMonth();
  const [date, setDate] = useState('');
  let applyYearMonth = '';

  /* 날짜 자리수 맞춰주는 함수 */
  function addZeros(num, digit) {           
    var zero = '';
     num = num.toString();
     if (num.length < digit) {
        for (i = 0; i < digit - num.length; i++) {
         zero += '0';
        }
     }
     return zero + num;
 }


  const handleChange = (newValue, actionMeta) => {
    //  console.group("Value Changed");
  
    applyYearMonth=newValue.value

    //문자열 조정
    applyYearMonth=applyYearMonth.replace('-','')
    if(applyYearMonth.length==5){
      applyYearMonth = [applyYearMonth.slice(0,4),'0',applyYearMonth.slice(4)].join('');
    }

    setDate(applyYearMonth);
  };

  //조회하기
  const search = () => {


    searchBreakAttd(date); 

  };

  // //마감이벤트
  // const finalize = e => {

  //   const breakAttd = restAttdList;
  //   for(let i=0; i<breakAttd.length; i++){ 
  //    delete breakAttd[i].errorCode
  //    delete breakAttd[i].errorMsg
  //    delete breakAttd[i].chk    
  //    //전체마감
  //    if(e.currentTarget.id === 'update'){
  //     if(breakAttd[i].finalizeStatus === 'Y'){
  //       alert('이미 마감처리 되었습니다.');
  //       return;
  //     }else if(breakAttd[i].finalizeStatus === 'N'){
  //       breakAttd[i].finalizeStatus='Y';
  //     }
  //     breakAttd[i].status='update'
  //   }else{ //마감취소
  //     if(breakAttd[i].finalizeStatus === 'N'){
  //       alert('마감처리를 확인해주세요.');
  //       return;
  //     } else if(breakAttd[i].finalizeStatus === 'Y'){
  //       breakAttd[i].finalizeStatus = 'N';
  //     }
  //     breakAttd[i].status='cancel'
  //   }
  //   }
  //   //Action 실행

  //   updateBreakAttd({sendData:breakAttd})
  //   if(!!errorMsg){
  //     alert(errorMsg);
  //   }
  //   if(!!breakAttdMgtList){
  //     alert('요청하신 처리가 완료 되었습니다.');
  //   }
  //   searchBreakAttd(date)
  // }

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
          </div>
      </fieldset>
      </div>
       </React.Fragment>
        <div>
        <BreakGrid data={restAttdList} updateBreakAttdStart={updateBreakAttdStart}/>
        </div>
      </div>
    );
  }

export default BreakAttdManage;
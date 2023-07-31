import React, { useCallback, useState } from "react";
import Grid from "./Grid";
import "./DayAttdManage.css";
import {  TextField, Button    } from '@mui/material';

import Axios from "axios";

//==============================재영 일근태관리==============================//

const DayAttdManage = ({ searchDayAttd, searchMonthAttdMgtList, dayAttdMgtList, updateDayAttdList, errorCode, errorMsg }) => {

  const [date, setDate] = useState('');
  
  const onChange = useCallback((e) => {
    setDate((e.target.value).toString());
  }, []);

  const search = () => {
    searchDayAttd(date);
  };

  //마지막 문자열 찾아서 교체하는 함수
 const replaceLast = (str, regex, replacement) => {
		var regexIndexOf = str.lastIndexOf(regex);
		if (regexIndexOf === -1) {
			return str;
		} else {
			/* 넘어오는 regex가 number타입이기 때문에 length가 안먹힘 그래서 toString으로 문자열로 변경후 사용 */
			return str.substring(0, regexIndexOf) + replacement
					+ str.substring(regexIndexOf + regex.toString().length);
		}
  }

  //이미 만들어져 있는 사가를 이용해서 처리하고 싶었지만 비동기처리를 피하기 위해 함수를 나눔
  const monthList = (e) => {
  //버튼ID값을 넘겨주기 위함
  let buttonId = e.currentTarget.id;
  //일근태 마감 전 월근태 마감 여부 검사
  //월근태 조회 조건을 맞추기 위한 작업 ex)2020-08-20 => 2020-8 
  let dayAttdMonthData = date.substring(0, date.lastIndexOf("-"));

  if (date.substring(5, 6) === '0'){
  dayAttdMonthData = replaceLast(dayAttdMonthData, 0, "");
  }

   Axios.get("http://localhost:8889/attdappvl/month-attnd",{
      params:{ 
        applyYearMonth: dayAttdMonthData,
      }
    }).then(response => {
    //실제 마감이벤트 호출
     finalize(response, buttonId, dayAttdMonthData)
    })
    .catch(err => {
      
    });
}
  
  //마감이벤트
  const finalize = (response, buttonId, dayAttdMonthData) => {

    const monthAttd = response.data.monthAttdMgtList;

    if(monthAttd[0].finalizeStatus==='Y'){
      alert('월 근태 마감을 확인해 주세요');
      return;
    }
    const dayAttd = dayAttdMgtList;
    
    for(let i=0; i<dayAttd.length; i++){ 
     delete dayAttd[i].errorCode
     delete dayAttd[i].errorMsg
     delete dayAttd[i].chk    
     //전체마감
     if(buttonId === 'update'){
      if(dayAttd[i].finalizeStatus === 'Y'){
        alert('이미 마감처리 되었습니다.');
        return;
      } 
      dayAttd[i].status='update'
    }else{ //마감취소
      if(dayAttd[i].finalizeStatus === 'N'){
        alert('마감처리를 확인해주세요.');
        return;
      } 
      dayAttd[i].status='cancel'
    }
  }  
    
   
    updateDayAttdList({dayAttdMgtList:dayAttd, cday:dayAttdMonthData})
    if(!!errorMsg){
      alert(errorMsg);
    }
    if(!!dayAttdMgtList){
      alert('요청하신 처리가 완료 되었습니다.');
    }
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
       < TextField
        name="searchDate"
        type={"date"}
        onChange={onChange}  
        defaultValue=""
       />
       <br />
       <div className="box">
        <Button variant="contained" size="large" onClick={search}>
        조회하기
        </Button>
        <span>O</span>
        <Button variant="contained" size="large" onClick={monthList} margin='10ppx'>
        전체마감하기
        </Button>
        <span>O</span>
        <Button variant="contained" size="large" onClick={monthList}>
        전체마감취소
        </Button>
       
        </div>
      </fieldset>
      </div>
       </React.Fragment>
       
        <div className="box" >        
        <Grid data={dayAttdMgtList} />
        </div>
      </div>
    );
  }

export default DayAttdManage;
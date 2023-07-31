import React, { useState } from "react";
import { connect } from "react-redux";
import {
  insertExcusedAttdStart
} from "../../saga/ExcusedAttdSaga"; 
import BreakAttendance from "./BreakAttendance"


//===========================최락창 22-10-21======================//
const BreakAttendanceContainer = ({
  restAttdList,
  insertExcusedAttdStart
}) => {

  const handleInsertExcusedAttd=(
    empCode,
    empName,
    restTypeCode,
    restTypeName,
    requestDate,
    startDate,
    endDate,
    numberOfDays,
    cause,
    applovalStatus,
    startTime,
    endTime,
  )=>{
    const sendData = {
      empCode : empCode,
      empName : empName,
      restTypeCode : restTypeCode,
      restTypeName : restTypeName,
      requestDate : requestDate,
      startDate : startDate,
      endDate : endDate,
      numberOfDays : numberOfDays,
      cause : cause,
      applovalStatus : applovalStatus,
      startTime : startTime,
      endTime : endTime,
    };
    
    insertExcusedAttdStart({
      sendData:sendData
    })
  }
  

  return (
    <div>
      <br></br>
      <BreakAttendance
       handleInsertExcusedAttd={handleInsertExcusedAttd}
       restAttdList={restAttdList}
      />
    </div>
  );
};

// 리덕스의 state
const mapStateToProps = state => {
  return {
    restAttdList: state.RootReducers.hr.attendance.excusedAttd.restAttdList,  
  };
};

// 여기가 action과 store연결
export default connect(mapStateToProps, {
  insertExcusedAttdStart,
})(BreakAttendanceContainer);

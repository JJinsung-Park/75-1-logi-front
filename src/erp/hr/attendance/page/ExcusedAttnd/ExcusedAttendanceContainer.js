import React, { useState } from "react";
import { connect } from "react-redux";
import {
  insertExcusedAttdStart
} from "../../saga/ExcusedAttdSaga"; 
import ExcusedAttendance from "./ExcusedAttendance"


// container가 controller느낌 
//===========================최락창 22-10-18======================//
const ExcusedAttendanceContainer = ({
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
      <ExcusedAttendance
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
})(ExcusedAttendanceContainer);

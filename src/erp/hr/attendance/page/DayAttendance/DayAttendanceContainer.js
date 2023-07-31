import React, { useState } from "react";
import { connect } from "react-redux";
import {
  insertDayAttdStart,
  selectDayAttdStart,
  deleteDayAttdStart,
} from "../../saga/DayAttdSaga"; //분리된 saga (최예솔)
import DayAttdGrid from "./DayAttdGrid";
import moment from "moment";
import { Button } from "@material-ui/core";
import DayAttendance from "./DayAttendance"


// container가 controller느낌 
//===========================재영 20-08-27======================//
const Container = ({
  insertDayAttdStart,
  selectDayAttdStart,
  attdData,
  deleteDayAttdStart,
}) => {
  const handleInsertDayAttd = (
    empCode,
    applyDay,
    attdType,
    attdTypeName,
    time,
  ) => {

    insertDayAttdStart({
      empCode: empCode,
      applyDay: applyDay,
      attdType: attdType,
      attdTypeName: attdTypeName,
      time: time,
    });
  };





  const handleDayAttd = (applyDay, empCode) => {
    selectDayAttdStart({
      empCode: empCode,
      applyDay: applyDay,
    });
  };




  return (
    <div>
      {/* <DayAttdGrid
        handleDayAttd={handleDayAttd}
        handleInsertDayAttd={handleInsertDayAttd}
        attdData={attdData}
        deleteDayAttdStart={deleteDayAttdStart}
      ></DayAttdGrid> */}
      
      <br></br>
      <DayAttendance 
       handleDayAttd={handleDayAttd}
       handleInsertDayAttd={handleInsertDayAttd}
       attdData={attdData}
       deleteDayAttdStart={deleteDayAttdStart}
      />
    </div>
  );
};

// 리덕스의 state
const mapStateToProps = state => {
  
  return {
    attdData: state.RootReducers.hr.attendance.dayattd.attdData,  //나눠진 reducer로 수정 <-  attdData: state.hr.attendance.attdData
  };
};

// 여기가 action과 store연결
export default connect(mapStateToProps, {
  insertDayAttdStart,
  selectDayAttdStart,
  deleteDayAttdStart,
})(Container);

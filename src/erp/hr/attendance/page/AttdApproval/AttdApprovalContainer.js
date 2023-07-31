import React, { useState } from "react";
import { connect } from "react-redux";
import {
  searchExcusedAttdStart,
  updateExcusedAttdStart 
} from "../../saga/ExcusedAttdSaga"; 
import AttdApproval from "./AttdApproval"

//===========================최락창 22-10-18======================//
const AttdApprovalContainer = ({
  restAttdList,
  searchExcusedAttdStart,
  updateExcusedAttdStart 
}) => {

  const handleSearchExcusedAttd=(
    deptCode,
    startDate,
    endDate,
  )=>{
    searchExcusedAttdStart({
      deptCode:deptCode,
      startDate: startDate,
      endDate : endDate
    })
  }
  

  return (
    <div>
      <br></br>
      <AttdApproval
       handleSearchExcusedAttd={handleSearchExcusedAttd}
       updateExcusedAttdStart={updateExcusedAttdStart}
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
  searchExcusedAttdStart,
  updateExcusedAttdStart
})(AttdApprovalContainer);

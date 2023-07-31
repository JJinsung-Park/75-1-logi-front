import React from "react";
import OverWorkComp from "./OverWorkComp";
import { connect } from "react-redux";
import {insertTravelAttdStart} from "../../saga/TravelSaga";

//*************************초과근무 신청 =시작= 유찬 _20.08.31 *************************
const OverWorkContainer = props => {
  const { insertTravelAttdStart,restAttdList, errorCode, errorMsg } = props;

  const handleInsertTravel=(sendData) => {
    insertTravelAttdStart({sendData:sendData});
    alert("신청이 완료되었습니다.")
  }

  return (
    <div>
      <OverWorkComp
      restAttdList={restAttdList}
      handleInsertTravel={handleInsertTravel}
      errorCode={errorCode}
      errorMsg={errorMsg}
      />
    </div>
  );
};

const mapStateToProps = state => {

  return {
    restAttdList: state.RootReducers.hr.attendance.travel.restAttdList,
    errorCode: state.RootReducers.hr.attendance.travel.errorCode,
    errorMsg: state.RootReducers.hr.attendance.travel.errorMsg,
  };
};

export default connect(mapStateToProps, {insertTravelAttdStart})(OverWorkContainer);

//*************************초과근무 신청 =시작= 유찬 _20.08.31 *************************
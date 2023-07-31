import React from "react";
import TravelComp from "./TravelComp";
import { connect } from "react-redux";
import {insertTravelAttdStart} from "../../saga/TravelSaga";

//*************************출장/교육 신청 2022-10-25 CRC *************************
const TravelContainer = (props) => {
  const { restAttdList, errorCode, errorMsg ,insertTravelAttdStart} = props;

  
  const handleInsertTravel=(sendData) => {
    insertTravelAttdStart({sendData:sendData});
  }

  return (
    <div>
      <TravelComp
      restAttdList={restAttdList}
      handleInsertTravel={handleInsertTravel}
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

export default connect(mapStateToProps, {insertTravelAttdStart})(TravelContainer);

//*************************초과근무 신청 =시작= 유찬 _20.08.31 *************************
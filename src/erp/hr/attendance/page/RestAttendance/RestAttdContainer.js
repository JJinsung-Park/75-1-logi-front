import React from "react";
import RestAttandence from "./RestAttendance";
import { connect } from "react-redux";
import { restAttdRequest } from "../../saga/RestSaga";
import { withRouter } from "react-router-dom";

// *********************** 외출 조퇴 신청 시작 _준서 ***********************
const RestAttdContainer = props => {
  const { status, errorCode, errorMsg } = props;

  return (
    <div>
      <RestAttandence
      status={status}
      errorCode={errorCode}
      errorMsg={errorMsg}
      />
    </div>
  );
};

const mapStateToProps = state => {

  return {
    status: state.hr.attendance.rest.status,
    errorCode: state.hr.attendance.rest.errorCode,
    errorMsg: state.hr.attendance.rest.errorMsg,
  };
};
export default connect(mapStateToProps, { restAttdRequest })(
  RestAttdContainer
);

// *********************** 외출 조퇴 신청 종료 _준서 ***********************
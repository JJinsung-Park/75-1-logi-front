import React from "react";
import AttendanceApploval from "./AttendanceApploval";
import { connect } from "react-redux";
import { searchAttdApplList, updateAttdApplList } from "../../saga/ApplSaga";
import { withRouter } from "react-router-dom";

// *********************** 결제승인관리 시작 _재영 ***********************
const AttdApplContainer = (props) => {
  const { flag, attdApplList, searchAttdApplList, errorCode, errorMsg, updateAttdApplList } = props;

  const update = (checkData, deptCode, fromDate, toDate) => {
    updateAttdApplList({ data: checkData, deptCode: deptCode, startDate: fromDate, endDate: toDate });;
  };

 

  return (
    <div>
      <AttendanceApploval
        searchAttdApplList={searchAttdApplList}
        attdApplList={attdApplList}
        errorCode={errorCode}
        errorMsg={errorMsg}
        update={update}
        flag={flag}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    errorCode: state.hr.attendance.appl.errorCode, //data안넘어가는 거 같아서 리듀서 연결변경해줌..
    errorMsg: state.hr.attendance.appl.errorMsg,
    attdApplList: state.hr.attendance.appl.attdApplList,
    flag: state.hr.attendance.appl.flag
  };
};

export default connect(mapStateToProps, { searchAttdApplList, updateAttdApplList })(
  AttdApplContainer
);

// *********************** 결제승인관리 종료 _재영 ***********************
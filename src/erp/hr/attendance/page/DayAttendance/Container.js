import React, { useState } from "react";
import { connect } from "react-redux";
import { insertDayAttdStart, selectDayAttdStart } from "../../saga/DayAttdSaga";
import All from "./All";
import moment from "moment";
import { Button } from "@material-ui/core";
const Container = ({ insertDayAttdStart, selectDayAttdStart, attdData }) => {
  const empcode = sessionStorage.getItem("empCodeInfo_token");
  //오늘 날짜
  let today = moment().format("YYYY-MM-DD");
  let thisTime = moment().format("hh:mm");
  const [applyDay, setApplyDay] = useState(today);
  const [time, setTime] = useState(""); // 시간
  const [attdType, setAttdType] = useState(""); // 근태구분 boolean
  const [attdTypeCode, setAttdTypeCode] = useState(""); // 근태구분 boolean
  const dayAttd = {
    empCode: empcode,
    applyDay: applyDay,
    attdTypeCode: attdTypeCode,
    attdTypeName: attdType,
    time: time,
  };
  const handleDayAttd = () => {

    insertDayAttdStart({ type: "insert", dayAttd: dayAttd });
    selectDayAttdStart({
      type: "select",
      empCode: empcode,
      applyDay: applyDay,
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
        }}
      >
        확인용용
      </Button>
      <All
        today={today}
        empcode={empcode}
        setTime={setTime}
        setAttdType={setAttdType}
        setAttdTypeCode={setAttdTypeCode}
        setApplyDay={setApplyDay}
        handleDayAttd={handleDayAttd}
        thisTime={thisTime}
        attdData={attdData}
        attdType={attdType}
      ></All>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    attdData: state.HrReducer.attdData,
  };
};
export default connect(mapStateToProps, {
  insertDayAttdStart,
  selectDayAttdStart,
})(Container);

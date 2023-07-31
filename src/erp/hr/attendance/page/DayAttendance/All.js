import React, { useState } from "react";
import Insert from "./Insert";
import DayAttendance from "./DayAttendance";
import { Tab, AppBar, Button } from "@material-ui/core";
import useStyles from "./Theme";
const All = ({
  today,
  empcode,
  setTime,
  setAttdType,
  setAttdTypeCode,
  setApplyDay,
  handleDayAttd,
  thisTime,
  attdData,
  attdType,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className="tab1">
        <AppBar className={classes.root}>
          <Tab className={classes.tab} label="일근태기록/조회" />
          <br />
          <Button
            onClick={() => {
            }}
          >
            확인용
          </Button>
          <Insert
            setTime={setTime}
            setAttdType={setAttdType}
            setAttdTypeCode={setAttdTypeCode}
            setApplyDay={setApplyDay}
            handleDayAttd={handleDayAttd}
            thisTime={thisTime}
            today={today}
            empcode={empcode}
            attdType={attdType}
          ></Insert>
        </AppBar>
      </div>
      <div className="tab2">
        <AppBar className={classes.root1}>
          <Tab className={classes.tab1} label="조회기록"></Tab>
          <DayAttendance data={attdData}></DayAttendance>
        </AppBar>
      </div>
    </div>
  );
};

export default All;

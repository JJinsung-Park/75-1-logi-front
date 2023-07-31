import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import axios from "axios";

import { TextField } from "@material-ui/core";
import "./App.css";

export default function MaxWidthDialog() {
  const [restAttdSortation, setRestAttdSortation] = React.useState("");

  const [open, setOpen] = React.useState(false);

  //const [name, setName] = React.useState('');

  const handleClickOpen = e => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function leadingZeros(n, digits) {
    //숫자앞에 0붙여주는 함수
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  }

  let now = new Date(); //오늘 날짜 만들기
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let date = leadingZeros(now.getDate(), 2);
  let today = year + "-" + month + "-" + date;

  let startDate = today;
  let t2;

  const t1 = e => {
    setRestAttdSortation(e.target.value);
    alert(restAttdSortation);
  };

  const handleClickRegister = () => {
    axios.get(`http://localhost:8282/app/insa/attendance/dayAttendanceManage`, {
      params: {},
    });
  };

  return (
    <React.Fragment>
      <div>
        <h6 className="head">근태외 신청</h6>

        <TextField
          variant="outlined"
          className="text1"
          label="근태외구분"
          onChange={t1}
        ></TextField>
        <TextField
          variant="outlined"
          className="text2"
          label="신청자"
        ></TextField>
        <TextField
          variant="outlined"
          className="text2"
          label="부서"
        ></TextField>
        <TextField
          id="start"
          variant="outlined"
          className="text2"
          label="시작일"
          type="date"
          defaultValue={startDate}
          onClick={handleClickOpen}
        ></TextField>
        <TextField
          id="end"
          variant="outlined"
          className="text2"
          label="종료일"
          type="date"
          defaultValue={startDate}
        ></TextField>
        <TextField
          variant="outlined"
          className="text2"
          id="time"
          label="시작시간"
          type="time"
          defaultValue="08:00"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onClick={handleClickOpen}
        ></TextField>

        <TextField
          variant="outlined"
          className="text2"
          id="time"
          label="종료시간"
          type="time"
          defaultValue="08:00"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        ></TextField>

        <TextField
          variant="outlined"
          className="text2"
          label="일수"
          onClick={handleClickOpen}
        ></TextField>
        <Button
          className="bt"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClickRegister}
        >
          등록
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>함정카드발동</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

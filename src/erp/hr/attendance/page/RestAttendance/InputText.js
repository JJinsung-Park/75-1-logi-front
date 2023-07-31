import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const InputText = () => {
  const RegisterButtonOnclik = () => {};

  return (
    <div>
      <div>
        <div className="main">근태외 신청</div>
        <TextField
          variant="outlined"
          className="text1"
          label="근태외구분"
          onClick={RegisterButtonOnclik}
        ></TextField>
        <TextField
          variant="outlined"
          className="text2"
          label="신청자"
        ></TextField>
        <TextField
          variant="outlined"
          className="text3"
          label="부서"
        ></TextField>
        <TextField
          variant="outlined"
          className="text4"
          label="시작일"
        ></TextField>
        <TextField
          variant="outlined"
          className="text5"
          label="시작시간"
        ></TextField>
        <TextField variant="outlined" className="ilsu" label="일수"></TextField>
      </div>
      <div>
        <TextField
          variant="outlined"
          className="text6"
          label="직급"
        ></TextField>
        <TextField
          variant="outlined"
          className="text7"
          label="종료일"
        ></TextField>
        <TextField
          variant="outlined"
          className="text8"
          label="종료시간"
        ></TextField>
        <TextField
          variant="outlined"
          className="text9"
          label="증명서"
        ></TextField>
      </div>

      <TextField variant="outlined" className="text10" label="사유"></TextField>

      <div className="RegisterButton">
        <Button variant="contained" color="primary" size="large">
          신청
        </Button>
      </div>
      <div className="RegisterCancel">
        <Button variant="contained" color="primary" size="large">
          취소
        </Button>
      </div>
      <br />

      <br />
    </div>
  );
};
export default InputText;

import React from "react";
import { Button } from "@material-ui/core";
import "erp/hr/Page/DayAttdManage/DayAttdManage.css";

const buttonsize = {
  width: 150,
  height: 55,
  padding: 20,
};
function Btn() {
  return (
    <div>
      <div className="SearchButton">
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={buttonsize}
        >
          조회
        </Button>
      </div>

      <div className="AllRegisterButton">
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={buttonsize}
        >
          전체마감하기
        </Button>
      </div>

      <div className="AllCancelButton">
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={buttonsize}
        >
          전체마감취소
        </Button>
      </div>
    </div>
  );
}

export default Btn;

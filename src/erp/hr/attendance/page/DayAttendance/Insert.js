import React, { useState } from "react";
import "./App.css";
import useStyle from "./Theme";
import {
  Dialog,
  Button,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
  TextField,
  DialogTitle,
} from "@material-ui/core";

const Insert = ({
  handleDayAttd,
  empcode,
  today,
  setTime,
  setAttdType,
  setAttdTypeCode,
  setApplyDay,
  thisTime,
  attdType,
}) => {
  const [open, setOpen] = useState(false); // dialog 오픈 boolean
  const attd = () => {
    handleDayAttd();
  };

  const attdHandleOpen = () => {
    setOpen(true);
  };

  const attdHandleClose = () => {
    setOpen(false);
  };
  const setting = () => {

    setTime(thisTime.replace(":", ""));
    setApplyDay(today);
    attd();
  };
  const handleType = e => {
    setAttdType(e.target.value);
    switch (e.target.value) {
      case "출근":
        return setAttdTypeCode("ADC001");
      case "퇴근":
        return setAttdTypeCode("ADC002");
      case "공외출":
        return setAttdTypeCode("ADC003");
      case "귀사":
        return setAttdTypeCode("ADC004");
      default:
        break;
    }
  };

  const classes = useStyle();

  function click1() {

  }
  return (
    <div className="Insert">
      <div>
        <Button onClick={click1}>확인용</Button>
      </div>
      <table>
        <tr>
          <td>적용일자</td>
          <td>
            <TextField
              variant="outlined"
              id="date"
              label="오늘도 화이팅"
              type="date"
              color="secondary"
              defaultValue={today}
              margin="dense"
              onChange={e => {
                setApplyDay(e.target.value);
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>시간</td>
          <td>
            <TextField
              variant="outlined"
              id="time"
              label="time"
              type="time"
              color="secondary"
              defaultValue="00:00:00"
              margin="dense"
              onChange={e => {
                setTime(e.target.value.replace(":", "")); //"0900"
              }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>근태구분</td>
          <td>
            <input
              className={classes.input}
              type="text"
              placeholder="비고"
              value={attdType}
              readonly="false"
              onClick={attdHandleOpen}
            ></input>
          </td>
        </tr>
      </table>
      <Dialog open={open}>
        <DialogTitle>근태구분</DialogTitle>
        <DialogContent>
          <Select autoFocus value={attdType} onChange={handleType}>
            <MenuItem value="출근">출근</MenuItem>
            <MenuItem value="퇴근">퇴근</MenuItem>
            <MenuItem value="공외출">공외출</MenuItem>
            <MenuItem value="귀사">귀사</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={attdHandleClose}>C L O S E</Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={() => {
          attd();
        }}
        className={classes.buttonsize}
        variant="outlined"
        color="secondary"
      >
        기록하기
      </Button>
    </div>
  );
};
export default Insert;

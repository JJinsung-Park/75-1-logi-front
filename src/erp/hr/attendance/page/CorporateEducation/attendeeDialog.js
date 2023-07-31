/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { TextField, Button, Dialog,DialogActions,DialogContent,DialogTitle  } from "@material-ui/core";

export default function AttendeeDialog({open,handleClose,data,onChange,handleFormSubmit,}){
  let {classCode,empNo,empName,startDate,endDate,totalHours,attendanceScore,testScore,totalScore,actualCharge,status,cost,}=data
  var classCodeOld = sessionStorage.getItem("classinfo-classCode");
  data.classCode=classCodeOld

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-title">{"교육이수사원 추가"}</DialogTitle>
        <DialogContent>
        <form>
            <TextField id="classCode" value={classCodeOld} onChange={e=>onChange(e)} placeholder="교육코드" label="교육코드" variant="outlined" margin="dense" editable="false" fullWidth />
            <TextField id="empNo" value={empNo} onChange={e=>onChange(e)} placeholder="사원번호" label="사원번호" variant="outlined" margin="dense" fullWidth />
            <TextField id="empName" value={empName} onChange={e=>onChange(e)} placeholder="사원명" label="사원명" variant="outlined" margin="dense" fullWidth />
            <TextField id="startDate" value={startDate} onChange={e=>onChange(e)} placeholder="시작일" label="시작일" variant="outlined" margin="dense" fullWidth />
            <TextField id="endDate" value={endDate} onChange={e=>onChange(e)} placeholder="종료일" label="종료일" variant="outlined" margin="dense" fullWidth />
            <TextField id="totalHours" value={totalHours} onChange={e=>onChange(e)} placeholder="교육이수시간" label="교육이수시간" variant="outlined" margin="dense" fullWidth />
            <TextField id="attendanceScore" value={attendanceScore} onChange={e=>onChange(e)} placeholder="출석점수" label="출석점수" variant="outlined" margin="dense" fullWidth />
            <TextField id="testScore" value={testScore} onChange={e=>onChange(e)} placeholder="평가점수" label="평가점수" variant="outlined" margin="dense" fullWidth />
            <TextField id="totalScore" value={totalScore} onChange={e=>onChange(e)} placeholder="총점" label="총점" variant="outlined" margin="dense" fullWidth />
            <TextField id="actualCharge" value={actualCharge} onChange={e=>onChange(e)} placeholder="교육비용" label="교육비용" variant="outlined" margin="dense" fullWidth />
            <TextField id="cost" value={cost} onChange={e=>onChange(e)} placeholder="실부담금" label="실부담금" variant="outlined" margin="dense" fullWidth />
            <TextField id="status" value={status} onChange={e=>onChange(e)} placeholder="이수여부" label="이수여부" variant="outlined" margin="dense" fullWidth />
            
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

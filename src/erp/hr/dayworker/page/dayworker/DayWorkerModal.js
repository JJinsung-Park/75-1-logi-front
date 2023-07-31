import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import moment from "moment";


export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {empCode,empName,joinDate,dept,phoneNumber,accountNumber,accountHolder,salary,timeSalary}=data 
 
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">일용직 직원 등록</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="empCode" value={empCode} onChange={e=>onChange(e)}  placeholder="사원코드" label="사원코드" variant="outlined" margin="dense" fullWidth />
             <TextField id="empName" value={empName} onChange={e=>onChange(e)} placeholder="사원명" label="사원명" variant="outlined" margin="dense" fullWidth />
             <TextField id="joinDate" value={joinDate}  onChange={e=>onChange(e)}  placeholder="입사일자" label="입사일자" variant="outlined" margin="dense" fullWidth />
             <TextField id="dept" value={dept}  onChange={e=>onChange(e)} placeholder="부서명" label="부서명" variant="outlined" margin="dense" fullWidth />
             <TextField id="phoneNumber" value={phoneNumber} onChange={e=>onChange(e)} placeholder="휴대폰 번호" label="휴대폰 번호" variant="outlined" margin="dense" fullWidth />
             <TextField id="accountNumber" value={accountNumber} onChange={e=>onChange(e)} placeholder="계좌번호" label="계좌번호" variant="outlined" margin="dense" fullWidth />
             <TextField id="accountHolder" value={accountHolder} onChange={e=>onChange(e)} placeholder="예금주" label="예금주" variant="outlined" margin="dense" fullWidth />
             <TextField id="salary" value={salary} onChange={e=>onChange(e)} placeholder="월급여" label="월급여" variant="outlined" margin="dense" fullWidth />
            <TextField id="timeSalary" value={timeSalary} onChange={e=>onChange(e)} placeholder="시간당 급여" label="시간당 급여" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            닫기
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
          {"등록"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
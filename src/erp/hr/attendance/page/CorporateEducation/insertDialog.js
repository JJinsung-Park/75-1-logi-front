/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';


export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {classCode,className,startDate,endDate,instructor,cost,classTime}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"직무교육과정 추가"}</DialogTitle>
        <DialogContent>
        <form>
            <TextField id="classCode" value={classCode} onChange={e=>onChange(e)} placeholder="교육코드" label="교육코드" variant="outlined" margin="dense" fullWidth readOnly="true"/>
            <TextField id="className" value={className} onChange={e=>onChange(e)} placeholder="교육과정명" label="교육과정명" variant="outlined" margin="dense" fullWidth />
            <TextField id="startDate" value={startDate} onChange={e=>onChange(e)} placeholder="시작일" label="종료일" variant="outlined" margin="dense" fullWidth />
            <TextField id="endDate" value={endDate} onChange={e=>onChange(e)} placeholder="종료일" label="종료일" variant="outlined" margin="dense" fullWidth />
            <TextField id="instructor" value={instructor} onChange={e=>onChange(e)} placeholder="담당강사" label="instructor" variant="outlined" margin="dense" fullWidth />
            <TextField id="cost" value={cost} onChange={e=>onChange(e)} placeholder="1인당교육비" label="1인당교육비" variant="outlined" margin="dense" fullWidth />
            <TextField id="classTime" value={classTime} onChange={e=>onChange(e)} placeholder="교육시간" label="교육시간" variant="outlined" margin="dense" fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

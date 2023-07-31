import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const SalesPlanSumDialog=({ open, close, value })=> {
  const[amount,setAmount]=useState(0);
  const[price,setPrice]=useState(0);
  const[sumPrice,setSumPrice]=useState(0);

  useEffect(()=>{
    if(value==='DK-01'){
      setPrice(1000000)
    }else if(value==='DK-02'){
      setPrice(900000)
    }else if(value==='DK-AP01'){
      setPrice(75000)
    }else {setPrice(71000)}
    setSumPrice(amount*price)
  },[value, amount, price])
  const Close=()=>{
    close({})
  }
  const onSubmit=()=>{
    close({
      data:{amount,price,sumPrice}
    })
  }
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
    return (
        <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        Width={100}
        maxWidth={"xs"}
      >
      <DialogTitle id="simple-dialog-title" Align="center">
      계획수량 / 계획단가 입력
      </DialogTitle>
        <DialogContent dividers >
            <div className={"ag-theme-material"}
             style={{height: "80px"}}>
            <TextField
              label="계획수량"
              value={amount}
              onChange={e=>setAmount(e.target.value)}
              onKeyPress={handleKeyPress}
            />   
              </div>
              <div className={"ag-theme-material"} 
                   style={{height: "80px"}}>
            <TextField
             disabled 
             label="계획단가" 
              value={price}
              onChange={e=>setPrice(e.target.value)}
            />
            </div>
            <TextField
              disabled
              label="합계액"
              value={sumPrice}
              onChange={e=>setSumPrice(e.target.value) }
            />  
        </DialogContent>
        <DialogActions>
        <Button onClick={onSubmit} color="primary">
          확인
        </Button>
        <Button onClick={Close} color="primary">
          취소
        </Button>
      </DialogActions>
      </Dialog>
    );
}

export default SalesPlanSumDialog;
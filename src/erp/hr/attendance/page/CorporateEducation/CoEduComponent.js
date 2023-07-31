/* eslint-disable no-unused-vars */


import React,{useState,useEffect} from 'react';
import CoEduGridDetail from './CoEduGridDetailGrid';
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import "./CorporateEducation.css";
import FormDialog from './insertDialog';

const CoEduComponent = ({errorCode,errorMsg,classList,classListRequest,deleteClassRequest,insertClassRequest,updateClassRequest,}) => {  

  const initialValue = {
    classCode : '',
    className: '',
    startDate : '',
    endDate : '',
    instructor : '',
    cost: '',
    classTime: '',
  }
   
  const [gridApi, setGridApi] = useState(null)
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [reload, setReload] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData('');
  }; 
  
    useEffect(() => {
      getClass()
    }, [reload]);
  
  const getClass = () => {
    classListRequest();
    setReload(false)
  }

  const onChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const onGridReady = (params) => {
    setGridApi(params)

  }

  const handleFormSubmit = () => {
    const confirm = window.confirm("Are you sure, you want to insert this row ?")
    
      if (confirm) {
        insertClassRequest(formData);
        handleClose();
        setReload(true);
      } else {
      
      }
  }

    return (
        <>
          <AppBar position="static" style={{ background: '#9ed9e0'}}>
              <Toolbar>
                  <Typography component="h2" variant="h4">
                    직무교육
                  </Typography> 
              </Toolbar>
          </AppBar>  
            <br />
            <div align="center"> 
              <legend style={{ color: 'skyblue'}}> [ 교육 목록 ] </legend>
              <Button variant="contained" 
                style={{color: 'white', backgroundColor: '#6bc4cf'}} 
                onClick={handleClickOpen}>교육과정추가</Button>
            </div>
            <div align='center'>       
              <CoEduGridDetail data={classList}
                onGridReady={onGridReady}
                handleFormSubmit={handleFormSubmit}
                onChange={onChange}
                getClass={getClass}
                classListRequest={classListRequest}
                deleteClassRequest={deleteClassRequest}
                updateClassRequest={updateClassRequest}
                />
            <FormDialog open={open} handleClose={handleClose} 
            data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>    
        </>
    )
}

export default CoEduComponent;
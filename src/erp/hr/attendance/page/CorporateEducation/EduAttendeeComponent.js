/* eslint-disable no-unused-vars */

import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import "./CorporateEducation.css";
import EduAttendeeDetail from './EduAttendeeGrid';
import AttendeeDialog from './attendeeDialog';
import ClasslistBrief from './ClasslistBriefGrid';

const EduAttendeeComponent = ({
  errorCode,
  errorMsg,
  classList,
  classBriefRequest,
  attendeeList,
  attendeeListRequest,
  deleteAttendeeRequest,
  insertAttendeeRequest,
  updateAttendeeRequest,}) => {  

  var classNameOld = sessionStorage.getItem("classinfo-className");
  var classCodeOld = sessionStorage.getItem("classinfo-classCode");
  
  const initialValue = {
    classCode: "",
    className: "",
    empNo:"",
    empName:"",
    startDate: "",
    endDate: "",
    totalHours:"",
    attendanceScore: "",
    testScore:"",
    totalScore: "",
    actualCharge:"",
    status:"",
    cost: "",
  }

  const [gridApi, setGridApi] = useState(null)
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [formDatas, setFormDatas] = useState(initialValue)
  const [reload, setReload] = useState(false);

  const handleUpdate = (oldData) => {
    setFormData({ ...oldData });
    handleClickOpen();
    if (formData.classCode) {
      updateAttendeeRequest(formData);
      handleClose();
      getAttendeeList(classCodeOld);
    } else {
      
    }
  };

  const handleDelete = (value) => {
    const confirm = window.confirm(
      "선택한 행을 삭제하시겠습니까?", value
    );
    if (confirm) {
      deleteAttendeeRequest(value);
      getAttendeeList(classCodeOld);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFormData(formData)
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  
    useEffect(() => {
      getAttendee()
    }, []);

    useEffect(() => {
      getAttendeeList(classCodeOld)
    }, [reload]);
  
  const getAttendee = () => {
    classBriefRequest();
  }

  const getAttendeeList = (classCode) => {
    attendeeListRequest({
      classCode:classCode,
    });
    setReload(false);
  }

  const onSelectionChanged=(event)=>{
    var selectedclassCode=event.api.getSelectedRows()[0].classCode
    getAttendeeList(selectedclassCode)
  }

  const onChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const onGridReady = (params) => {
    setGridApi(params)
  }

  const handleFormSubmit = (oldData) => {
    handleClickOpen();
    setFormData({...oldData});
    if (open===true) {
      const confirm = window.confirm(
        "입력한 정보를 추가하시겠습니까?", oldData
        );
        if (confirm) {
          insertAttendeeRequest(formData);
          handleClose();
          setReload(true)
        }
    } else {
      
    }    
  }

    return (
      <>
      {/* <AppBar position="static" style={{ background: '#9ed9e0'}}>
        <Toolbar>
            <Typography component="h2" variant="h4">
            직무교육: 수강직원관리
            </Typography> 
            <Button variant="contained" onClick={()=>handleFormSubmit()} 
              style={{marginLeft:"auto", color: 'white', backgroundColor:'#6bc4cf'}}>수강직원추가</Button>
        </Toolbar>
      </AppBar> */}
        <br/>
        <div align="center">
          <legend style={{ color: 'skyblue', align: 'center'}}> [ 수강직원목록 ] </legend>
        </div>
        <div className='gridDiv'>
        <div className="main" direction="row" spacing={2} justifyContent="center" alignItems="center"> 
          <div className="left">
            <ClasslistBrief data={classList} 
              onSelectionChanged={onSelectionChanged} 
              onChange={onChange} 
              attendeeListRequest={attendeeListRequest} 
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              handleFormSubmit={handleFormSubmit}
              open={open}
              formData={formData}
              setFormData={setFormData}
              formDatas={formDatas}
            />
          </div> 
          <div className="right">
            <EduAttendeeDetail data={attendeeList}
              onGridReady={onGridReady}
              onChange={onChange}
              getAttendee={getAttendee}
              getAttendeeList={getAttendeeList}
              attendeeListRequest={attendeeListRequest}
              deleteAttendeeRequest={deleteAttendeeRequest}
              updateAttendeeRequest={updateAttendeeRequest}
              classBriefRequest={classBriefRequest}
              onSelectionChanged={onSelectionChanged}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              classList={classList}
              />
          </div>
          <AttendeeDialog open={open} handleClose={handleClose} getAttendeeList={getAttendeeList} getAttendee={getAttendee}
          data={formData} onChange={onChange} handleFormSubmit={()=>handleFormSubmit()}/>
        </div> 
        </div>
      </>
    )
}

export default EduAttendeeComponent;
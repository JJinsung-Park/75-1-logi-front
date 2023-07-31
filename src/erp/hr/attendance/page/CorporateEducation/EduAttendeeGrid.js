/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui-dist/jquery-ui.css";
import "./CorporateEducation.css";
import AttendeeDialog from "./attendeeDialog";
import { Button } from "@mui/material";

const rowHeight = "35";

const initialValue = {
  classCode: "",
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
};

const EduAttendeeDetail = ({
  data,
  classList,
  attendeeList,
  deleteAttendeeRequest,
  updateAttendeeRequest,
  attendeeListRequest,
  classBriefRequest,
  handleFormSubmit
}) => {

  var classNameOld = sessionStorage.getItem("classinfo-className");
  var classCodeOld = sessionStorage.getItem("classinfo-classCode");


  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAttendeeList(classCodeOld)
  }, [reload]);

  const getAttendeeList = (classCode) => {
    if(reload===true){
      attendeeListRequest({
        classCode:classCode,
      });
      setReload(false);
      }
    }

  const Grid = [
    {
      headerName: "교육코드",
      field: "classCode",
      editable: false,
      hide:true,
    },
    {
      headerName: "사원번호",
      field: "empNo",
      editable: false,
    },
    {
      headerName: "사원명",
      field: "empName",
      editable: false,
    },
    {
      headerName: "시작일",
      field: "startDate",
      editable: true,
      cellEditor: "datePicker",
    },
    {
      headerName: "종료일",
      field: "endDate",
      editable: true,
      cellEditor: "datePicker",
    },
    {
      headerName: "교육시간",
      field: "totalHours",
      editable: true,
    },
    {
      headerName: "출석점수",
      field: "attendanceScore",
      editable: true,
    },{
      headerName: "평가점수",
      field: "testScore",
      editable: true,
    },
    {
      headerName: "총점",
      field: "totalScore",
      editable: true,
    },
    {
      headerName: "교육비용",
      field: "cost",
      editable: true,
    },
    {
      headerName: "실부담금",
      field: "actualCharge",
      editable: true,
    },
    {
      headerName: "이수여부",
      field: "status",
      editable: true,
    },
  ];

  const defaultColDef = {
    sortable: true,
    flex: 1,
    cellClass: "grid-cell-centered",
  };
  
  const buttonStyle = {
    marginBottom: "12px", 
    marginRight:"5px", 
    color:'white', 
    backgroundColor:'powderblue',
  };

  function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement("input");
      this.eInput.value = params.value;
      this.eInput.classList.add("ag-input");
      this.eInput.style.height = "100%";
      $(this.eInput).datepicker({ dateFormat: "yy-mm-dd" });
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () {};
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [deleteParam, setDeleteParam] = useState({classCode:"",empNo:""});
  const [updateParam, setUpdateParam] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const onChange = (e) => {
    const { value, id } = e.target;
  
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setUpdateParam(oldData)
    const confirm = window.confirm(
    "선택한 행을 수정하시겠습니까?", oldData
    );
   
    if (confirm) {
      updateAttendeeRequest(updateParam);
      setReload(true);
      //getAttendeeList(classCodeOld);

    }
  };

  const onSelectionChanged=(event)=>{

    var selectedRow=event.api.getSelectedRows()
    var selectedempNo=event.api.getSelectedRows()[0].empNo
    var selectedclasscode=event.api.getSelectedRows()[0].classCode
    setDeleteParam({empNo:selectedempNo,classCode:selectedclasscode})
    setUpdateParam(...selectedRow)
}

  //deleting a user
  const handleDelete = (deleteParam) => {
    setReload(false);
    const confirm = window.confirm(
      "선택한 행을 삭제하시겠습니까?", deleteParam
    );
      
    if (confirm) {
      deleteAttendeeRequest(deleteParam);
      setReload(true);
      //getAttendeeList(classCodeOld);
    }
  };

  return (
    <>
    <div direction="row"  style={{
      height: "500px",
      width: "100%",
      justifyContent: "center",
      textAlign: "center",}}>

    <div align="right" >
      <Button variant="contained" style={buttonStyle} onClick={()=>handleUpdate(updateParam)}>수정</Button>
      <Button variant="contained" style={buttonStyle} onClick={()=>handleDelete(deleteParam)}>삭제</Button>
    </div>
        
    <div className={"ag-theme-balham"}
      style={{
      height: "400px",
      width: "100%",
      justifyContent: "center",
      textAlign: "center",
    }}>

      <AgGridReact
        width="90%"
        columnDefs={Grid}
        rowData={data}
        rowHeight={rowHeight}
        defaultColDef={defaultColDef}
        rowSelection="single"
        getAttendeeList={getAttendeeList}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        onSelectionChanged={onSelectionChanged}
        components={{datePicker: getDatePicker()}}
      />

      <AttendeeDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleUpdate={handleUpdate}
        getDatePicker={getDatePicker}
        components={{datePicker: getDatePicker()}}
      />
      </div>
      </div>
      </>
  );
};

export default EduAttendeeDetail;

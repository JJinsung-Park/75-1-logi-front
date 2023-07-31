/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui-dist/jquery-ui.css";
import "./CorporateEducation.css";
import { Button } from "@material-ui/core";
import UpdateDialog from "./updateDialog";

const rowHeight = "45";

const initialValue = {
  classCode: "",
  className: "",
  startDate: "",
  endDate: "",
  instructor: "",
  cost: "",
  classTime: "",
};

const CoEduGridDetail = ({
  data,
  deleteClassRequest,
  updateClassRequest,
  classListRequest,
}) => {
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [reload, setReload] = useState(false);

  const getClass = () => {
    classListRequest();
    setReload(false);
  };

  useEffect(() => {
    getClass()
  }, [reload]);

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
    setFormData({ ...oldData });
    handleClickOpen() ;
    if (formData.classCode) {
      updateClassRequest(formData);
      handleClose();
      setReload(true);
    } else {
      
    }
  };

  //deleting a user
  const handleDelete = (value) => {
    const confirm = window.confirm(
      "선택한 행을 삭제하시겠습니까?", value
    );
    if (confirm) {
      deleteClassRequest(value);
      setReload(true);
    }
  };

  const Grid = [
    {
      headerName: "교육코드",
      field: "classCode",
      editable: false,
    },
    {
      headerName: "교육과정명",
      field: "className",
      editable: true,
    },
    {
      headerName: "시작일",
      field: "startDate",
      cellEditor: "datePicker",
      editable: true,
    },
    {
      headerName: "종료일",
      field: "endDate",
      cellEditor: "datePicker",
      editable: true,
    },
    {
      headerName: "담당강사",
      field: "instructor",
      editable: true,
    },
    {
      headerName: "1인당교육비",
      field: "cost",
      editable: true,
    },
    {
      headerName: "교육시간",
      field: "classTime",
      editable: true,
    },
    {
      headerName: "",
      field: "classCode",
      maxWidth: 150,
      flex: 2,
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleUpdate(params.data)}
          >수정</Button>
          &nbsp;
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.value)}
          >삭제</Button>
        </div>
      ),
    },
  ];

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

  const defaultColDef = {
    sortable: true,
    flex: 1,
    cellClass: "grid-cell-centered",
  };

  return (
    <>
      <br />
      <div
        style={{
          height: "400px",
          width: "90%",
          justifyContent: "center",
          textAlign: "center",
        }}
        className={"ag-theme-balham"}
      >
        <AgGridReact
          columnDefs={Grid}
          rowData={data}
          rowHeight={rowHeight}
          defaultColDef={defaultColDef}
          rowSelection="single"
          components={{ datePicker: getDatePicker() }}
        />

        <UpdateDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          data={formData}
          onChange={onChange}
          handleUpdate={handleUpdate}
          getDatePicker={getDatePicker}
          components={{ datePicker: getDatePicker() }}
        />
      </div>
    </>
  );
};

export default CoEduGridDetail;

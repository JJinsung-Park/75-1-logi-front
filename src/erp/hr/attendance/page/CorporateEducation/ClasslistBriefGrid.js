/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AgGridReact} from 'ag-grid-react';
import "./CorporateEducation.css";

const ClasslistBrief =(props)=>{
  const initialValue = {
    classCode: "",
    className: "",
  }

  const [formDatas, setFormDatas] = useState(initialValue);
  
  props.setFormData(props.formData,{...formDatas})
  
  sessionStorage.setItem("classinfo-className", formDatas.className);
  sessionStorage.setItem("classinfo-classCode", formDatas.classCode);

  const getAttendeeList = (classCode) => {
    props.attendeeListRequest({
      classCode:classCode,
    });
  }

  const onChange = (e) => {
    const { value, id } = e.target
    
    //setFormDatas({ ...formDatas, [id]: value })
  }

    const onSelectionChanged=(event)=>{
      
      var selectedClassCode=event.api.getSelectedRows()[0].classCode
      var selectedClassName=event.api.getSelectedRows()[0].className
      getAttendeeList(selectedClassCode)
      setFormDatas({classCode:selectedClassCode, className:selectedClassName,})
      props.setFormData({...props.formData, ...formDatas})
    }
    
    const defaultColDef = { 
      sortable: true,
      flex: 1,
      cellClass: "grid-cell-centered",
    };

    const columnDefs = [
      {
          headerName: "교육코드",
          field: "classCode",
          editable: false,
          width:'70px',
        },
        {
          headerName: "교육명",
          field: "className",
          editable: true,
          width:'200px'
        },
    ];
  
    return(
    <>
        <div style={{height: 300, width: 250}} className={"ag-theme-balham"}>
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={props.data}
            rowSelection="single"
            onSelectionChanged={onSelectionChanged}
            handleFormSubmit={props.handleFormSubmit}
          />
       </div>
       </>
    )
  }

export default ClasslistBrief;
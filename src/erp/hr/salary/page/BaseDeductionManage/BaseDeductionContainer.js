//****************************************************2020-11-24 64기 정준혁 *********************************
import React,{useState,useEffect, useCallback} from 'react';
import MyGrid from 'erp/hr/util/MyGrid';
import HrAppBar from 'erp/hr/util/HrAppBar';
import axios from "axios";
import columnDefinition from './columnDefinition'
const BaseDeductionContainer = () => {

  const [rowData,setRowData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8282/hr/salary/baseDeductionManage",)
            .then(response => {
                setRowData(response.data.baseDeductionList);
            })
            .catch(e => {
                alert(e);
            });
    }, []);
    

  const onCellEditingStopped = useCallback((e)=>{
    e.data.status = "update"
    
    axios.post(
        "http://localhost:9101/hr/salary/baseDeductionManage",
        {
          sendData : [e.data]
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        },
    ).catch(e => {
        alert(e);
    });
  },[]);


 
    return (
        <>
            <HrAppBar title='공제기준관리'/>
            <MyGrid 
                columnDefinition={columnDefinition}
                rowData={rowData}
                onCellEditingStopped={onCellEditingStopped}
                onGridReady={event => {
                    event.api.sizeColumnsToFit();
                }}
            /> 
        </>
    )
}

export default BaseDeductionContainer;
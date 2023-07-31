//****************************************************2020-11-24 64기 정준혁 *********************************
import React,{useState,useEffect, useCallback} from 'react';
import MyGrid from 'erp/hr/util/MyGrid';
import HrAppBar from 'erp/hr/util/HrAppBar';
import axios from "axios";
import columnDefinition from './columnDefinition'
const BaseExtSalContainer = () => {

  const [rowData,setRowData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:9101/salarystdinfomgmt/over-sal",)
            .then(response => {
                setRowData(response.data.baseExtSalList);
            })
            .catch(e => {
                alert(e);
            });
    }, []);
    

  const onCellEditingStopped = useCallback((e)=>{
    e.data.status = "update"
    axios.post(
        "http://localhost:9101/hr/salary/baseExtSalManage",
        {
            baseExtSalList : [e.data]
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
            <HrAppBar title='초과수당관리'/>
            <MyGrid 
              
                rowData={rowData}
                onCellEditingStopped={onCellEditingStopped}
                onGridReady={event => {
                    event.api.sizeColumnsToFit();
                }}
                columnDefinition={columnDefinition}
                style={{
                    height: "100%",
                    width: "100%",}}
            /> 
        </>
    )
}

export default BaseExtSalContainer;
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./Grid.css"

const MyGrid = ({columnDefinition,rowData,onGridReady,onCellEditingStopped }) => {
    
    const getRowStyle = (param) =>{
        if (param.node.rowPinned) {
            return { "font-weight": "bold", background: "#dddddd" };
        }
        return { "text-align": "center" };
    }
   


    return (
        <div
                align='center'
                className={"ag-theme-material"}
                skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"        
                rowStyle={{ "text-align": "center" }}
                style={{
                height: "600px",
                width: "100%",
                paddingTop: "25px",
                }}
                cellStyle={{ textAlign: "center" }}
            >
                <AgGridReact
                columnDefs={columnDefinition}
                rowData={rowData}            
                defaultColDef= {{ resizable: true }}
                rowSelection="single"
                getRowStyle={getRowStyle}
                onGridReady={onGridReady}
                onCellEditingStopped={onCellEditingStopped}
               
                />
        </div>
    )
}

export default MyGrid;

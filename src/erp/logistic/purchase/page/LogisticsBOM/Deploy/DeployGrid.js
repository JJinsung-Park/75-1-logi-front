import { AgGridReact } from 'ag-grid-react';
import Axios from 'axios';
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';

const DeployGrid = ({ props }/* { setDeployCondition, setItemCode, setDivisionCode, searchBom, bomData } */) => {
    const [positionGridApi, setPositionGridApi] = useState();

    const setPadding = (arr) => {
        let lev = arr.data.bomLevel;
        let iCode = arr.value;
        let space = "　　";
        for (let i = 0; i < lev; i++) {
            iCode = space + iCode;
            console.log(iCode);
            return iCode;
        }
    };

    const onGridReady = (params) => {
        setPositionGridApi(params.api);
    };

    const columnDefs = [
        { headerName: "BOM번호", field: "bomNo", width: 170 },
        { headerName: "BOM레벨", field: "bomLevel", width: 100 },
        { headerName: "상위품목코드", field: "parentItemCode", width: 150 },
        { headerName: "품목코드", field: "itemCode", width: 165, valueFormatter: setPadding },
        { headerName: "품목명", field: "itemName", width: 250 },
        { headerName: "단위", field: "unitOfStock", width: 100 },
        { headerName: "정미수량", field: "netAmount", width: 100 },
        { headerName: "손실율", field: "lossRate", width: 100 },
        { headerName: "필요수량", field: "necessaryAmount", width: 100 },
        { headerName: "리드타임", field: "leadTime", width: 100 },
        { headerName: "isLeaf", field: "isLeaf", width: 100 },
        { headerName: "비고", field: "description", width: 100 }
    ];

    return (
        <>
            <div className="gridAlign" style={{ paddingTop: "8px" }}>
                <div className={"ag-theme-material"}
                     style={{
                         height: "600px",
                         width: "100%",
                         paddingTop: "8px"
                     }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={props.bom.data && props.bom.data}
                        onGirdReady={onGridReady}
                    />
                </div>
            </div>
        </>
    );
};

export default DeployGrid;

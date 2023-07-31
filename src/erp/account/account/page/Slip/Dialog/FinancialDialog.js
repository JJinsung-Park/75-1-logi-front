import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    DialogActions,
    Button,
} from "@material-ui/core";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import journaldetail from '../JournalDetail'


const FinancialDialog = ({ open, close, divisionCodeData }) => {
    const [data, setData] = useState(divisionCodeData); //useEffect 로 조회한 결과값 받는 상태 값  


    //========================== 그리드 객체 준비 ==========================
    const [positionGridApi, setPositionGridApi] = useState();
    const onGridReady = params => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit();
    };

    //컴포넌트가 마운트 됐을 때 호출됨 
    useEffect(() => {
        // FinancialList() // 함수호출
    }, []);


    /*function FinancialList() {
        
        axios.get("http://localhost:8282/acc/base/getDetailCodeList",
            { params: { divisionCodeNo: divisionCodeNo } }
        ).then(response => {
            setData(response.data.detailCodeList);
        }).catch(e => { });
    }*/

    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "분개상세항목내용", field: "detailCodeName" }
    ];

    //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
    // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
    // onClose안에 객체(data, division) 을 가지고 JournalDetail 컴포넌트로 감.

    //============================== 닫기버튼 ====================================
    const Close = () => {
        close({
            data: undefined,
        });
    };
    //============================== 셀 클릭시  ====================================
    const handleClose = (Rows) => {
        close({ data: Rows.data.detailCodeName });
    };


    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle id="simple-dialog-title" Align="center"> 분개상세항목 </DialogTitle>
            <DialogContent dividers>
                <List >
                    <div className={"ag-theme-balham"}
                         rowStyle={{ "text-align": "center" }}
                         style={{
                             height: "300px",
                             width: "100%",
                             paddingTop: "8px"
                         }}>
                        <AgGridReact
                            columnDefs={accountColumnDefs}
                            rowData={divisionCodeData}   // 뿌릴 data
                            rowSelection='single'  // 하나만 선택 가능.
                            getRowStyle={function (param) { return { "text-align": "center" }; }} //body 가운데 정렬
                            onGridReady={onGridReady}
                            onCellClicked={handleClose}  // cell을 클릭하면, handleClose가 실행된다.
                        />
                    </div>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={Close} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default FinancialDialog;
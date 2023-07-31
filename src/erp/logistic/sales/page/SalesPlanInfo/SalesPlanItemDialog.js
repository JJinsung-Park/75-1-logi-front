import Axios from 'axios';
import React, { useEffect, useState } from 'react';


import { AgGridReact } from 'ag-grid-react';
import { Dialog, DialogContent, DialogTitle, List } from '@mui/material';
const SalesPlanItemDialog = ({ open, close }) => {
    const [grid, setGrid] = useState('');
    const [list, setList] = useState([]);
    const column = {
        columnDefs: [
            { headerName: '코드', field: 'detailCode', width: 100 },
            { headerName: '코드명', field: 'detailCodeName', width: 100 }
        ]
    };
    const onCellClicked = parmas => {
        close({
            data: grid.getSelectedRows(), // data는 클릭한 row의 정보이고,
            division: 'accountDialog'
        });
    };
    const onGridReady = params => {
        setGrid(params.api);
        params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };

    useEffect(() => {
        
        Axios.get('http://localhost:9102/compinfo/codedetail/list', {
            params: {
                divisionCode: 'IT-_I'
            }
        })
            .then(response => {
               
                setList(response.data.codeList);
             
            })
            .catch(e => {
               
            });
    }, []);

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle id="simple-dialog-title" Align="center">
                아이템코드선택
            </DialogTitle>
            <DialogContent dividers>
                <List>
                    <div
                        className={'ag-theme-material'} //그리드 모양
                        style={{
                            height: '300px',
                            width: '100%'
                            //addingTop: "8px",
                        }}
                    >
                        <AgGridReact
                            columnDefs={column.columnDefs} //컬럼명
                            rowData={list ? list : null} // 뿌릴 data
                            rowSelection="single" // 하나만 선택 가능.
                            // getRowStyle={param => {
                            //     return { 'text-align': 'center' }; //body 가운데 정렬
                            // }}
                            onGridReady={onGridReady}
                            onCellClicked={onCellClicked} // cell을 클릭하면, handleClose가 실행된다.
                        />
                    </div>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SalesPlanItemDialog;

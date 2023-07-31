import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {textAlign} from "@mui/system";
import {Button, Grid} from "@mui/material";

function WorkPerformanceManagement(props) {
    const [size, setSize] = useState('50vh');
    const [list, setList] = useState([]);

    const column = {
        columnDefs: [
            {
                headerName: '생산완료날짜',
                field: 'workOrderCompletionDate',
                sortable: true
            },
            { headerName: '작업지시일련번호', field: 'workOrderNo' },
            { headerName: '주생산계획번호', field: 'mpsNo' },
            {
                headerName: '수주상세일련번호',
                field: 'contractDetailNo'
            },
            { headerName: '품목구분', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unit' },
            { headerName: '작업지시수량', field: 'workOrderAmount' },
            {
                headerName: '실제제작수량',
                field: 'actualCompletionAmount'
            },
            { headerName: '공정성공율', field: 'workSuccessRate' }
        ]
    };

    const onClick = e => {
        Axios.get('http://localhost:9102/quality/workorder/performance-list')
            .then(({data}) => {

            setList(data.gridRowJson);
        }).catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <MainCard
            content={false}
            title="생산실적관리"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                <Button
                    variant="contained"
                    color="secondary"
                    //style={{ marginTop: "1vh" }}
                    onClick={onClick}
                >
                    생산실적조회
                </Button>
            </Grid>}
        >
            <MyGrid
                list={list}
                column={column}
                size={size}>
            </MyGrid>
        </MainCard>
    );
}

export default WorkPerformanceManagement;

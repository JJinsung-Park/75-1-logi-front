import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Button, Grid} from "@mui/material";
import MyCalendar from "../../../../../util/LogiUtil/MyCalendar";
import contractListColumn from "../MPS/contractListColumn";
import {getDatePicker} from "../../../../hr/util/datePicker";
import MyDialog from "../../../../../util/LogiUtil/MyDialog";
import MpsDialog from "../MPS/MpsDialog";
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function WorkOrderStatus(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    //const [selectedRows, setSelectedRows] = useState([]);
    const [grid, setGrid] = useState([]);

    const column = {
        columnDefs: [
            {
                headerName: '작업지시일련번호',
                field: 'workOrderNo',
                minWidth: 150,
                //suppressSizeToFit: true,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                suppressRowClickSelection: true,
                checkboxSelection: true
            },
            {
                headerName: '소요량취합번호',
                field: 'mrpGatheringNo'
                //minWidth: 150
            },
            { headerName: '품목분류', field: 'itemClassification' },
            { headerName: '품목코드', field: 'itemCode' },
            {
                headerName: '품목명',
                field: 'itemName'
                //minWidth: 150
            },
            { headerName: '단위', field: 'unitOfMrp' },
            { headerName: '지시수량', field: 'requiredAmount' },
            { headerName: '생산공정코드', field: 'productionProcessCode' },
            { headerName: '생산공정명', field: 'productionProcessName' },
            { headerName: '작업장코드', field: 'workSiteCode' },
            { headerName: '작업장명', field: 'workStieName' },
            {
                headerName: '완료상태',
                field: 'completionStatus',
                minWidth: 50,
                //suppressSizeToFit: true,
                /*cellRenderer: function(params) {
                    if (params.value === 'Y') {
                        return (params.value = '🟢');
                    }
                    return '❌';
                } */
            },
            {
                headerName: '작업완료된수량',
                //suppressSizeToFit: true,
                minWidth: 50,
                field: 'actualCompletionAmount',
                editable: true,
                /* cellRenderer: function(params) {
                     if (params.value == null) {
                         return '📷';
                     }
                     return '📷' + params.value;
                 }*/
            }
        ]
    };

    const onCellClicked = params => {

        setGrid(params);
    };

    const completionRegist = () => {

        if (grid.length === 0) {
            return;

        }
        grid.api.stopEditing();
        let selectedRows = grid.api.getSelectedRows();
        let selectedRow = selectedRows[0];
        if (selectedRow === undefined || selectedRows === undefined) {
           
            Swal.fire('알림', '선택한 행이 없습니다.', 'info');
            return;
        }
        if (selectedRow.completionStatus !== 'Y') {
            Swal.fire('알림', '작업공정이 다 끝나지 않았습니다. 작업장을 방문하십시오', 'info');
            return;
        }
        if (
            selectedRow.actualCompletionAmount === undefined ||
            selectedRow.actualCompletionAmount === ''
        ) {
            Swal.fire('알림', '작업완료수량을 입력하십시오.', 'info');
            return;
        }
        let confirmMsg =
            '작업을 완료합니다.</br>' +
            '작업일련번호 : ' +
            selectedRow.workOrderNo +
            '</br>' +
            '<b>작업완료된수량 : ' +
            selectedRow.actualCompletionAmount +
            '</b></br>';

        // o 데이터 전송
        Swal.fire({
            title: '작업을 완료하시겠습니까?',
            html: confirmMsg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '취소',
            confirmButtonText: '확인'
        }).then(result => {
            if (result.isConfirmed) {
                Axios.get('http://localhost:9102/quality/workorder/completion', {
                    params: {
                        workOrderNo: selectedRow.workOrderNo,
                        actualCompletionAmount: selectedRow.actualCompletionAmount
                    }
                })
                    .then(response => {
                        grid.api.updateRowData({ remove: [selectedRow] });
                        Swal.fire('성공!', '작업등록이 완료되었습니다.', 'success');
                    })
                    .catch(e => {
                        Swal.fire('오류', e, 'error');
                    });
            }
        });
    };

    const contractSearch = () => {
        Axios.get('http://localhost:9102/quality/workorder/list')
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <>
            <MainCard
                content={false}
                title="작업지시현황"
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={contractSearch}
                    >
                        작업지시현황조회
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        //style={{ marginTop: "1vh" }}
                        onClick={completionRegist}
                    >
                        작업완료등록
                    </Button>
                </Grid>
                }
            >
                <MyGrid
                    column={column}
                    list={list}
                    onCellClicked={onCellClicked}
                    rowSelection="single"
                    size={size}
                >

                </MyGrid>
            </MainCard>
        </>
    );
}

export default WorkOrderStatus;

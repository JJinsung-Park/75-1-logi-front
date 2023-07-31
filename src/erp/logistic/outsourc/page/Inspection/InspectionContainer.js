import {Button, Grid} from '@mui/material';
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function WorkOrderStatus(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    //const [selectedRows, setSelectedRows] = useState([]);
    const [grid, setGrid] = useState([]);

    const column = {
        columnDefs: [
            {
                headerName: '외주발주번호',
                field: 'outsourcNo',
                minWidth: 150,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                suppressRowClickSelection: true,
                checkboxSelection: true
            },
            { headerName: '소요량취합번호', field: 'mrpGatheringNo' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrpGathering' },
            { headerName: '필요수량', field: 'necessaryAmount' },
            { headerName: '외주지시수량', field: 'outSourcAmount' },
            { headerName: '외주단가', field: 'unitPriceOfOutsourc' },
            { headerName: '합계액', field: 'sumPriceOfOutsourc' },
            { headerName: '구매여부및 생산여부', field: 'orderOrProductionStatus' },
            {
                headerName: '작업완료된수량',
                minWidth: 50,
                field: 'actualCompletionAmount',
                editable: true,
                cellRenderer: function(params) {
                    if (params.value == null) {
                        return '📷';
                    }
                    return '📷' + params.value;
                }
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

        if (
            selectedRow.actualCompletionAmount === undefined ||
            selectedRow.actualCompletionAmount === '' ||
            selectedRow.actualCompletionAmount === null
        ) {
            Swal.fire('알림', '작업완료수량을 입력하십시오.', 'info');
            return;
        }
        let confirmMsg =
            '작업을 완료합니다.</br>' +
            '작업일련번호 : ' +
            selectedRow.outsourcNo +
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
                Axios.get('http://localhost:8282/logi/outsourc/outInspectionCompletion', {
                    params: {
                        outsourcNo: selectedRow.outsourcNo,
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

    const InspectionSearch = () => {
        Axios.get('http://localhost:8282/logi/outsourc/outInspectionInfoList')
            .then(response => {
                setList(response.data.gridRowJson);
            })
            .catch(e => {
                Swal.fire('오류!!!', e, 'error');
            });
    };

    function inspectionContainerButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: '1vh' }}
                onClick={InspectionSearch}
            >
                외주자재실적조회
            </Button>
            <Button
                variant="contained"
                color="secondary"
                //style={{ marginTop: "1vh" }}
                onClick={completionRegist}
            >
                외주자재검사완료
            </Button>
        </Grid>
    }

    return (
        <>
            <MainCard
                content={false}
                title="외주 자재 실적 검사"
                secondary={inspectionContainerButton()}
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

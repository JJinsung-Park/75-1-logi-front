import React, { useEffect, useState, useCallback } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import { getDatePicker } from 'erp/hr/util/datePicker';
import moment from 'moment';
import { Button } from '@material-ui/core';
import ContractRegistDetail from './ContractRegistDetail';
import ContractTypeSearchDialog from './ContractTypeSearchDialog';
import MyDialog from '../../../../../util/LogiUtil/MyDialog';
import { useSelector } from 'react-redux';
import * as Api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import { searchEstimate } from "erp/logistic/sales/api";

function ContractRegist(props) {
    const today = moment(new Date()).format('yyyy-MM-DD');
    // const { empCode } = useSelector(state => state.logInOutReducer.empInfo);
    const [size, setSize] = useState('calc(100vh - 290px)');
    const [detailList, setDetailList] = useState([]);
    const [selContract, setSelContract] = useState();
    const [selList, setSelList] = useState([]);
    const [gridApi, setGrid] = useState();
    const [dateSearchCondition, setDateSearchCondition] = useState('estimateDate');
    const [rowEstimate, setRowEstimate] = useState([]);
    const [gridApiEstimate, setGridApiEstimate] = useState(null);
    const [gridColumnApiEstimate, setGridColumnApiEstimate] = useState(null);


    //namu
    const column = {
        columnDefs: [
            { headerName: '견적일련번호', field: 'estimateNo', checkboxSelection: true },
            { headerName: '수주유형분류', field: 'detailCode' },
            { headerName: '거래처코드', field: 'customerCode' },
            { headerName: '거래처명', field: 'customerName' },
            { headerName: '수주요청자', field: 'contractRequester', editable: true },
            {
                headerName: '견적일자',
                field: 'estimateDate',
                cellRenderer: function (params) {
                    if (params.value === undefined) {
                        params.value = 'YYYY-MM-DD';
                    }
                    return '📅 ' + params.value;
                },
                cellEditor: 'datePicker'
            },
            {
                headerName: '유효일자',
                field: 'effectiveDate',
                cellRenderer: function (params) {
                    if (params.value === undefined) {
                        params.value = 'YYYY-MM-DD';
                    }
                    return '📅 ' + params.value;
                },
                cellEditor: 'datePicker'
            },
            { headerName: '견적담당자코드', field: 'personCodeInCharge' },
            { headerName: '비고', field: 'description', editable: true }
        ]
    };

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const onChangeDate = (e) => {
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const [estimate, searchEstimateFetch] = useAsync((param) => Api.searchEstimate(param), [], true);

    const searchEstimate = useCallback(() => {
        var param = {
            startDate: startDate,
            endDate: endDate,
            dateSearchCondition: dateSearchCondition
        };

        searchEstimateFetch(param);

        estimate.data ? setRowEstimate(estimate.data.gridRowJson) : null;
    }, [dateSearchCondition, endDate, searchEstimateFetch, startDate]);

    const onCellClicked = (params) => {
        console.log(params)
        if (params.colDef.field === 'detailCode') {
            setSearchOpenDialog(true);
        }
        setSelList([params.data]);
        setSelContract('상세 보기');
        setSize('60vh');
        setDetailList(params.data.estimateDetailTOList); //확인필요
    };

    const detailClose = () => {
        setSize('calc(100vh - 290px)');
        setSelContract();
    };

    const api = (params) => {
        setGrid(params.api);
    };

    const [result, addContractFetch] = useAsync((param) => Api.addContract(param), [], true);

    const addContract = () => {
        if (selList[0] === undefined) {
            return alert('수주할 견적을 선택해주세요.');
        }
        if (selList[0] !== undefined) {
            if (selList[0].detailCode === undefined) {
                return alert('수주 유형을 선택해주세요');
            }
            if (selList[0].contractRequester === undefined || selList[0].contractRequester === '') {
                return alert('수주 요청자를 입력해주세요.');
            }
        }

        var param = {
            // batchList: JSON.stringify(selList[0]),
            // batchList: JSON.stringify(selList),
            contractType: selList[0].detailCode,
            contractDate: today,
            estimateNo: selList[0].estimateNo,
            description: selList[0].description,
            contractRequester: selList[0].contractRequester,
            customerCode: selList[0].customerCode,
            contractNo: selList[0].contractNo,
            // personCodeInCharge: empCode
            personCodeInCharge: 'EMP-01'
        };

        addContractFetch(param);
    };

    useEffect(() => {
     
        if (result.data !== null) {
            // alert('수주 번호 ' + result.data.contractNo + '으로 등록 되었습니다.');
            alert(result.data.errorMsg + '으로 등록 되었습니다.');
            setSize('calc(100vh - 290px)');
            setSelContract();
            gridApi.setRowData(null);
            setDetailList(null);
        }
    }, [gridApi, result, result.data]);

    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const close = () => {
        setSearchOpenDialog(false);
    };

    const onDialogCellClicked = (params) => {
       
        // var newList = [{ ...selList[0], contractType: params.data.detailCode }];
        // gridApi.setRowData(newList);
        const selectedData = gridApi.getSelectedRows();
        selectedData[0].detailCode = params.data.detailCode;
        gridApi.updateRowData(selectedData);
    };

    function onGridReadyEstimate(params) {
        setGridApiEstimate(params.api);
        setGridColumnApiEstimate(params.columnApi);
        params.api.sizeColumnsToFit();
    }

    return (
        <>
            <MyGrid
                column={column}
                title={'수주 등록'}
                size={size}
                list={estimate.data && estimate.data.gridRowJson}
                onCellClicked={onCellClicked}
                components={{ datePicker: getDatePicker() }}
                api={api}
                rowSelection="single" //multiple로 변경시 shift키를 누르고 클릭해야 다중선택됨.
                onGridReady={onGridReadyEstimate}


            >
                <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
                <Button variant="contained" color="secondary" style={{ marginTop: '1vh' }} onClick={searchEstimate}>
                    견적 조회
                </Button>
                <Button variant="contained" color="secondary" style={{ marginTop: '1vh' }} onClick={addContract}>
                    수주 등록
                </Button>
            </MyGrid>
            {selContract === undefined ? '' : <ContractRegistDetail detailList={detailList} detailClose={detailClose} />}
            <MyDialog open={searchOpenDialog} close={close}>
                <ContractTypeSearchDialog close={close} onCellClicked={onDialogCellClicked} />
            </MyDialog>
        </>
    );
}

export default ContractRegist;

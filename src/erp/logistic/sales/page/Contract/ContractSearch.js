import {Button, FormControlLabel, TextField, Grid, RadioGroup, Radio} from '@mui/material';
import React, { useState } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/SimpleModal';
import moment from 'moment';
import Axios from 'axios';
import CustomerSearchDialog from './CustomerSearchDialog';
import ContractDetailSearch from './ContractDetailSearch';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

import SimpleModal from "../../../../../util/LogiUtil/SimpleModal";

function ContractSearch(props) {
    const [list, setList] = useState([]);
    const [selList, setSelList] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [customerSearch, setCustomerSearch] = useState(false);
    const [dateSearch, setDateSearch] = useState(true);
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [selContract, setSelContract] = useState();
    const [size, setSize] = useState('calc(100vh - 290px)');

    //다이알로그에서 가져온 값
    const [selCustomer, setSelCustomer] = useState({
        detailCodeName: '',
        detailCode: ''
    });

    const onChangeDate = e => {
       
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        }
        if (e.target.id === 'endDate') {
            setEndDate(e.target.value);
        }
    };

    const column = {
        columnDefs: [
            { headerName: '수주번호', field: 'contractNo' },
            { headerName: '견적번호', field: 'estimateNo' },
            { headerName: '유형', field: 'contractTypeName' },
            { headerName: '거래처코드', field: 'customerCode', hide: true },
            { headerName: '거래처명', field: 'customerName' },
            { headerName: '견적일자', field: 'contractDate', hide: true },
            { headerName: '수주일자', field: 'contractDate' },
            { headerName: '수주요청자', field: 'contractRequester' },
            { headerName: '수주담당자명', field: 'empNameInCharge' },
            { headerName: '비고', field: 'description' },
            { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
            { headerName: 'contractType', field: 'contractType', hide: true },
            { headerName: 'personCodeInCharge', field: 'personCodeInCharge', hide: true }
        ]
    };

    const onDialogCellClicked = params => {
        setSelCustomer({
            detailCodeName: params.data.detailCodeName,
            detailCode: params.data.detailCode
        });

        setSearchOpenDialog(false);
    };

    const [detailList, searchDetailListFetch] = 
    useAsync((param) =>api.searchDetailList(param), [], true);
    const onRowSelected = params => {
        setSelContract(params.data.contractNo);
        setSelList([params.data]);

        searchDetailListFetch(params);
        
        setSize('60vh'); //2023-02-23 남우_수주 조회 내용 클릭시 한 페이지에 row만 표시되므로 크기를 키움
        params.api.sizeColumnsToFit();
    };

    const detailClose = () => {
        setSize('calc(100vh - 290px)');
        setSelContract();
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const conditionChange = e => {
        if (e.target.value === 'customerSearch') {
            setCustomerSearch(true);
            setDateSearch(false);
        }
        if (e.target.value === 'dateSearch') {
            setCustomerSearch(false);
            setDateSearch(true);
        }
    };


    const [contractList, searchContractFetch] =
    useAsync(param => api.searchContractList(param),[],true);
    const contractSearch = () => {
        let param;
        if (customerSearch === true) {
            param = {
                startDate: 'null',
                endDate: 'null',
                searchCondition: 'searchByCustomer',
                customerCode: selCustomer.detailCode
            };
        }
        if (dateSearch === true) {
            param = {
                startDate: startDate,
                endDate: endDate,
                searchCondition: 'searchByDate',
                customerCode: 'null'
            };
        }

        searchContractFetch(param);
    };

    function onClick(){
        contractSearch();
    }

    function ContractSearch(){
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <div align="left" style={{ float: 'left' }} >
                <RadioGroup
                    row
                    aria-label="searchCondition"
                    name="searchCondition"
                    defaultValue="dateSearch"
                >
                    <FormControlLabel
                        value="customerSearch"
                        control={<Radio color="secondary"/>}
                        label="거래처명"
                        style={{ marginRight: '5vh', marginTop: '1vh', marginLeft: '2vh' }}
                        onChange={conditionChange}
                        textRightPadding="50px"
                    />
                    <FormControlLabel
                        value="dateSearch"
                        control={<Radio color="secondary"/>}
                        label="날짜"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onChange={conditionChange}
                        textRightPadding="50px"
                    />
                </RadioGroup>
            </div>

            <div style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}>
            {dateSearch === true ? (
                <MyCalendar
                    onChangeDate={onChangeDate}
                    basicInfo={basicInfo}
                    style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}
                />
            ) : (
                <TextField
                    id="customerName"
                    label="거래처명"
                    value={selCustomer.detailCodeName}
                    style={{ marginRight: '1vw' }}
                    disabled
                    onClick={customerSearchClick}
                />
            )}

                <Button variant="contained" color="secondary"  onClick={onClick}
                        style={{ marginRight: '1vh'}}
                >
                    조회
                </Button>
            </div>
        </Grid>
    }

    return (
        <>
            <div>
                <MainCard
                    content={false}
                    title="수주 조회"
                >
                    {ContractSearch()}
                <MyGrid
                    column={column}
                    list={contractList.data ? contractList.data.gridRowJson : null}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                >
                </MyGrid>
                </MainCard>

                {selContract === undefined ? (
                    ''
                ) : (
                    <ContractDetailSearch list={detailList.data ? detailList.data.gridRowJson : null} detailClose={detailClose} />
                )}
                <SimpleModal
                    open={searchOpenDialog}
                    close={close}
                    title={'거래처 검색'}
                    clientInfo={true}
                    onCellClicked={onDialogCellClicked}
                >
                    <div></div>
                </SimpleModal>

            </div>
        </>
    );
}

export default ContractSearch;

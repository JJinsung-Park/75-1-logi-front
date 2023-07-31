import { Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyDialog from 'util/LogiUtil/SimpleModal';
import MyGrid from 'util/LogiUtil/MyGrid';
import moment from 'moment';
import CustomerSearchDialog from '../Contract/CustomerSearchDialog';
import Axios from 'axios';
import DeliveryDetailGrid from './DeliveryDetailGrid';
import Swal from 'sweetalert2';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import SimpleModal from "util/LogiUtil/SimpleModal";

function DeliverySearch(props) {
    const [list, setList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [size, setSize] = useState('50vh');
    const [customerSearch, setCustomerSearch] = useState(false);
    const [dateSearch, setDateSearch] = useState(true);
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [selDelivery, setSelDelivery] = useState();
    const [contractDetailNo, setContractDetailNo] = useState();
    const [deliveryGrid, setDeliveryGrid] = useState();
    const [deliveryDetailGrid, setDeliveryDetailGrid] = useState();

    //다이알로그에서 가져온 값
    const [selCustomer, setSelCutomer] = useState({
        detailCodeName: '',
        detailCode: ''
    });

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
            { headerName: '비고', field: 'description' }
        ]
    };

    const conditionChange = (e) => {
        if (e.target.value === 'customerSearch') {
            setCustomerSearch(true);
            setDateSearch(false);
        }
        if (e.target.value === 'dateSearch') {
            setCustomerSearch(false);
            setDateSearch(true);
        }
    };

    const onCellClicked = (param) => {

        setDetailList(param.data.contractDetailTOList);
        setSelDelivery('select'); //select ??
        setSize('60vh');
        deliveryGrid.sizeColumnsToFit();

        if (deliveryDetailGrid) {
            deliveryDetailGrid.setRowData(param.data.contractDetailTOList);
        }
    };

    const onChangeDate = (e) => {

        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const onDialogCellClicked = (params) => {
        setSelCutomer({
            detailCodeName: params.data.detailCodeName,
            detailCode: params.data.detailCode
        });
        setSearchOpenDialog(false);
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
    };

    const detailClose = () => {
        setSize('50vh');
        setSelDelivery();
        deliveryGrid.sizeColumnsToFit();
    };

    const updateDetail = (contractDetailNo) => {
        setContractDetailNo(contractDetailNo);
    };

    const delivery = useCallback(() => {
        if (contractDetailNo === undefined) {
            return alert('납품할 제품을 먼저 선택해주세요..');
        }

        if (deliveryDetailGrid.getSelectedRows()[0].deliveryCompletionStatus === 'Y') {
            return Swal.fire({
                icon: 'error',
                text: '이미 발주된 항목입니다.'
            });
        }

        // Axios.get('http://localhost:8282/logi/logistics/sales/deliver', {
        Axios.get('http://localhost:9102/sales/deliver', {
            params: {
                contractDetailNo: contractDetailNo
            }
        })
            .then((response) => {
                if (parseInt(response.data.errorCode) === 0) {
                    window.alert(response.data.errorMsg);
                }
            })
            .catch((e) => {

            });

        deliveryDetailGrid.setRowData(null);
        deliveryGrid.setRowData(null);
    }, [contractDetailNo, deliveryDetailGrid, deliveryGrid]);
    const api = (params) => {
        setDeliveryGrid(params.api);
    };

    const detailApi = (params) => {
        setDeliveryDetailGrid(params.api);
    };

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const deliverySearch = useCallback(() => {
        if (customerSearch === true) {
            var param = {
                startDate: 'null',
                endDate: 'null',
                searchCondition: 'searchByCustomer',
                customerCode: selCustomer.detailCode
            };
        }
        if (dateSearch === true) {
            var param = {
                startDate: startDate,
                endDate: endDate,
                searchCondition: 'searchByDate',
                customerCode: 'null'
            };
        }
        // Axios.get('http://localhost:8282/logi/logistics/sales/searchDeliverableContractList', {
        Axios.get('http://localhost:9102/sales/deliver/list/contractavailable', {
            params: { ableContractInfo: param }
        })
            .then((response) => {
                setList(response.data.gridRowJson);

                if (deliveryGrid) {
                    deliveryGrid.setRowData(response.data.gridRowJson);
                }
            })
            .catch((e) => {

            });
    }, [customerSearch, dateSearch, endDate, list, selCustomer.detailCode, startDate]);

    return (
        <div>
            <MainCard content={false} title="납품">
                <MyGrid column={column} list={list} onCellClicked={onCellClicked} rowSelection="single" size={size} api={api}>
                    <div align="left" style={{ float: 'left' }}>
                        <RadioGroup
                            row
                            aria-label="searchCondition"
                            name="searchCondition"
                            defaultValue="dateSearch"
                        >
                            <FormControlLabel
                                value="customerSearch"
                                control={<Radio color="secondary" />}
                                label="거래처명"
                                style={{ marginRight: '5vh', marginTop: '1vh', marginLeft: '2vh' }}
                                onChange={conditionChange}
                                textRightPadding="50px"
                            />
                            <FormControlLabel
                                value="dateSearch"
                                control={<Radio color="secondary" />}
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

                        <Button variant="contained"
                                color="secondary"
                                style={{ marginRight: '1vh', marginTop: '1vh' }}
                                onClick={deliverySearch}
                        >
                            조회
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                style={{ marginTop: '1vh', marginRight: '1vh' }}
                                onClick={delivery}>
                            납품
                        </Button>
                    </div>
                </MyGrid>
            </MainCard>

            {selDelivery === undefined ? (
                ''
            ) : (
                <DeliveryDetailGrid list={detailList} detailClose={detailClose} updateDetail={updateDetail} detailApi={detailApi} />
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
    );
}

export default DeliverySearch;
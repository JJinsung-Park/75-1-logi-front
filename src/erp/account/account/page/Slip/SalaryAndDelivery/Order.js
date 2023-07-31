import React, { useEffect, useState } from 'react';
import moment from "moment";
import SearchIcon from '@material-ui/icons/Search';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_COMPLETE_REQUEST } from 'erp/logistic/sales/action/SalesActionType';
import { setSearchOrderInfoListOnDelivery } from 'erp/logistic/purchase/page/StockInfo/stockAxios';
import { List, DialogActions, Button, TextField } from '@material-ui/core';
import axios from 'axios';


/*##################################### 2021-06-18 발주현황 PGW  #######################################*/

const Order = props => {

    let year = moment(new Date()).format("yyyy");
    let month = moment(new Date()).format("MM");
    let toDay = moment(new Date()).format("yyyy-MM-DD");
    let monthFirstDay = year + "-" + month + "-01";

    const [startDate, setStartDate] = useState(monthFirstDay); //시작 날짜
    const [endDate, setEndDate] = useState(toDay);


    const [positionGridApi, setPositionGridApi] = React.useState();
    const dispatch = useDispatch();


    const orderCompleteData = useSelector(
        state  => state.RootReducers.logistic.Sales.orderCompleteData);

    const [orderInfoRows, setOrderInfoRows] = useState([]);

    const [orderList, setOrderList] = useState([
        {
            journalNo: 'NEW JOURNAL', // 여기서 분개 번호가 만들어짐.
            slipNo: 'NEW',
            balanceDivision: '차변',
            accountCode: '0602', //발주 외주비.
            accountName: '외주비',
            customerCode: '',
            leftDebtorPrice: 0, // 차변
            rightCreditsPrice: '' // 대변
        },
        {
            journalNo: 'NEW JOURNAL',
            slipNo: 'NEW',
            balanceDivision: '대변',
            accountCode: '0101', //급여에 대한 현금
            accountName: '현금',
            customerCode: '',
            leftDebtorPrice: '', // 차변
            rightCreditsPrice: 0 // 대변
        }
    ]);

    const onGridReady = params => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };
    const column = {
        accountColumnDefs: [
            { width: '50', headerCheckboxSelection: true, checkboxSelection: true },
            { headerName: '제품코드', field: 'itemCode', width: 150 },
            { headerName: '제품명', field: 'itemName', width: 150  },
            { headerName: '단위', field: 'unitOfMrp', width: 100 },
            { headerName: '발주량', field: 'requiredAmount', width: 110 }, //valueFormatter: currencyFormatter
            { headerName: '재고량', field: 'stockAmount', width: 110 },
            { headerName: '구매갯수', field: 'calculatedRequiredAmount', width: 150 },
            { headerName: '제품금액', field: 'standardUnitPrice', width: 150 },
            { headerName: '합계금액', field: 'sumPrice', width: 200 },
        ],
        autoGroupColumnDef: { minWidth: 100 }
    };


    const selectData = async () => {
        await dispatch({
            type: ORDER_COMPLETE_REQUEST,
            payload: {}
        });
    };

    useEffect(() => {
            setSearchOrderInfoListOnDelivery(setOrderInfoRows)
        }
        , []);

    function currencyFormatter(params) {
        return formatNumber(params.value) + ' 원';
    }

    function formatNumber(number) {
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const SumOrder = () => {
        const orderRows = positionGridApi.getSelectedRows();

        var sumPrice = 0;

        if (orderRows.length === 0) {
            alert('선택된 값이 없습니다');
            return;
        }

        for (var i = 0; i < orderRows.length; i++) {
            // if (orderRows[i].finalizeStatus === 'Y') {
            //     alert('마감여부 확인 바랍니다');
            //     return;
            // }
            
            sumPrice += parseInt(orderRows[i].sumPrice);
        }

        const newJournal = orderList.map((journalState, index) => {
            switch (index) {
                case 0:
                    return {
                        ...journalState,
                        customerCode: orderRows[0].customerCode,
                        rightCreditsPrice: sumPrice
                    };

                case 1:
                    return {
                        ...journalState,
                        customerCode: orderRows[0].customerCode,
                        leftDebtorPrice: sumPrice
                    };

                default:
                    return { ...journalState };
            }
        });

        props.close({
            newJournal,
            orderInfoRows,
            division: 'Order'
        });
    };

    return (
        <div>
            <List>
                <div Align="center">
                    <TextField
                        id="startDate"
                        type={"date"}
                        value={startDate}
                        defaultValue={monthFirstDay}
                        onChange={e => {
                            setStartDate(e.target.value);
                        }}
                    />
                    <TextField
                        id="endDate"
                        type={"date"}
                        value={endDate}
                        defaultValue={toDay}
                        onChange={e => {
                            setEndDate(e.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        startIcon={<SearchIcon />} //아이콘
                        onClick={selectData}
                    >
                        발주신청 현황조회
                    </Button>
                </div>
                <div
                    className={'ag-theme-material'} //그리드 모양
                    style={{
                        height: '540px',
                        width: '100%',

                        paddingTop: '8px'
                    }}
                >
                    <AgGridReact
                        columnDefs={column.accountColumnDefs} //컬럼명
                        rowSelection="multiple"
                        getRowStyle={function(param) {
                            return { 'text-align': 'center' };
                        }} //body 가운데 정렬
                        onGridReady={onGridReady}
                        autoGroupColumnDef={column.autoGroupColumnDef}
                        rowData={orderCompleteData}
                        suppressRowClickSelection={true}
                    />
                </div>
            </List>
            <div>
                <DialogActions>
                    <Button variant="contained"
                            size="large"
                            color="primary"
                            onClick={SumOrder}>
                        발주 승인
                    </Button>
                </DialogActions>
            </div>
        </div>
    );
};

export default Order;

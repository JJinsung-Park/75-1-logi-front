
import React, { useState,useCallback, useEffect, } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/MyDialog';
import Axios from 'axios';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import moment from 'moment';
import useAsync from 'util/useAsync';
import {Button, Radio, RadioGroup, FormControlLabel, Grid} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import axios from "axios";
import ForwardOrderDialog from "../../../outsourc/page/Forward/ForwardOrderDialog";
import ProcessPlanDialog from "./ProcessPlanDialog";
import Swal from 'sweetalert2';

function ProcessPlanInfo(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [data, setData] = useState({"rowData": []});
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [searchCondition, setSearchCondition] = useState('contractDate');
    const [outsoutcInfoList, outsoutcInfoListFetch] = useAsync((param) =>api.searchForwardableList(param), [], true);
    const [gridApi, setGridApi] = useState();
    const [createProcessPlanDialog, setCreateProcessPlanDialog] = useState(false)

    // 수주 상세 조회는 68ERP가 아닌 1차프로젝트 URI로 요청을 보냄
    const mpsColumn = {
        columnDefs: [
            {
                headerName: "수주상세일련번호", field: "contractDetailNo", suppressSizeToFit: true, headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {headerName: "수주유형", field: "contractType"},
            {headerName: "계획구분", field: "planClassification", hide: true},
            {headerName: "수주일자", field: "contractDate", hide: true},
            {headerName: "견적수량", field: "estimateAmount"},
            {headerName: "기존재고량", field: "stockAmountUse"},
            {headerName: "제작수량", field: "productionRequirement"},
            {
                headerName: "계획일자", field: "mpsPlanDate", hide: true, editable: true, cellRenderer: function (params) {
                    if (params.value == null) {
                        params.value = "";
                    }
                    return '📅 ' + params.value;
                }, cellEditor: 'datePicker1'
            },
            {
                headerName: "출하예정일", field: "scheduledEndDate", hide: true, editable: true, cellRenderer: function (params) {
                    if (params.value == null) {
                        params.value = "";
                    }
                    return '📅 ' + params.value;
                }, cellEditor: 'datePicker2'
            },
            {headerName: "납기일", field: "dueDateOfContract", hide: true, cellRenderer: function (params) {
                    if (params.value == null) {
                        params.value = "";
                    }
                    return '📅 ' + params.value;
                },},
            {headerName: "품목코드", field: "itemCode"},
            {headerName: "품목명", field: "itemName"},
            {headerName: "단위", field: "unitOfContract"},
            {headerName: "비고", field: "description", editable: true, hide: true},
        ]
    };

    let processPlanColumn = {
            columnDefs: [
                {headerName: "수주상세일련번호", field: "contractDetailNo", suppressSizeToFit: true, headerCheckboxSelection: true,
                    headerCheckboxSelectionFilteredOnly: true,
                    checkboxSelection: true},
        {headerName: "품목명", field: "itemName"},
        {headerName: "품목코드", field: "itemCode"},
        {headerName: "수주유형", field: "contractType"},
        {headerName: "재고량", field: "stockAmount", hide: true},
        {headerName: "견적수량", field: "estimateAmount"},
        {headerName: "재고사용량", field: "stockAmountUse"},
        {headerName: "필요생산량", field: "RequirementAmount"},
        // {headerName: "재고보충량", field: "stockAmountPlus"},
        // {headerName: "총생산량", field: "productionRequirement"},
        {headerName: "MPS", field: "MPS"},
        {headerName: "납품가능", field: "Release"},
        {headerName: "비고", field: "description", editable: true, hide: true},
    ]}

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const onChangeDate = e => {
       
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const conditionChange = e => {
        setSearchCondition(e.target.value);
    };

    const onRowSelected = params => {
        if(params.data.contractNo !== data.contractNo) {
            setData({...data, "rowData" : params.data})

        }else {
            setData({ ...data, "rowData" :[]})
        };
       
    };


    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setCreateProcessPlanDialog(false);
    };

    const createProcessPlanOpenDialog = useCallback(() => {
       
        if( data.length === 0 ){  // 데이터가 빈배열인지 확인
            Swal.fire('알림','선택한 행이 없습니다.','info');
            return ;
        }
        setCreateProcessPlanDialog(true);
       
    }, [data]);



    function onGridReadyEstimateDetail(params) {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }


    const getProcessPlanAvailable = async e => {
        try {
            await axios.get(`http://localhost:9102/production/mps/contractdetail-processplanavailable`,
                {
                    "searchCondition" : searchCondition,
                    "startDate" : startDate,
                    "endDate": endDate
                })
                .then(response => {
                const gridRowJson = response.data.gridRowJson;
                setList(gridRowJson);
            
            });
        } catch (e) {
        
        }
    };

    function forwardButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <div align="left" style={{ float: 'left' }}>
                <RadioGroup
                    row
                    aria-label="searchDateCondition"
                    name="searchDateCondition"
                    defaultValue="contractDate"
                    size="small"
                >
                    <FormControlLabel
                        value="contractDate"
                        control={<Radio color="secondary"/>}
                        label="수주일자"
                        style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}
                        onChange={conditionChange}
                    />
                    <FormControlLabel
                        value="dueDateOfContract"
                        control={<Radio color="secondary"/>}
                        label="납기일자"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onChange={conditionChange}
                    />
                    <MyCalendar
                        onChangeDate={onChangeDate}
                        basicInfo={basicInfo}
                        style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}
                    />
                    <Button variant="contained" color="secondary"  onClick={getProcessPlanAvailable}
                            style={{ marginRight: '1vh', marginTop: '2vh', marginLeft: '1vh'}}
                    >
                        수주상세조회
                    </Button>
                </RadioGroup>

            </div>

            <div style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}>

                <Button variant="contained" color="secondary"  onClick={createProcessPlanOpenDialog}
                        style={{ marginRight: '1vh'}}
                >

                    공정계획생성
                </Button>
                <Button variant="contained" color="primary"
                        style={{ marginRight: '1vh'}}>
                    공정계획등록
                </Button>
            </div>
        </Grid>

    }


    return (
        <>
            <div>
                <MainCard
                    content={false}
                    title="공정 계획 등록"
                    // secondary={}
                >
                    {forwardButton()}
                    <MyGrid
                        column={mpsColumn}
                        list={list?list:null}
                        onRowSelected={onRowSelected}
                        rowSelection="single"
                        size='30vh'
                        api={onGridReadyEstimateDetail}
                    >
                    </MyGrid>

                </MainCard>
                <MyGrid
                    column={processPlanColumn}
                    list={outsoutcInfoList.data?outsoutcInfoList.data.gridRowJson:null}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                    api={onGridReadyEstimateDetail}
                >

                </MyGrid>

                <MyDialog open={createProcessPlanDialog}
                          close={close}
                          maxWidth={'xs'}
                          >
                    <ProcessPlanDialog></ProcessPlanDialog>
                </MyDialog>
            </div>
        </>
    );
}

export default ProcessPlanInfo;

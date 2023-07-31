
import React, { useState,useCallback, useEffect, } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MyDialog from 'util/LogiUtil/SimpleModal';
import Axios from 'axios';
import ForwardOrderDialog from './ForwardOrderDialog';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import moment from 'moment';
import useAsync from 'util/useAsync';
import * as api from '../../api';
import {Button, Radio, RadioGroup, FormControlLabel, Grid} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function Forward(props) {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [searchOpenDialog, setSearchOpenDialog] = useState(false);
    const [data, setData] = useState([]);

    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [condition, setCondition] = useState('claimDate');
    const [outsoutcInfoList, outsoutcInfoListFetch] = useAsync((param) =>api.searchForwardableList(param), [], true);
    const [gridApi, setGridApi] = useState();
    const [seq, setSeq] = useState(null);
    const [id, setId] = useState(null);
 
    const column = {
        columnDefs: [
            {
                headerName: '외주발주번호',
                field: 'outsourcNo',
                suppressSizeToFit: true,
                headerCheckboxSelection: false,
                headerCheckboxSelectionFilteredOnly: true,
                suppressRowClickSelection: true,
                checkboxSelection: true},
           
            {
                headerName: '소요량취합번호',
                field: 'mrpGatheringNo'
            },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrpGathering' },
            { headerName: '필요수량', field: 'outsourcAmount' },
            { headerName: '작업지시기한', field: 'claimDate' },
            { headerName: '작업완료기한', field: 'dueDate' },
            { headerName: 'status', field: 'forwardStatus', hide :true  }
        ]
    };

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
        setCondition(e.target.value);
    };

    const onRowSelected = params => {
        setData(params);
    
    };

    const onClick = () => {
        let selectNodes = gridApi.getSelectedNodes();
        if (selectNodes.length === 0) {
            return alert("선택하셈")
        }else{
            customerSearchClick();
        }
    };

    const customerSearchClick = () => {
        setSearchOpenDialog(true);
    };

    const close = () => {
        setSearchOpenDialog(false);
        const rows = gridApi.getSelectedRows();
        gridApi.updateRowData({remove:rows});
    };

    const onClicked = () => {
        const param = {
            searchDateCondition: condition,
            startDate: startDate,
            endDate: endDate
        }
        outsoutcInfoListFetch(param);
    };

    function onGridReadyEstimateDetail(params) {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }

    const onClicked2 = useCallback(() =>{

    },[seq]);

    function forwardButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <div align="left" style={{ float: 'left' }}>
                <RadioGroup
                    row
                    aria-label="searchDateCondition"
                    name="searchDateCondition"
                    defaultValue="claimDate"
                >
                    <FormControlLabel
                        value="claimDate"
                        control={<Radio color="secondary"/>}
                        label="발주/작업지시 기한"
                        style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}
                        onChange={conditionChange}
                    />
                    <FormControlLabel
                        value="dueDate"
                        control={<Radio color="secondary"/>}
                        label="발주/작업지시 완료기한"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onChange={conditionChange}
                    />
                </RadioGroup>
            </div>

            <div style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}>
            <MyCalendar
                onChangeDate={onChangeDate}
                basicInfo={basicInfo}
                style={{ marginRight: '1vh', marginTop: '1vh', marginLeft: '1vh' }}
            />
            <Button variant="contained" color="secondary"  onClick={onClick}
                    style={{ marginRight: '1vh'}}
            >
                외주 자재 출고 모의전개
            </Button>
            <Button variant="contained" color="secondary"  onClick={onClicked}
                    style={{ marginRight: '1vh'}}
            >

                외주 자재 출고 필요 목록조회
            </Button>
            <Button variant="contained" color="secondary"  onClick={onClicked2}
                    style={{ marginRight: '1vh'}}>
                로컬스토리지 확인하기
            </Button>
            </div>
        </Grid>

    }

    useEffect(() => {
        let seq = localStorage.getItem('seq');
        if(!seq){
            seq = 0;
        }else{
            seq++; 
        }
        localStorage.setItem('seq', seq);
     
        setSeq(seq);
    },[]);

    useEffect(() => {
        setId(sessionStorage.getItem('empCodeInfo_token'));
    },[]);

    const forwardTempDelete = useCallback(() => {

        Axios.delete('http://localhost:8282/logi/outsourc/forwardTempDelete', {
            params: {
                id: id,
                seq: seq
            }
        })

    },[id, seq]);



    window.onbeforeunload = useCallback(() =>{
        forwardTempDelete();
    },[forwardTempDelete]);
    
    return (
        <>
            <div>
                <MainCard
                    content={false}
                    title="외주 자재 출고 필요 리스트 ( MRP 취합 기반 )"
                    // secondary={forwardButton()}
                >
                    {forwardButton()}
                <MyGrid
                    column={column}
                    list={outsoutcInfoList.data?outsoutcInfoList.data.gridRowJson:null}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    size={size}
                    api={onGridReadyEstimateDetail}
                >

                </MyGrid>
                </MainCard>
                <MyDialog open={searchOpenDialog} close={close} maxWidth={'200px'}
                forwardTempDelete={forwardTempDelete}>
                    <ForwardOrderDialog 
                    data={data} 
                    id={sessionStorage.getItem('empCodeInfo_token')}
                    seq={seq}
                    close={close} 
                    setList={setList}
                    gridApi={gridApi}
                    />
                </MyDialog>
            </div>
        </>
    );
}

export default Forward;

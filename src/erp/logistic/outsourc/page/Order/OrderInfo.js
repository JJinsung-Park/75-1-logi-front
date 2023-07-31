import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import { getDatePicker } from 'erp/hr/util/datePicker';
import { today } from 'erp/hr/util/lib';
import Swal from 'sweetalert2';
import OutSourcInfoColumn from './OutSourcInfoColumn';
import useAsync from 'util/useAsync';
import moment from 'moment';
import * as api from '../../api';
import axios from "axios";
import {Button, Radio, RadioGroup, FormControlLabel, Grid} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";

const OrderInfo = () => {

    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [condition, setCondition] = useState('claimDate');

    const [outsoutcInfoList, outsourcInfoListFetch] = useAsync((param) =>api.searchOutsourcInfoList(param), [], true);

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

    const onClicked = useCallback(() =>{
        const param = {
            searchDateCondition: condition,
            startDate: startDate,
            endDate: endDate
        }
       outsourcInfoListFetch(param);

    },[condition, endDate, outsourcInfoListFetch, startDate]);

    const conditionChange = e => {
        setCondition(e.target.value);
    };

    function orderInfoButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
        <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo}/>
        <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: '1vh', marginTop: '1vh' }}
            onClick={onClicked}
        >
            외주 발주 조회
        </Button>
            <div align="left" style={{ float: 'left' }}>
                <RadioGroup
                    row
                    aria-label="searchDateCondition"
                    name="searchDateCondition"
                    defaultValue="claimDate"
                >
                    <FormControlLabel
                        value="claimDate"
                        control={<Radio  color="secondary"/>}
                        label="발주/작업지시 기한"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onChange={conditionChange}
                    />
                    <FormControlLabel
                        value="dueDate"
                        control={<Radio  color="secondary"/>}
                        label="발주/작업지시 완료기한"
                        style={{ marginRight: '2vh', marginTop: '1vh' }}
                        onChange={conditionChange}
                    />
                </RadioGroup>
            </div>
        </Grid>

    }

    return (
        <>
            <MainCard
                content={false}
                title="외주 발주 조회 "
                secondary={orderInfoButton()}
                >
            <MyGrid
                column={OutSourcInfoColumn}
                onCellClicked={undefined}
                rowSelection="single"
                components={{ datePicker: getDatePicker() }}
                list={outsoutcInfoList.data?outsoutcInfoList.data.gridRowJson:null}
            >


            </MyGrid>
            </MainCard>
        </>
    );
};

export default OrderInfo;
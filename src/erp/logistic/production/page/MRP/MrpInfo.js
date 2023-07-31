import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Axios from 'axios';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import moment from 'moment';
import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid
} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import contractListColumn from "../MPS/contractListColumn";
import {getDatePicker} from "../../../../hr/util/datePicker";
import MyDialog from "../../../../../util/LogiUtil/MyDialog";
import MpsDialog from "../MPS/MpsDialog";

function MrpInfo(props) {
    const [list, setList] = useState([]);
    const columns = {
        columnDefs: [
            { headerName: '소요량취합번호', field: 'mrpGatheringNo' },
            { headerName: '구매 및 생산여부', field: 'orderOrProductionStatus' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfMrpGathering' },
            { headerName: '필요수량', field: 'necessaryAmount' },
            { headerName: '납기일', field: 'dueDate' },
            { headerName: '지시일', field: 'claimDate' }
        ]
    };

    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [condition, setCondition] = useState('claimDate');

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const onChangeDate = e => {
        console.log(e);
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    const conditionChange = e => {
        setCondition(e.target.value);
    };

    const searchClick = () => {
        try {
            Axios.get('http://localhost:8282/logi/logistics/production/searchMrpGathering', {
                params: {
                    searchDateCondition: condition,
                    startDate: startDate,
                    endDate: endDate
                }
            }).then(function(respones) {
                console.log(respones.data.errorMsg);
                console.log(respones.data.errorCode);

                setList(respones.data.gridRowJson);
            });
        } catch (e) {
            alert(e);
        }
    };

    function Main_secondary() {
        return(
            <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
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
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
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
                <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={searchClick}
                >
                    소요량취합 조회
                </Button>
            </Grid>
        )}

    return (
        <>
            <MainCard
                content={false}
                title="MRP 조회 "
                secondary={ Main_secondary() }
            >
                <MyGrid
                    column={columns}
                    list={list}
                    rowSelection="multiple"
                    onGridReady={event => {
                        event.api.sizeColumnsToFit();
                    }}
                >

                </MyGrid>
            </MainCard>

        </>
    );
}

export default MrpInfo;

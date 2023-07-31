import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';
import { useDispatch } from 'react-redux';
// material-ui
import { Button, Grid, TextField, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
// project imports
import {gridSpacing} from '../../../../../template/store/constant';
import JournalFormGrid from './JournalFormGrid';

const JournalForm = () => {

    let year = moment(new Date()).format('yyyy');
    let month = moment(new Date()).format('MM');
    //let date = moment(new Date()).format("DD");
    let toDay = moment(new Date()).format('yyyy-MM-DD');
    let monthFirstDay = year + '-' + month + '-01';

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(monthFirstDay);
    const [endDate, setEndDate] = useState(toDay);

    const searchData = () => {
        dispatch({
            type: types.SEARCH_JOURNAL_DOUBLE_REQUEST,
            params: {
                startDate: moment(startDate).format('yyyy-MM-DD'),
                endDate: moment(endDate).format('yyyy-MM-DD')
            }
        });
    };


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div Align="center">
                    <Typography variant="h3">[ 검색조건 ]</Typography>
                    <div>
                        <TextField id="startDate" type={"date"} defaultValue={startDate} variant={"standard"} onChange={(e) => setStartDate(e.target.value)} sx={{mx: 1}}/>
                        <TextField id="endDate" type={"date"} defaultValue={endDate} variant={"standard"} onChange={(e) => setEndDate(e.target.value)} sx={{mx: 1}}/>
                        <Button variant="contained" color="secondary" onClick={searchData} startIcon={<SearchIcon/>}
                                sx={{mx: 1, mb: "10px"}}>조회</Button>
                    </div>
                </div>
                <JournalFormGrid/>
            </Grid>
        </Grid>
    );
};

export default JournalForm;

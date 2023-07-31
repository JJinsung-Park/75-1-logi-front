import React, { useState } from 'react';
import UseStyles from './UseStyles';
import { Paper, TextField, Button, Grid, AppBar, Typography, Toolbar } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useAxios from 'util/useAxios';
import Axios from 'axios';
import AnnualVacationInput from './AnnualVacationInput';
import moment from 'moment';

const AnnualVacationComp = props => {
    const columnDefs = AnnualVacationInput;
    const classes = UseStyles();
    //오늘 날짜
    let toDay = moment(new Date()).format('yyyy-MM-DD');
    const [fromDate, setFromDate] = useState(toDay);
    const [gridEvent, setGridEvent] = useState();

    //연차조회
    const findAnnualVacationMgtList_axiosOptions = {
        url: 'http://localhost:8282/hr/attendance/findAnnualVacationMgtList',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8282/'
        },
        //"Context-Type": "application/json"},
        fetchOnStart: false,
        method: 'get',
        params: {
            applyYearMonth: fromDate.split('-')[0] + fromDate.split('-')[1]
        }
    };
    

    const { data, fetch } = useAxios(findAnnualVacationMgtList_axiosOptions); // 조회를 사가로 했으면 결제승인페이지가 쉬웠을듯

    const findAnnualVacationMgtList = () => {
        fetch();
    };

    //마감, 마감취소
    const annualfinalize = e => {
        let buttonId = e.currentTarget.id;
        let rowData = [];
        gridEvent.api.forEachNode(node => {
            rowData.push(node.data);
        });


        Axios.post('http://localhost:8282/hr/attendance/modifyAnnualVacationMgtList', {
            rowData: rowData
        })
            .then(response => {
                findAnnualVacationMgtList();
            })
            .catch(err => {
                
            });
    };

    return (
        <>
            <Grid item xs={12}>
                <Paper className={classes.rightPaper}>
                    <AppBar position="relative" className={classes.subCategory}>
                        <Toolbar>
                            <Typography variant="h5">연차관리</Typography>
                        </Toolbar>
                    </AppBar>
                    <br />
                    <div align="center">
                        <TextField
                            id={'fromDate'}
                            label={'검색날짜'}
                            type={'date'}
                            defaultValue={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className={classes.textField}
                            variant="outlined"
                        />

                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            onClick={findAnnualVacationMgtList}
                            className={classes.button}
                        >
                            조회
                        </Button>
                    </div>
                    <div
                        className={'ag-theme-material'}
                        style={{
                            height: '400px',
                            width: '100%'
                        }}
                    >
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={data ? data : []}
                            onGridReady={event => {
                                event.api.sizeColumnsToFit();
                                setGridEvent(event);
                            }}
                            getRowStyle={function(param) {
                                return { 'text-align': 'center' };
                            }}
                        />
                    </div>
                    <div align="center">
                        <Button
                            id="update"
                            variant={'outlined'}
                            color={'primary'}
                            onClick={annualfinalize}
                            className={classes.button}
                        >
                            마감
                        </Button>
                        <Button
                            id="cancel"
                            variant={'outlined'}
                            color={'primary'}
                            onClick={annualfinalize}
                            className={classes.button}
                        >
                            마감취소
                        </Button>
                    </div>
                </Paper>
            </Grid>
        </>
    );
};
export default AnnualVacationComp;

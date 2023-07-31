import {Button, Grid, TextField} from "@mui/material";
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function WorksiteLog(props) {
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [date, setDate] = useState(today);
    const [logList, setLogList] = useState([]);

    const onChangeDate = e => {
        setDate(e.target.value);
   
    };
    const errorMsg = val => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: val
        });
    };

    const column = {
        columnDefs: [
            { headerName: '작업지시번호', field: 'workOrderNo' },
            { headerName: '품목코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '생산공정코드', field: 'productionProcessCode' },
            { headerName: '생산공정명', field: 'productionProcessName' },
            { headerName: '상황', field: 'reaeson' },
            { headerName: '작업장명', field: 'workSiteName' },
            { headerName: '날짜', field: 'workDate' }
        ]
    };


    const workSiteLogSearch = () => {

        axios.get("http://localhost:9102/quality/workorder/worksitelog" , {
            params: {
                workSiteLogDate: date
            }
        })
            // .then(response => {

            //     if (response.data.result.length === 0) {
            //         errorMsg('선택된 날짜에 로그 정보가 없습니다.');
            //         return;
            //     }

            //     setLogList(response.data.result);
            // })
            .then(({data}) => {
 
                setLogList(data.gridRowJson);
            })
            .catch(e => {

            });
    };
    return (
        <>
            <MainCard
                content={false}
                title='작업장 로그'
                secondary={<Grid item xs={12} sm={6} sx={{textAlign:'right'}}>
                    <TextField type={'date'} value={date} onChange={onChangeDate}></TextField>
                    <Button variant="contained" color="secondary" onClick={workSiteLogSearch}>
                        작업장 로그 조회
                    </Button>
                </Grid>
                }
            >
                <MyGrid
                    column={column}
                    list={logList} rowSelection="single">

                </MyGrid>
            </MainCard>
        </>
    );
}

export default WorksiteLog;

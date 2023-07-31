import { Button } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import Swal from 'sweetalert2';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Grid} from "@mui/material";
function worksitesearch(props) {
    const list = props.list;

    const column = {
        columnDefs: [
            { headerName: '작업지시번호', field: 'workOrderNo' },
            { headerName: '작업장명', field: 'workSieteName' },
            { headerName: '제작품목분류', field: 'wdItem' },
            { headerName: '제작품목코드', field: 'parentItemCode' },
            { headerName: '제작품목명', field: 'parentItemName' },
            { headerName: '작업품목분류', field: 'itemClassIfication' },
            { headerName: '작업품목코드', field: 'itemCode' },
            { headerName: '작업품목명', field: 'itemName' },
            { headerName: '작업량', field: 'requiredAmount' },
        ],
    }


    const workCompletion = () => {

        Axios.post("http://localhost:9102/quality/workorder/workcompletion", {
            workOrderInfo: list
        })
            .then(response => {
                props.refresh()
                Swal.fire({
                    icon: 'success',
                    title: '작업 성공',
                    timer: 1500
                })
                detailClose();
            })
            .catch(e => {
 
            });
    }

    const detailClose = () => {
        props.detailClose();
    }
    return (
        <MainCard
            content={false}
            title="원재료 검사"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign:'right'}}>
                <Button variant="contained" color="secondary" style={{ marginRight: "3vh" }} onClick={workCompletion}>검사 및 제작 완료</Button>
                <Button variant="contained" color="secondary" onClick={detailClose}>상세 닫기</Button>
            </Grid>
            }
        >
            <MyGrid
                column={column}
                list={list}
                rowSelection="single"
                size={'30vh'}
            >
            </MyGrid>
        </MainCard>
    );
}

export default worksitesearch;

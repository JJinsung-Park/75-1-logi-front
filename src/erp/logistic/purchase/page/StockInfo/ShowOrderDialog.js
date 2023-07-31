import React, { useState, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import orderListColumn from './orderListColumn';
import { setSearchOrderInfoListOnDelivery, setWarehousing } from './stockAxios';
import Swal from 'sweetalert2';
import * as api from '../../api';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import { Grid, Button } from '@mui/material';

const ShowOrderDialog = ({ close }) => {
    const [searchStockList, setSearchStockList] = useState([]);
    const [gridApi, setGridApi] = useState();
    useEffect(() => {
        setSearchOrderInfoListOnDelivery(setSearchStockList);
    }, []);

    const onClickWarehousing = () => {

        close();

        if (gridApi.getSelectedRows().map(el => el.inspectionStatus).includes('N')) {
            return Swal.fire({
                icon: 'error',
                title: '원재료검사 필요.'
            });
        }

        let orderNoList = gridApi.getSelectedRows().map(el => el.orderNo);
        for (let searchStock of searchStockList) {
            orderNoList.push(searchStock.orderNo);
        }

        if (orderNoList.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: '입고 가능한 발주품목이 없습니다.'
            });
        }

        if (gridApi.getSelectedRows().map(el => el.orderSlipStatus).includes('N')) {
            return Swal.fire({
                icon: 'error',
                title: '결재 승인이 필요합니다.'
            });
        }

        setWarehousing(orderNoList);
    };

    const onClickInspection = () => {
        const orderNoList = gridApi.getSelectedRows().map(el => el.orderNo).join(",");
        const process = async (param) => {


            if (gridApi.getSelectedRows().map(el => el.orderSlipStatus).includes('N')) {
                close();
                return Swal.fire({
                    icon: 'error',
                    title: '결재 승인이 필요합니다.'
                });
            }

            try {
                await api.inspection(param);
                close();
                Swal.fire({
                    icon: 'success',
                    title: '원재료검사 완료'
                });
            } catch (e) {
                alert(e.message);
            }
        }

        process(orderNoList);
    }

    const onGridReady = param => {
        setGridApi(param.api);
    }
    return (
        <MainCard
            content={false}
            title="발주 품목 입고"
            secondary={
                <>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            style={{ marginRight: '1vh' }}
                            onClick={onClickInspection}
                            color="secondary"
                        >
                            원재료검사
                        </Button>
                        <Button
                            variant="contained"
                            style={{ marginRight: '1vh' }}
                            onClick={onClickWarehousing}
                            color="secondary"
                        >
                            입고
                        </Button>
                    </Grid>
                </>
            }
        >
            <MyGrid
                column={orderListColumn}
                list={searchStockList}
                rowSelection="single"
                api={onGridReady}
            >
            </MyGrid>
        </MainCard>
    );
};

export default ShowOrderDialog;

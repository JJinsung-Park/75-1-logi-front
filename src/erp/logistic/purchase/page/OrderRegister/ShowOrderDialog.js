import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import moment from 'moment';
import showOrderColumn from './showOrderColumn';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'template/ui-component/cards/MainCard';
const ShowOrderDialog = ({ girdData, close, onClickGetOrderList, mrpGatheringNoList }) => {
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [orderDay, setOrderDay] = useState(today);

    const onChange = useCallback(e => {
        setOrderDay(e.target.value);
    }, []);

    const onClickOrder = useCallback(
        e => {


            axios
                .get('http://localhost:9102/purchase/order/dialog', {
                    params: {
                        mrpGatheringNoList: mrpGatheringNoList.join(',')
                    }
                })
                .then(({ data }) => {
                    if (data.errorCode < 0) {
                        return Swal.fire({
                            icon: 'error',
                            title: data.errorMsg
                        });
                    }
                    Swal.fire({
                        icon: 'success',
                        title: data.errorMsg
                    });
                    onClickGetOrderList();

                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: e
                    });
                });

            close();
        },
        [close, mrpGatheringNoList, onClickGetOrderList]
    );
    return (
        <>
            <MainCard
                content={false}
                title={'주문'}
                secondary={
                    <>
                        <TextField
                            label="주문일"
                            type={'date'}
                            value={orderDay}
                            onChange={onChange}
                            style={{ marginRight: '1vh' }}
                        />
                        <Button
                            variant="contained"
                            style={{ marginRight: '1vh' }}
                            onClick={onClickOrder}
                            color="secondary"
                        >
                            현재 전개된 결과 발주 및 재고처리
                        </Button>
                    </>
                }
            >
                <MyGrid
                    column={showOrderColumn}
                    list={girdData}
                    rowSelection="multiple"
                >
                </MyGrid>
            </MainCard>
        </>
    );
};
export default ShowOrderDialog;

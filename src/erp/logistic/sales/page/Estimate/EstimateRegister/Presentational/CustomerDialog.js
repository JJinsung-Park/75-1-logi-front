import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from 'template/ui-component/cards/MainCard';

const CustomerDialog = props => {
    const [list, setList] = useState([]);
    const column = {
        columnDefs: [
            { headerName: '상세코드번호', field: 'customerCode', width: 100 },
            { headerName: '상세코드이름', field: 'customerName', width: 100 }
        ]
    };

    const [customer, searchCustomerFetch] = useAsync(() =>api.searchCustomer(), [], false);
    const onCellClicked = params => {
       
        props.onCellClicked(params);
        props.close();
    };
    /*
    useEffect(() => {
        Axios.get('http://localhost:8282/hr/basicInfo/searchCustomer', {
            params: {
                searchCondition: 'ALL',
                workplaceCode: ''
            }
        })
            .then(response => {
                setList(response.data.gridRowJson);
                
            })
            .catch(e => {
                
            });
    }, []);
*/
    return (
        <MainCard
        content={false}
        title="거래처 검색"
        >
        <MyGrid
            style={{ height: '10vh' }}
            column={column}
            //title={'거래처 검색'}
            list={customer.data ? customer.data.gridRowJson : null}
            onCellClicked={onCellClicked}
            rowSelection="single"
        /></MainCard>
    );
};

export default CustomerDialog;

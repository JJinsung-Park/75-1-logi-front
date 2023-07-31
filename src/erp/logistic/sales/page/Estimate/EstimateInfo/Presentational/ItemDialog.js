import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from 'template/ui-component/cards/MainCard';

const ItemDialog = props => {
    const [list, setList] = useState([]);
    const column = {
        columnDefs: [
            { headerName: '품목코드', field: 'itemCode', width: 100 },
            { headerName: '품목명', field: 'itemName', width: 100 }
        ]
    };

    const onCellClicked = params => {

        props.onCellClicked(params);
        props.close();
    };
    
    const [item, searchItemFetch] = useAsync(() =>api.searchItem(), [], false);

    let renameDetailCodeList = null;
    if(item.data){
    let detailCodeList = item.data.codeList;


    renameDetailCodeList = detailCodeList.map(item => {
        let rename = [];
        rename.itemCode = item.detailCode;
        rename.itemName = item.detailCodeName;
        return rename;
    });
}

    return (
        <MainCard
        content={false}
        title="품목명 검색"
        >
        <MyGrid
            style={{ height: '10vh' }}
            column={column}
            //title={'품목명 검색'}
            list={renameDetailCodeList}
            onCellClicked={onCellClicked}
            rowSelection="single"
        /></MainCard>
    );
};

export default ItemDialog;

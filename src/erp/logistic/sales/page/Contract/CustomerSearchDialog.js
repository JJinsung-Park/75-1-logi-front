import React, {useState} from 'react';
import * as Api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import MyGrid from "../../../../../util/LogiUtil/MyGrid";

function CustomerSearchDialog(props) {

    const column = {
        columnDefs: [
            { headerName: '코드', field: 'detailCode', width: 100 },
            { headerName: '코드명', field: 'detailCodeName', width: 100 },
            { headerName: '사용여부', field: 'codeUseCheck', width: 50 }
        ]
    };

    const [list, searchListFetch] = useAsync(() => Api.searchDialogCustomer(),[],false);


    return (
        <>
            <MainCard content={false} title={"거래처 검색"}/>
            <MyGrid
                style={{ height: '10vh' }}
                column={column}
                list={list.data&&list.data.codeList}
                onCellClicked={props.onCellClicked}
                rowSelection="single"
            />
        </>
    );
}

export default CustomerSearchDialog;
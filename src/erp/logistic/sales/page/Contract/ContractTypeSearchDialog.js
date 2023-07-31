import React from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import * as Api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function ContractTypeSearchDialog(props) {

    const column = {
        columnDefs: [
            { headerName: '유형 코드', field: 'detailCode', width: 100 },
            { headerName: '유형', field: 'detailCodeName', width: 100 },
            { headerName: "사용여부", field: "codeUseCheck", width:50},
        ]
    };
    const onCellClicked = params => {
       
        props.onCellClicked(params);
        props.close();
    };



    const [list, searchListFetch] = useAsync(() => Api.searchContractType(),[],false);

    return (
        <MainCard
            content={false}
            title="수주유형"
        >
            <MyGrid
                style={{ height: '10vh' }}
                column={column}
                list={list.data&&list.data.codeList}
                onCellClicked={onCellClicked}
                rowSelection="single"
            />
        </MainCard>
    );
}

export default ContractTypeSearchDialog;
import { Button } from '@mui/material';
import React, { useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import MainCard from "../../../../../template/ui-component/cards/MainCard";

function ContractDetailSearch(props) {
    const list = props.list;
    const [detailGrid, setDetailGrid] = useState();

    const column = {
        columnDefs: [
            { headerName: '수주상세일련번호', field: 'contractDetailNo', hide: true },
            { headerName: '수주일련번호', field: 'contractNo' },
            { headerName: '품목코드', field: 'itemCode', hide: true },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfContract' },
            { headerName: '납기일', field: 'dueDateOfContract' },
            { headerName: '수주수량', field: 'estimateAmount' },
            { headerName: '재고사용량', field: 'stockAmountUse' },
            { headerName: '필요제작수량', field: 'productionRequirement' },
            {
                headerName: '단가',
                field: 'unitPriceOfContract',
                cellRenderer: function(params) {
                    var num = params.value + '';
                    var point = num.length % 3;
                    var len = num.length;
                    var str = num.substring(0, point);
                    while (point < len) {
                        if (str != '') str += ',';
                        str += num.substring(point, point + 3);
                        point += 3;
                    }
                    return str;
                }
            },
            {
                headerName: '합계액',
                field: 'sumPriceOfContract',
                cellRenderer: function(params) {
                    var num = params.value + '';
                    var point = num.length % 3;
                    var len = num.length;
                    var str = num.substring(0, point);
                    while (point < len) {
                        if (str != '') str += ',';
                        str += num.substring(point, point + 3);
                        point += 3;
                    }
                    return str;
                }
            },
            { headerName: '처리상태', field: 'processingStatus' },
            { headerName: '작업완료여부', field: 'operationCompletedStatus' },
            { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
            { headerName: '비고', field: 'description', hide: true },
            { headerName: '상태', field: 'status', hide: true },
            { headerName: '상태2', field: 'beforeStatus', hide: true }
        ]
    };

    const api = params => {
       
        setDetailGrid(params.api);
    };

    const detailClose = () => {
        props.detailClose();
    };

    return (
        <>
        <MainCard
            content={false}
            title="수주상세"
        >
        <MyGrid
            column={column}
            list={list}
            rowSelection="multiple"
            api={api}
            size={'50vh'}
        >
            <Button variant="contained" color="secondary" onClick={detailClose} style={{marginRight:'2vh'}}>
                상세 닫기
            </Button>
        </MyGrid>
        </MainCard>
        </>
    );
}

export default ContractDetailSearch;

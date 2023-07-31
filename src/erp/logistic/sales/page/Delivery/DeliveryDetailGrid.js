import { Button } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';

function DeliveryDetailGrid(props) {
    const list = props.list;
    const [detailGrid, setDetailGrid] = useState();

    const column = {
        columnDefs: [
            { headerName: '수주상세일련번호', field: 'contractDetailNo', checkboxSelection: true },
            { headerName: '수주일련번호', field: 'contractNo', hide: true },
            { headerName: '품목코드', field: 'itemCode', hide: true },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfContract' },
            { headerName: '납기일', field: 'dueDateOfContract' },
            { headerName: '수주수량', field: 'estimateAmount' },
            { headerName: '재고사용량', field: 'stockAmountUse' },
            { headerName: '필요제작수량', field: 'productionRequirement' },
            { headerName: '단가', field: 'unitPriceOfContract' },
            { headerName: '합계액', field: 'sumPriceOfContract' },
            { headerName: '처리상태', field: 'processingStatus' },
            { headerName: '작업완료여부', field: 'operationCompletedStatus' },
            { headerName: '납품완료여부', field: 'deliveryCompletionStatus' },
            { headerName: '비고', field: 'description', hide: true },
            { headerName: '상태', field: 'status', hide: true },
            { headerName: '상태2', field: 'beforeStatus', hide: true }
        ]
    };

    const api = useCallback(params => {
        setDetailGrid(params.api);
        props.detailApi(params);
    },[props]);

    const detailClose = () => {
        props.detailClose();
    };

    const onCellClicked = params => {
       
        props.updateDetail(params.data.contractDetailNo);
    };
    return (
        <MyGrid
            column={column}
            title={'수주 상세 조회'}
            list={list}
            rowSelection="single"
            api={api}
            size={'30vh'}
            onCellClicked={onCellClicked}
        >
            <Button variant="contained" color="secondary" onClick={detailClose}>
                상세 닫기
            </Button>
        </MyGrid>
    );
}

export default DeliveryDetailGrid;

import { Button } from '@mui/material';
import React from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';

function ContractRegistDetail(props) {
    const column = {
        columnDefs: [
            { headerName: '견적상세일련번호', field: 'estimateDetailNo', suppressSizeToFit: true },
            { headerName: '품목코드', field: 'itemCode', suppressSizeToFit: true, editable: true },
            { headerName: '품목명', field: 'itemName' },
            { headerName: '단위', field: 'unitOfEstimate' },
            {
                headerName: '납기일',
                field: 'dueDateOfEstimate',
                editable: true,
                cellRenderer: function(params) {
                    if (params.value == '') {
                        params.value = 'YYYY-MM-DD';
                    }
                    return '📅 ' + params.value;
                },
                cellEditor: 'datePicker'
            },
            { headerName: '견적수량', field: 'estimateAmount' },
            { headerName: '견적단가', field: 'unitPriceOfEstimate' },
            { headerName: '합계액', field: 'sumPriceOfEstimate' },
            { headerName: '비고', field: 'description' }
        ]
    };

    const detailClose = () => {
        props.detailClose();
    };

    return (
        <MyGrid column={column} size={'50vh'} list={props.detailList}>
            <Button variant="contained" color="secondary" onClick={detailClose} style={{marginRight:'2vh'}}>
                상세 닫기
            </Button>
        </MyGrid>
    );
}

export default ContractRegistDetail;
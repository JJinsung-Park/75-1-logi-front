const mpscolumn = {
    columnDefs: [
        {
            headerName: "주생산계획번호", field: "mpsNo", width: 200, suppressSizeToFit: true, headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: true, suppressRowClickSelection: true,
            checkboxSelection: true
        },
        {headerName: "계획구분", field: "mpsPlanClassification", width: 150},
        {headerName: '일련번호(수주/판매)', width: 180, field: 'no', hide: true},
        {headerName: '수주상세일련번호', field: 'contractDetailNo'},
        {headerName: '판매계획일련번호', field: 'salesPlanNo', hide: true},
        {headerName: '품목코드', field: 'itemCode', width: 120},
        {headerName: '품목명', field: 'itemName', width: 120},
        {headerName: '단위', field: 'unitOfMps', width: 80},
        {
            headerName: "계획일자", field: "mpsPlanDate", width: 120
        },
        {
            headerName: "출하예정일", field: "scheduledEndDate", width: 120
        },
        {headerName: '계획수량', field: 'mpsPlanAmount', width: 120, cellStyle: {'textAlign': 'center'}},
        {headerName: '납기일', field: 'dueDateOfMps', width: 120},
        {headerName: '예정마감일자', field: 'scheduledEndDate', width: 120},
        {
            headerName: 'MRP 적용상태', field: 'mrpApplyStatus', cellRenderer: (params) => {
                if (params.value == 'Y') {
                    params.node.selectable = false;
                    return params.value = "🟢";
                }
                return '❌';
            }
        },
        {headerName: '비고', field: 'description', width: 80},
    ]
}

export default mpscolumn;

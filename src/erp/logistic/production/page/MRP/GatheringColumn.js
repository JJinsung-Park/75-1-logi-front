const gatheringcolumn={
    columnDefs :[

        {headerName: "구매 및 생산여부", field: "orderOrProductionStatus"},
        {headerName: "품목코드", field: "itemCode"},
        {headerName: '품목명', field: 'itemName'},
        {headerName: '단위', field: 'unitOfMrpGathering', },
        {
            headerName: '발주/작업지시기한',
            field: 'claimDate',
        },
        {
            headerName: '발주/작업지시완료기한',
            field: 'dueDate',

        },
        {headerName: '필요수량', field: 'necessaryAmount',}

    ]
}
export default gatheringcolumn;
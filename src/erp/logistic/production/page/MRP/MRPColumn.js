const mrpcolumn = {

    columnDefs : [
        {headerName: '주생산계획번호', field: 'mpsNo'},
        {headerName: 'BOM번호', field: 'bomNo'},
        {headerName: '품목구분', field: 'itemClassification'},
        {headerName: '품목코드', field: 'itemCode'},
        {headerName: '품목명', field: 'itemName'},
        {headerName: '발주/작업지시 기한', field: 'orderDate'},
        {headerName: '발주/작업지시완료기한', field: 'requiredDate'},
        {headerName: '계획수량', field: 'planAmount'},
        {headerName: '누적손실율', field: 'totalLossRate'},
        {headerName: '계산수량', field: 'caculatedAmount'},
        {headerName: '계산수량', field: 'requiredAmount'},
        {headerName: '단위', field: 'unitOfMrp'},
    ]

}
export default mrpcolumn;
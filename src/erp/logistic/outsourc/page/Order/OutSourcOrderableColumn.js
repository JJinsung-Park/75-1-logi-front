const outdourcorderablecolumn={
columnDefs :[
    {headerCheckboxSelection: true, checkboxSelection: true },
    {headerName: "MRP 취합 번호", field: "mrpGatheringNo", checkBoxSelection:true},
    {headerName: "구매 및 생산여부", field: "orderOrProductionStatus"},
    {headerName: "품목코드", field: "itemCode"},
    {headerName: '품목명', field: 'itemName'},
    {headerName: '단위', field: 'unitOfMrpGathering'},
    {
        headerName: '발주/작업지시기한',
        field: 'claimDate',
    },
    {
        headerName: '발주/작업지시완료기한',
        field: 'dueDate',
       
    },
    {headerName: '필요수량', field: 'necessaryAmount' },
    {headerName: '외주지시수량', field: 'outsourcAmount', editable:true},
    { headerName: "외주단가", field: "unitPriceOfOutsourc"},
    { headerName: "합계액", field: "sumPriceOfOutsourc"},


]
}
export default outdourcorderablecolumn;
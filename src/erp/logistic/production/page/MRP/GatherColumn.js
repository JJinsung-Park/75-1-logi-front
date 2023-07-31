const gathercolumn =


    [
        {
            headerName: "소요량전개번호", field: "mrpNo"
        },
        {headerName: "주생산계획번호", field: "mpsNo"},
        {headerName: '품목분류', field: 'itemClassification',},
        {headerName: '품목코드', field: 'itemCode'},
        {headerName: '품목명', field: 'itemName'},
        {headerName: '발주/작업지시 기한', field: 'orderDate', cellRenderer: function (params) {
                if (params.value == null) {
                    params.value = "";
                }
                return '📅 ' + params.value;
            }},
        {headerName: '발주/작업지시완료기한', field: 'requiredDate', cellRenderer: function (params) {
                if (params.value == null) {
                    params.value = "";
                }
                return '📅 ' + params.value;
            }},
        {headerName: '필요수량', field: 'requiredAmount'},
        {headerName: '단위', field: 'unitOfMrp'},
    ]

export default gathercolumn;

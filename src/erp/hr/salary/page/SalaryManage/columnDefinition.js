import {formatNumber} from '../../util/lib'
const columnDefinition = [
    {
        headerName: "사원코드",
        field: "empCode",
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
    { headerName: "부서코드", field: "deptCode" , hide: true},
    { headerName: "적용연월", field: "applyYearMonth" , hide: true},
    { headerName: "총 급여", field: "salary" , valueFormatter: formatNumber+'원' },
    { headerName: "연차미사용수당", field: "unusedDaySalary" , valueFormatter: formatNumber+'원'  },
    { headerName: "경비지급액", field: "cost" , valueFormatter: formatNumber+'원'  },
    { headerName: "초과수당 합계", field: "totalExtSal" , valueFormatter: formatNumber+'원'  },
    { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: formatNumber+'원'  },
    { headerName: "차인지급액", field: "realSalary" , valueFormatter: formatNumber+'원'  },
    { headerName: "실지급액", field: "totalPayment" , hide: true},
    { headerName: "마감여부", field: "finalizeStatus" }    
];
export default columnDefinition;

import {formatNumber} from 'erp/hr/util/lib'
const columnDefinition = [
    { headerName: "적용연월", field: "applyYearMonth" },
    { headerName: "사원코드",field: "empCode" },
    { headerName: "기본급", field: "basicSalary" , valueFormatter: formatNumber },
    { headerName: "직책수당", field: "positionSalary" ,},
    { headerName: "가족수당", field: "familySalary" , valueFormatter: formatNumber  },
    { headerName: "식대", field: "foodSalary" , valueFormatter: formatNumber  },
    { headerName: "마감여부", field: "finalizeStatus" },
    { headerName: "초과수당 합계", field: "overWorkSalary" , valueFormatter: formatNumber  },
    { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: formatNumber  },
    { headerName: "차인지급액", field: "realSalary" , valueFormatter: formatNumber  },
    { headerName: "실지급액", field: "totalPayment" , hide: true}
  
];

export default columnDefinition;
import {formatNumber} from 'erp/hr/util/lib'
const columnDefinition = [
    // { headerName: "적용연월", field: "applyYearMonth" },
    // { headerName: "사원코드",field: "empCode",sortable: true,resizable: true },
    // { headerName: "부서코드", field: "deptCode" , hide: true},
    // { headerName: "총 급여", field: "salary" , valueFormatter: formatNumber },
    // { headerName: "연차미사용수당", field: "unusedDaySalary" , valueFormatter: formatNumber  },
    // { headerName: "경비지급액", field: "cost" , valueFormatter: formatNumber  },
    // { headerName: "초과수당 합계", field: "totalExtSal" , valueFormatter: formatNumber  },
    // { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: formatNumber  },
    // { headerName: "차인지급액", field: "realSalary" , valueFormatter: formatNumber  },
    // { headerName: "실지급액", field: "totalPayment" , hide: true},
    // { headerName: "마감여부", field: "finalizeStatus" }
    { headerName : "사원코드", field : "empCode" ,width:100}, 
		{ headerName : "사원명", field : "empName" ,width:100}, 
		{ headerName : "부서", field : "deptCode" ,width:100}, 
		{ headerName : "직급", field : "position" }, 
		{ headerName : "성과급", field : "awardsSalary" },
		{ headerName : "등급", field : "grade" }
];
export default columnDefinition;
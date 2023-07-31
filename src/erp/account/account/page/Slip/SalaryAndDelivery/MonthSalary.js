import React, { useState,useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { useDispatch, useSelector} from "react-redux";
import { SEARCH_MONTH_SALARY_LIST_REQUEST } from "erp/hr/salary/saga/SearchMonthSalSaga";
import {thisYear} from "erp/account/util/lib"
import Select from "react-select";
import {
    List,
    DialogActions,
    Button,
    FormControl,
    MenuItem
} from "@material-ui/core";

const MonthSalary = (props) => {
    const [date, setDate] = useState("");
    const [positionGridApi, setPositionGridApi] =React.useState();
    const data = useSelector(({HrReducer})=>HrReducer.monthSalary,[]);
    const dispatch = useDispatch();

    const [journalLists, setJournalLists] = useState([
        //분개는 단 두가지만 표현한다 현금/ 공제금액 그리고 이부분들은 set을 사용하면 작동안된다.
        {
            journalNo: "NEW JOURNAL", // 여기서 분개 번호가 만들어짐.
            slipNo: "NEW",
            balanceDivision: "차변",
            accountCode: "0603", //급여는 노무비로 넣었다.
            accountName: "급여",
            customerCode: null,
            leftDebtorPrice: "", // 차변
            rightCreditsPrice: 0, // 대변
        },
        {
            journalNo: "NEW JOURNAL",
            slipNo: "NEW",
            balanceDivision: "대변",
            accountCode: "0101", //급여에 대한 현금
            accountName: "현금",
            customerCode: null,
            leftDebtorPrice: 0, // 차변
            rightCreditsPrice: "", // 대변
        },
        {
            journalNo: "NEW JOURNAL",
            slipNo: "NEW",
            balanceDivision: "차변",
            accountCode: "0621", //공제금을 세부적으로 구분하지 않고 보험료로 전표발행
            accountName: "보험료",
            customerCode: null,
            leftDebtorPrice: "", // 차변
            rightCreditsPrice: 0, // 대변
        },
        {
            journalNo: "NEW JOURNAL",
            slipNo: "NEW",
            balanceDivision: "대변",
            accountCode: "0101", //공제금에 대한 현금
            accountName: "현금",
            customerCode: null,
            leftDebtorPrice: 0, // 차변
            rightCreditsPrice: "", // 대변
        },
    ]);
    
    const onGridReady = params => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };
    const DatehandleChange = (newValue) => {setDate(newValue.value);};
    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { width: "100", headerCheckboxSelection: true, checkboxSelection: true, },
        { headerName: "사원코드", field: "empCode" },
        { headerName: "적용연월", field: "applyYearMonth" , hide: true},
        { headerName: "총 급여", field: "salary" , valueFormatter: currencyFormatter },
        { headerName: "연차미사용수당", field: "unusedDaySalary" , valueFormatter: currencyFormatter  },
        { headerName: "경비지급액", field: "cost" , valueFormatter: currencyFormatter  },
        { headerName: "초과수당 합계", field: "totalExtSal" , valueFormatter: currencyFormatter  },
        { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: currencyFormatter  },
        { headerName: "차인지급액", field: "realSalary" , valueFormatter: currencyFormatter  },
        { headerName: "실지급액", field: "totalPayment" , hide: true},
        { headerName: "마감여부", field: "finalizeStatus" }
    ]
//========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
    // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
    // onClose안에 객체(data, division) 을 가지고 AccountSearch 컴포넌트로 감.

    // onclick 에 handleClose 실행되면서 close 함수호출

    function currencyFormatter(params) {
        return formatNumber(params.value) + " 원";
    }

    function formatNumber(number) {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    const SumSalary=()=>{

        const salaryRows= positionGridApi.getSelectedRows();
        var realSalary=0;
        var totalDeduction=0;

        if(salaryRows.length===0){
            alert("선택된 값이 없습니다")
            return;
        }
        

        for(var i=0; i<salaryRows.length; i++){

            if(salaryRows[i].finalizeStatus==='Y'){
                alert("마감여부 확인 바랍니다")
                return;
            }
            realSalary+=parseInt(salaryRows[i].realSalary);
            totalDeduction+=parseInt(salaryRows[i].totalDeduction)

        }
        const newJournal = journalLists.map((journalState, index) => {
            switch (index) {
                case 0:
                    return {
                        ...journalState,
                        leftDebtorPrice: realSalary,
                    };

                case 1:
                    return {
                        ...journalState,
                        rightCreditsPrice: realSalary,
                    };

                case 2:
                    return {
                        ...journalState,
                        leftDebtorPrice: totalDeduction,
                    };

                case 3:
                    return {
                        ...journalState,
                        rightCreditsPrice: totalDeduction,
                    };

                default:
                    return { ...journalState };
            }
        });
        

        props.close({
            newJournal,
            salaryRows,
            division: "Salary",
        });
    };
    const selectData = async () => {//월별 급여조회 호출
        await dispatch({
            type: SEARCH_MONTH_SALARY_LIST_REQUEST,
            payload: {
                applyYearMonth: date,
                deptCode:'ALL'
            },
        });

    };

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            borderBottom: "1px dotted pink",
            color: state.selectProps.menuColor,
            padding: 20,
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = "opacity 300ms";

            return { ...provided, opacity, transition };
        },
    };

    return(
        <div>
            <List>
                <div Align="center">
                    <FormControl style={{ minWidth: "250px" }}>
                        <Select
                            styles={customStyles}
                            onChange={DatehandleChange}
                            options={thisYear()}
                            placeholder="값을 선택해주세요"
                        >
                            <MenuItem value="ALL">전체부서</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        startIcon={<SearchIcon />} //아이콘
                        onClick={selectData}

                    >
                        검색
                    </Button>
                </div>
                <div
                    className={"ag-theme-material"} //그리드 모양
                    style={{
                        height: "540px",
                        width: '100%',

                        paddingTop: "8px",
                    }}
                >
                    <AgGridReact
                        columnDefs={accountColumnDefs} //컬럼명
                        rowSelection="multiple" // 하나만 선택 가능.
                        getRowStyle={function (param) { return { "text-align": "center" }; }} //body 가운데 정렬
                        onGridReady={onGridReady}

                        rowData={data}
                        suppressRowClickSelection={true}
                    />
                </div>
            </List>
            <div>
                <DialogActions>
                    <Button onClick={SumSalary} color="primary">
                        임금마감
                    </Button>
                </DialogActions>
            </div>
        </div>

    )
}
export default MonthSalary;

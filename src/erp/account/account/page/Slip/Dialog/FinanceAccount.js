import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useThemeSwitcher } from "mui-theme-switcher";

//=============================== 2020-09-10 거래처관리 조편백 ======================================
const FinanceAccount = props => {
    const [data, setData] = useState(null); //useEffect 로 조회한 결과값 받는 상태 값

    //===================== useEffect로 비동기적으로 동작  ========================================

    //컴포넌트가 마운트 됐을 때 호출됨
    useEffect(() => {
        NormalAccountList(); // 함수호출
    }, []);

    function NormalAccountList() {
        axios
            .get("http://localhost:8282/acc/base/customers")
            .then(response => {
                setData(response.data);
            })
            .catch(e => {
                
            });
    }
    //=============================== ag_grid 시작 ================================================

    const FinanceAccountGrid = [
        // 칼럼정의
        { headerName: "금융 거래처코드", field: "customerCode" },
        { headerName: "금융거래처명", field: "customerName" },
    ];
    //=================================== ag Grid 초기화 시 실행 ===================================
    const onGridReady = params => {
        params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };
    //=================================================== 셀클릭시 =========================================
    const onCellClicked = params => {
        const Rows = params.api.getSelectedRows(); //선택한 전표 Grid row 1줄을 들고옴
        props.handleFinanceRow(Rows); // 선택한 전표그리드 slipNo 로 분개 그리드 띄움
    };

    const { dark } = useThemeSwitcher();

    return (
        <>
            <div
                className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
                skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"
                rowStyle={{ "text-align": "center" }}
                style={{
                    height: "400px",
                    width: "100%",
                    paddingTop: "8px",
                }}
            >
                <AgGridReact
                    columnDefs={FinanceAccountGrid} //정의된 컬럼
                    rowData={data} //Reduce에서 받아온 데이터
                    rowSelection="single" //하나만 선택하거나 복수개를 선택할 수 있음
                    onGridReady={onGridReady} //onload 이벤트와 유사한 것
                    getRowStyle={function(param) {
                        return { "text-align": "center" };
                    }} //body 가운데 정렬
                    onCellClicked={onCellClicked} //셀 클릭
                />
            </div>
        </>
    );
};

export default FinanceAccount;

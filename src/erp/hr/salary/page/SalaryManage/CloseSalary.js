import React, { useState } from "react";
import useMonth from "erp/hr/util/useMonth";
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import { Button, FormControl, AppBar, Toolbar, Typography } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import SearchIcon from "@material-ui/icons/Search";
//**************************2020-08-20 63기 손유찬 수정 ********************************* 


//ag그리드 숫자형식 변환 함수 끝
const CloseSalary = ({
  handleChange,
  salaryList,
  findCloseSalary,
  setEvent,
  closeSalaryWithSlipRequest,
  makeJournal
}) => {

  var [positionGridApi, setPositionGridApi] = useState([]); // 바뀌는 상태 값을 관리함
  const [empCodes, setEmpCodes] = useState();

  //=================================================== ag Grid 초기화 시 실행 =========================================
  const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit();   // 칼럼 사이즈 자동조절
  };


  //마감버튼 
  const callCloseSalary = () => {

    const empcode1 = positionGridApi.getSelectedRows(); //선택한 row  
    if (empcode1.length === 0) {
      alert("선택된것이 없습니다.");
      return;
    } if (!window.confirm(" 마감 하시겠습니까 ? ")) {
      alert(" 취소 ");
      return;
    }
    if (empcode1.length !== 0) {
      for (var i = 0; i < empcode1.length; i++) {
        if (empcode1[i].finalizeStatus === "Y") {
          alert("마감처리가 이미 완료되었습니다.");
          return;
        } else {
          empcode1[i].finalizeStatus = "Y";
        }
      }
      closeSalaryWithSlipRequest({ empcode1 });
    }

    //closeSalaryWithSlipRequest({ empcode1 });
    makeJournal(empcode1);


  };


  const state = {
    columnDefs: [
      {
        headerName: "사원코드",
        field: "empCode",
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      { headerName: "적용월", field: "applyYearMonth", hide: true },
      {
        headerName: "기본급", field: "salary",
        valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
      },
      { headerName: "심야근무시간", field: "cost" },
      { headerName: "휴일근무일수", field: "unusedDaySalary" },
      { headerName: "추가수당", field: "totalExtSal", valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"', },
      { headerName: "총급여", field: "totalPayment", valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"', },
      { headerName: "공제금액", field: "totalDeduction", valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"', },
      { headerName: "실지급금", field: "realSalary", valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"', },
      { headerName: "마감상태", field: "finalizeStatus" },
      { headerName: "부서코드", field: "deptCode", hide: true },
    ],
    rowSelection: "multiple",
    rowData: salaryList,
  };

  const set1 = useMonth();

  const selectedDeptd = [
    {
      value: "DPT-01",
      label: "총무부",
    },
    {
      value: "DPT-02",
      label: "영업부",
    },
    {
      value: "DPT-03",
      label: "생산부",
    },
  ];

  return (
    <div>
      <div>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5">월급여 마감</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />

      <br />
      <FormControl style={{ minWidth: "300px" }}></FormControl>
      <FormControl style={{ maxWidth: "600px" }}></FormControl>
      <FormControl style={{ minWidth: "250px" }}>
        <Select
          onChange={handleChange}
          name="dept"
          // onInputChange={handleInputChange}
          placeholder="부서를 선택해주세요"
          options={selectedDeptd}
          style={{
            width: "500px",
          }}
        ></Select>
      </FormControl>

      <FormControl style={{ Width: "600px" }}> </FormControl>
      <FormControl style={{ minWidth: "250px" }}>
        <Select
          onChange={handleChange}
          name="date"
          // onInputChange={handleInputChange}
          placeholder="날짜를 선택해주세요"
          options={set1.selectedmonth}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SearchIcon />}
        onClick={findCloseSalary}
      >
        조회
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<InputIcon />}
        onClick={callCloseSalary}
      >
        마감
      </Button>
      <br />
      <br />
      <br /> 
      <div
        className="ag-theme-material"
        style={{
          height: "600px",
          width: "100%",
          textAlign: "center"
        }}
      >
        <br />
        <AgGridReact
          suppressRowClickSelection={true}
          columnDefs={state.columnDefs}
          rowData={state.rowData}
          rowSelection={state.rowSelection}
          onGridReady={onGridReady} //onload 이벤트와 유사한 것
        ></AgGridReact>
      </div>
    </div>
  );
};
export default CloseSalary;
//**************************2020-08-20 63기 손유찬 수정 *********************************
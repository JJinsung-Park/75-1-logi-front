import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import CloseSalary from "./CloseSalary";
import { connect, useDispatch } from "react-redux";
import {
  salaryListRequest,
  closeSalaryWithSlipRequest,
} from "erp/hr/salary/saga/CloseSalarySaga";
import { selectSalaryList, selectedErrorCD } from "./selector";
import { insertSalarySlipStart } from "erp/account/account/reducer/AccountReducer";
import useDate from "./useDate";

const CloseSalaryContainer = props => {
  const {
    salaryList,
    salaryListRequest,
    closeSalaryWithSlipRequest,
    flag, //이건 마감이후 전표발행으로 바로 넘어갈때 마감에서 에러가 발생했을때 전표발행을 막기위한 일종의 표식
  } = props;

  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [dept, setDept] = useState("");
  const [empCodes, setEmpCodes] = useState();
  const [event, setEvent] = useState();
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

  const [slipData, setSlipData] = useState([
    {
      slipNo: "NEW", // 전표 번호 생성
      slipType: "대체",
      accountPeriodNo: "4", //이건 나중에 알아서 수정
      reportingDate: useDate(),
      reportingEmpCode: sessionStorage.getItem("empCodeInfo_token"), // session단위로 올라간 empCode
      reportingEmpName: sessionStorage.getItem("empNameInfo_token"),
      slipStatus: "미결",
      deptCode: sessionStorage.getItem("deptCodeInfo_token"), // session단위로 올라간 deptCode
      journalList: [],
    },
  ]);

  //전표발행 
  const makeJournal = empcode1 => {
    //체크된 월급여 데이터를 가지고 전표발행을 위한 데이터 등록
    const realSalary = empcode1.reduce((stack, el) => {
      return stack + parseInt(el.realSalary);
    }, 0);
    const totalDeduction = empcode1.reduce((stack, el) => {
      return stack + parseInt(el.totalDeduction);
    }, 0);

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
    const slip = slipData.map(newSlip => {
      return {
        ...newSlip,
        journalList: newJournal,
      };
    });



    slipDataInsert(slip);
  };

  const slipDataInsert = (slip) => {
    props.insertSalarySlipStart({ slipData: slip });
  };


  //부서,날짜 상태값이 바뀔때마다 state에 변경된값 입력 
  const handleChange = (event, actionMeta) => {
    if (actionMeta.name === "dept") {
      setDept(event.value);
    } else {
      setDate(event.value);
    }
  };


  //조회버튼 시작 
  function findCloseSalary() {
    if (dept.length === 0) {
      alert(" 부서를 선택해주세요 ");
      return;
    } else if (date.length === 0) {
      alert(" 조회할 월을 선택해주세요 ");
      return;
    } else {
      salaryListRequest({ date, dept });
    }
  }




  return (
    <div>
      <CloseSalary
        handleChange={handleChange}
        salaryList={salaryList}
        findCloseSalary={findCloseSalary}
        setEvent={setEvent}
        empCodes={empCodes}
        closeSalaryWithSlipRequest={closeSalaryWithSlipRequest}
        makeJournal={makeJournal}
      />
    </div>
  );
};


// 리덕스의 store가 이거로 react의 props로 넘어감
const mapStateToProps = createStructuredSelector({
  salaryList: selectSalaryList,
  flag: selectedErrorCD,
});


// 리액트와 스토어가 소통하는 구간
export default connect(mapStateToProps, {
  salaryListRequest,
  closeSalaryWithSlipRequest,
  insertSalarySlipStart,
})(CloseSalaryContainer);
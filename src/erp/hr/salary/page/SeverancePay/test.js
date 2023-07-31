범석
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { formatNumber } from 'erp/hr/util/lib'
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'
import { thisYear } from 'erp/hr/util/lib'
import { FormControl } from "@material-ui/core";
import Axios from 'axios';
import { bindActionCreators } from 'redux';

export const SeveranceContainer = () => {
    const columnDefinition = [
        { headerName: "적용연월", field: "hiredate" },
        { headerName: "사원명", field: "empName", sortable: true, resizable: true },
        { headerName: "사원코드", field: "empCode", sortable: true, resizable: true },
        { headerName: "부서코드", field: "deptCode", hide: true },
        { headerName: "직위", field: "position", valueFormatter: formatNumber },
        { headerName: "퇴직금", field: "workingdate", valueFormatter: formatNumber },
        { headerName: "퇴직금", field: "retirementsalary", valueFormatter: formatNumber }
        // { headerName: "연차미사용수당", field: "unusedDaySalary" , valueFormatter: formatNumber  },
        // { headerName: "경비지급액", field: "cost" , valueFormatter: formatNumber  },
        // { headerName: "초과수당 합계", field: "totalExtSal" , valueFormatter: formatNumber  },
        // { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: formatNumber  },
        // { headerName: "차인지급액", field: "realSalary" , valueFormatter: formatNumber  },
        // { headerName: "실지급액", field: "totalPayment" , hide: true},
        // { headerName: "마감여부", field: "finalizeStatus" }    
    ];

    // 부서 selector 띄우기
    const dept = useEffect(() => {
        Axios.get(
            "http://localhost:9101/hr/base/deptList"
        ).then(({ data }) => {

            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })

            setSelectDeptData({
                ...selectDeptData, dept: [...selectDeptData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);



    //     Axios({
    //         method: 'GET',
    //         url: 'http://localhost:8282/hr/salary/affair/memberList.do',
    //         params: {
    //             value: 'DPT-01'
    //         }
    //     })
    //         .then(response => {
   
    //             //const list = response.data.baseInsureList;
    //             //insureListRequest({ insure: list });
    //         })
    //         .catch(e => {
    //             alert(e);
    //         });
    //

    const [selectDeptData, setSelectDeptData] = useState(
        {
            dept: [
                { key: '전체부서', value: 'ALL' }
            ]
        }
    );

    const [selectEmpData, setSelectEmpData] = useState(
        {
            emp: [
                { key: '사원번호', value: 'ALL' },
            ]
        }
    );



    const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value)
    const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value)
    const [rowData, setRowData] = useState([]);


    const selectHandleChange = useCallback((e) => {
 
        const selectValue = e.target.value;
        const selectName = e.target.name;
        if (selectName === '부서') {
            setSelectDeptTitle(selectValue);
        } else if (selectName === '사원번호') {
            setSelectEmpCode(selectValue)
        }

        Axios.get(
            "http://localhost:9101/hr/affair/memberList.do",
            {
                params: {
                    value: selectDeptTitle
                }
            }
        ).then(response => {
 
            const empList = response.data.list.map(e => {
                return {
                    key: e.empName,
                    value: e.empCode
                }
            })
            setSelectEmpData({
                ...selectEmpData, emp: [...selectEmpData.emp, ...empList]
            })
        }).catch(e => {
            alert(e);
        })
    }, []);

    return (
        <>
            <HrAppBar title="퇴직금 조회" />
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}
                    selectValue={selectDeptTitle}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectDeptData.dept} />
            </FormControl>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'사원번호'}
                    selectValue={selectEmpCode}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectEmpData.emp}
                />
            </FormControl>
            <MyGrid
                columnDefinition={columnDefinition}
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true} />
        </>
    )
};

// store가 업데이트될때마다 자동으로 호출된다
const mapStateToProps = state => ({
});



export default React.memo(SeveranceContainer);

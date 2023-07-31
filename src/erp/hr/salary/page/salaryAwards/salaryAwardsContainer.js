

import React, { useCallback, useEffect, useState } from 'react';
import { formatNumber } from 'erp/hr/util/lib'
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'

import Axios from 'axios';
import columnDefinition from './columnDefinition'
import MainCard from 'template/ui-component/cards/MainCard';
import { Grid,FormControl } from '@mui/material';

//-- 64 정준혁 2020-12-01 
const salaryAwardsContainer = () => {

    // 부서 selector 띄우기
    useEffect(() => {
        Axios.get(
            "http://localhost:9101/foudinfomgmt/deptlist"
        ).then(({ data }) => {
            
            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })
            setSelectDeptData({
                // dept: dataList
                ...selectDeptData, dept: [...selectDeptData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);


    const [selectDeptData, setSelectDeptData] = useState(
        {
            dept: [
                { key: '부서선택해주세요', value: 'ALL' }
            ]
        }
    );

    const [selectEmpData, setSelectEmpData] = useState(
        {
            emp: [
                { key: '사원선택해주세요', value: 'ALL' },
            ]
        }
    );


  

    const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value)
    const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value)
    const [rowData, setRowData] = useState("");


    // 부서명 , 사원명 change될시
    const selectHandleChange = e => {

        const selectValue = e.target.value;
        setSelectDeptTitle(selectValue);


        // 사원명
        Axios.get(
            "http://localhost:9101/empinfomgmt/emplist",
            {
                params: {
                    value: selectValue
                }
            }
        ).then(response => {
 
            const empList = response.data.list.map(e => {
                return {
                    key: e.empName,
                    value: e.empCode
                }
            })

            // 승훈이행님 도움
            setSelectEmpData({
                emp: empList
            })

            // 범석 소스코드
            // setSelectEmpData({
            //     ...selectEmpData, emp: [...selectEmpData.emp, ...empList]
            // })

        }).catch(() => {
            alert('해당부서에는 사원이 존재하지 않습니다');
            window.location.reload(true);
        })
    };

    // 사원명을 change했을 경우
    const selectSearchEmpChange = (e) => {
        const selectName = e.target.value;
        setSelectEmpCode(selectName);


        // 사원명 변경시 퇴직금 찍는
        Axios.get(
            //"http://localhost:8282/hr/salary/severancePay",
            "http://localhost:9101/salaryinfomgmt/awards",
            {
                params: {
                    empName: selectName
                }
            }
        ).then(
            response => {
         
                setRowData(response.data.List);
            }
        )
    }


    return (
        <>
            <MainCard 
            content={false}
            title="성과급 조회"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}
                    selectValue={selectDeptTitle}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectDeptData.dept} />
            </FormControl>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'사원명'}
                    selectValue={selectEmpCode}
                    selectonChange={selectSearchEmpChange}
                    menuItemMap={selectEmpData.emp}
                />
            </FormControl>
            </Grid>
            }
            >

            </MainCard>
            <MyGrid
                columnDefinition={columnDefinition}
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true} 
                columnDefinitionion={columnDefinition} style={{
                    height: "100%",
                    width: "100%",
                }}
                />
        </>
    )
};

export default React.memo(salaryAwardsContainer);
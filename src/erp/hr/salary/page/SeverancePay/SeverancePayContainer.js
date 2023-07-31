import React, { useCallback, useEffect, useState } from 'react';
import { formatNumber } from 'erp/hr/util/lib'
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'
import Axios from 'axios';
import { Grid,Button,FormControl } from "@mui/material";
import MainCard from 'template/ui-component/cards/MainCard';


//*********** 퇴직금조회 21/09/15 고범석  종료 *************/
export const SeveranceContainer = () => {
    const columnDefinition = [
        { headerName: "적용연월", field: "hiredate" },
        { headerName: "사원명", field: "empname" },
        { headerName: "사원코드", field: "empcode" },
      
        { headerName: "직위", field: "position" },
        { headerName: "일한날", field: "workingdate", hide:true },
        { headerName: "퇴직금", field: "retirementsalary", valueFormatter: formatNumber },
    ];

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
           // window.location.reload(true);
        })
    };
    // 사원명을 change했을 경우
    const selectSearchEmpChange = (e) => {
        const selectName = e.target.value;
        setSelectEmpCode(selectName);

        
        // 사원명 변경시 퇴직금 찍는
         Axios.get(
             "http://localhost:9101/salaryinfomgmt/retirement",
             {
                 params: {
                     empCode: selectName
                 }
             }
         ).then(
             response => {
  
                 
                setRowData(response.data.retirementSalaryList);
            }
         )
    }


    return (
        <>
          
            <MainCard 
            content={false}
            title=" 퇴직금 조회"
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
                rowData={rowData}
                paginationAutoPageSize={true}
                pagination={true} 
                columnDefinition={columnDefinition}
                style={{
                    height: "100%",
                    width: "100%",}}
                    />
        
        </>
    )
};
export default React.memo(SeveranceContainer);

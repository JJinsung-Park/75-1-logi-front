import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HrAppBar from 'erp/hr/util/HrAppBar'
import MySelect from 'erp/hr/util/MySelect'
import MyGrid from 'erp/hr/util/MyGrid'
import columnDefinition from './columnDefinition'
import { SEARCH_MONTH_SALARY_LIST_REQUEST } from "../../saga/SearchMonthSalSaga";
import { thisYear } from 'erp/hr/util/lib'

import { Button, FormControl, Grid } from '@mui/material';
import MainCard from 'template/ui-component/cards/MainCard';

//-- 64 정준혁 2020-12-01 
const MonthSalaryContainer = () => {
    const [selectData, setSelectData] = useState(
        {
            emp: [
                { key: '전체사원', value: 'ALL' }
            ],
            calendar: [
                { key: '전체날짜', value: 'ALL' },
                ...thisYear()
            ]
        }
    );
    const [selectDeptTitle, setSelectDeptTitle] = useState(selectData.emp[0].value)
    const [selectCalendar, setSelectCalendar] = useState(selectData.calendar[0].value)
    const [rowData, setRowData] = useState([]);
    const monthSalaryListDispatch = useDispatch();
     //const data = useSelector(({ state }) => state.RootReducers.hr.salary.searchmonthsal.monthSalary, []);
    const data = useSelector( state  => state.RootReducers.hr.salary.searchmonthsal.monthSalary);

    const selectHandleChange = useCallback((e) => {

        const selectValue = e.target.value;
        const selectName = e.target.name;

        if (selectName === '부서') {
            setSelectDeptTitle(selectValue);
 
        } else if (selectName === '달력') {
            setSelectCalendar(selectValue)

        }
    }, []);

    useEffect(() => {
   
        monthSalaryListDispatch({
            type: SEARCH_MONTH_SALARY_LIST_REQUEST,
        });
    }, []);

    useEffect(() => {
        if (selectDeptTitle === 'ALL' && selectCalendar === 'ALL') {
          
            setRowData(data);
            return;
        }
        let filterData = data;
        if (selectDeptTitle !== 'ALL') {
            filterData = filterData.filter(e => e.empCode === selectDeptTitle);

        }
        if (selectCalendar !== 'ALL') {
            filterData = filterData.filter(e => e.applyYearMonth === selectCalendar);
           
        }
      
        setRowData(filterData)
    }, [selectDeptTitle, selectCalendar, data]);

    useEffect(() => {
        axios.get(
            "http://localhost:9101/empinfomgmt/empreallist"
        ).then(({ data }) => {
   
            const dataList = data.list.map(e => {
                return {
                    key: e.empName,
                    value: e.empCode
                }
            })

            setSelectData({
                ...selectData, emp: [...selectData.emp, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);
    return (
        <>
            <MainCard 
            content={false}
            title=" 월 급여 조회"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}
                    selectValue={selectDeptTitle}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.emp} />
            </FormControl>
            <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'달력'}
                    selectValue={selectCalendar}
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.calendar} />
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
                }} />

        </>
    );
};

export default React.memo(MonthSalaryContainer);
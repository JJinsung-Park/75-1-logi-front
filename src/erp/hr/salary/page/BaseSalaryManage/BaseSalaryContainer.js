import React, { useState, useEffect, useCallback } from "react";
import HrAppBar from 'erp/hr/util/HrAppBar'
import * as types from "../../saga/BaseSalarySaga";
import { useDispatch, useSelector } from 'react-redux';

import MyGrid from 'erp/hr/util/MyGrid'
import Icon from "@material-ui/core/Icon";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import columnDefinition from './columnDefinition';
import axios from "axios";
import { FormControl } from "@material-ui/core";
import MySelect from 'erp/hr/util/MySelect';
import MainCard from "template/ui-component/cards/MainCard";
import { Grid,Button } from "@mui/material";

const BaseDeductionManage = () => {

    const [gridEvent, setGridEvent] = useState();
    const dataDispatch = useDispatch();
    const [rowData, setRowData] = useState([]);
    const data = useSelector( state  => state.RootReducers.hr.salary.baseSalaryList);
    const [selectData, setSelectData] = useState(
        {
            dept: [
                { key: '전체부서', value: 'ALL' }
            ]
        }
    );

    useEffect(() => {
        dataDispatch({ type: types.BASE_SALARY_LIST_REQUEST });
    }, [dataDispatch]);


    const updateDispatch = useDispatch();

    const createNewRowData = () => {
        let newData = {
            workPlaceCode: "BRC-01",
            deptName: '부서명 입력',
            positionCode: '입력하지 마세요',
            positionName: '직급명 입력',
            baseSalary: '0000',
            hobongRatio: '인상율 입력',
            status: 'insert'
        };
        return newData;
    }

    // 시작과 동시에 전체부서
    const [selectDeptTitle, setSelectDeptTitle] = useState(selectData.dept[0].value);

    const selectHandleChange = useCallback((e) => {
   
        const selectValue = e.target.value;
        const selectName = e.target.name;
        if (selectName === '부서') {
            setSelectDeptTitle(selectValue);
        }
    }, []);



    useEffect(() => {
            axios.get(
                "http://localhost:9101/salarystdinfomgmt/base-salary"
               // { params: { selectDeptTitle } }
            ).then(response => {
                setRowData(response.data.baseSalaryList);
         
            }).catch(e => {  });
        }
    , [selectDeptTitle, data]);

   /* useEffect(() => {
        axios.get(
            "http://localhost:8282/foudinfomgmt/deptlist"
        ).then(({ data }) => {
            const dataList = data.list.map(e => {
                return {
                    key: e.deptName,
                    value: e.deptCode
                }
            })
            setSelectData({
                ...selectData, dept: [...selectData.dept, ...dataList]
            })
        }).catch(e => {
            alert(e);
        });
    }, []);
*/
    const onAddRow = () => {
       
        const newItem = createNewRowData();
        gridEvent.updateRowData({ add: [newItem] });
    }

    const onGridReady = event => {
        event.api.sizeColumnsToFit();
        setGridEvent(event.api);
    }

    const onRemoveSelected = () => {

      
        var selectedData = gridEvent.getSelectedRows();
        selectedData[0].status = 'delete';
        gridEvent.updateRowData({ remove: selectedData });
 
        updateDispatch({
            type: types.UPDATE_BASE_SALARY_REQUEST,
            payload: selectedData
        });
    };

    function onCellEditingStopped(row) {
        if (row.data.status !== 'insert') {
            row.data.status = 'update';
        } else {
            if (
                row.data.deptName === '부서명 입력' ||
                row.data.positionName === '직급명 입력' ||
                row.data.hobongRatio === '인상율 입력') {
                return;
            }
        }
        updateDispatch({
            type: types.UPDATE_BASE_SALARY_REQUEST,
            payload: [row.data]
        });

    };

    return (
        <>
            <MainCard 
            content={false}
            title=" 급여기준관리"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                
            {/* <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}   // 부서
                    selectValue={selectDeptTitle}  // 초기값 전체부서
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.dept} />
            </FormControl> */}

            <Button variant="contained" color="secondary" onClick={onAddRow} startIcon={<Icon className="fa fa-plus-circle" />} >
                추가
            </Button>
            <Button variant="contained" color="secondary" onClick={onRemoveSelected} startIcon={<DeleteOutlinedIcon />}>
                삭제
            </Button>
            </Grid>
            
            } 
            >
            
                </MainCard>
                <MyGrid
                paginationAutoPageSize={true}
                pagination={true}
                rowData={rowData}
                onGridReady={onGridReady}
                onCellEditingStopped={onCellEditingStopped}
                columnDefinition={columnDefinition} style={{
                    height: "100%",
                    width: "100%",
                }} />
        
        </>
    );
};
export default React.memo(BaseDeductionManage);
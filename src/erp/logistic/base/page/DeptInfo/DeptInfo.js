//**************************************** 2020-11-19 최지은 시작 ****************************************

import React, { useEffect, useState } from 'react';
import useStyles from './Theme';
import axios from 'axios';
import DeptInfoSearch from './DeptInfoSearch';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {searchDeptInfo, savaDeptInfo, searchWorkplaceList} from 'erp/logistic/base/action/BasicInfoAction';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { useThemeSwitcher } from 'mui-theme-switcher';

function DeptInfo(props) {
    const theme = useStyles();
    //====================================================================

    const [formVisible, setFormVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [searchCondition, setSearchCondition] = useState('ALL');
    const [codeList, setCodeList] = useState([]);
    const [SearchName, setSearchName] = useState('');
    const [workplaceCode, setWorkplaceCode] = useState('');
    const dispatch = useDispatch();
    //var companyCode = sessionStorage.getItem("companyCode");
    let companyCode = 'COM-01';
    const [dataList, setDataList] = useState([]); //그리드 동적값
    //=================================================================================
    const  DepartmentList  = useSelector(state => state.RootReducers.logistic.basicinfo.DepartmentList);
    const list = DepartmentList .filter(list => list.status !== 'DELETE');

    //console.log('리듀서값...' + DepartmentList);
    const [delData, setDelData] = useState([]);


    //=====================================================================================
    const DeptColDefs = [
        {
            headerName: '사업장코드',
            field: 'workplaceCode',
            width: 100
        },
        {
            headerName: '사업장명',
            field: 'workplaceName',
            width: 100
        },
        {
            headerName: '부서코드',
            field: 'deptCode',
            width: 100,
            placeholder: '저장시지정됨'
        },
        { headerName: '부서명', field: 'deptName', width: 100, editable: true },
        {
            headerName: '부서신설일',
            field: 'deptStartDate',
            width: 100,
            editable: true
        },
        {
            headerName: '부서해체일',
            field: 'deptEndDate',
            width: 100,
            editable: true
        },
        { headerName: 'status', field: 'status', width: 100 },
        { headerName: 'companyCode', field: 'companyCode', width: 100, hide: true }
    ];
    //=====================================================================================
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //그리드 사이즈 자동 조절
    const onGridReady = params => {
        setDataList(params.api);
        params.api.sizeColumnsToFit();
    };

    //다이얼로그 셀 클릭
    const DialogCellClick = e => {
        setSearchName(e.node.data.detailCodeName);
        setWorkplaceCode(e.node.data.detailCode);
        setOpenD(false);
    };

    //부서 검색조건 변경시
    const handleChange = e => {
        if (e.target.value === 'WORKPLACE') {
            setFormVisible(false);
        } else {
            setFormVisible(true); //부서 검색 조건 사업장 조회 선택시 뜨는 form...
        }
        setSearchCondition(e.target.value);
    };



    //사업장 조회
    //2023-02-16 석현, 은비 수정
    const handleClick = async e => {
        setOpenD(true);
        try {
            await axios
                .get('http://localhost:9102/compinfo/codedetail/list',
                    {params: {
                                    divisionCodeNo: 'CO-02'
                                }
                    })
                .then(response => {
                const jsonData = response.data.codeList;
                
                setCodeList(jsonData);
                
            });
        } catch (e) {
         
        }
    };

    //=========================================================================================================
    //부서조회
    const searchClick = async e => {
        dispatch(searchDeptInfo({ searchCondition, companyCode, workplaceCode}));
    };

    //셀 수정시
    const rowCellChanged = params => {

        console.log(params.data.status);
        if (params.data.status === 'NORMAL') {
            params.data.status = 'UPDATE'; //업데이트 수정 - 시윤
        }
    };

    //새로운 부서 정보 추가 이벤트
    const addClick = () => {
        dataList.selectAll(); // 그리드 전체 값(모든 행을 선택)
        const newRow = NewRowData(); //새로운 row를 변수에담음
        dataList.updateRowData({ add: [newRow], addIndex: '' }); // 행 데이터를 그리드로 업데이트함.
        // dispatch(addDeptInfo({ newRow }));
        dataList.deselectAll(); //모든 행 선택을 지움
    };
    //새로운 부서 추가 (추가를 하면 왜 BRC-01만 나오냐..)
    const NewRowData = () => {
        var wCode = workplaceCode === 'BRC-02' ? 'BRC-02' : 'BRC-01';
        var wName = workplaceCode === 'BRC-02' ? '(주)세계전자 울산지점' : '(주)세계전자본사';

        var newRow = {
            companyCode: companyCode,
            workplaceCode: wCode,
            workplaceName: wName,
            deptCode: '저장시 지정됨',
            deptName: '',
            deptStartDate: '',
            deptEndDate: '',
            status: 'INSERT'
        };
        return newRow;
    };

    //일괄저장
    const onSaveClick = () => {

        dataList.selectAll(); // 그리드 전체 값
        const rows = dataList.getSelectedRows(); // 그리드의 모든 값을 반환
        const rowsCount = dataList.getDisplayedRowCount(); // 표시된 총 행 수를 반환

        for (let i = 0; i < rowsCount; i++) {
            if (rows[i].deptName === '' || rows[i].deptStartDate === '') {
                alert('부서명과 신설일을 정확하게 입력해주세요.');
                return;
            }
            //뭔지모르겠음.
            delete rows[i].errorCode;
            delete rows[i].errorMsg;
            delete rows[i].chk;
        }
        dispatch(savaDeptInfo(rows)); //저장
        dataList.deselectAll();
        dispatch(searchDeptInfo({ searchCondition, companyCode, workplaceCode })); //저장 누르고나서 저장된 모든 Data 불러옴.
    };

        const onRowSelected = e => {
                setDelData(e.api.getSelectedRows());
                console.log("@e.api.getSelectedRows()@")
                console.log(e.api.getSelectedRows());
                console.log("@delData@")
                console.log(delData);
            };

            const delClick = () => { /*삭제버튼 - 시윤*/
                console.log("@@delData@@");
                console.log(delData);
                console.log("@@delData[0].status@@");
                console.log(delData[0].status);

                    if (delData[0].status === 'NORMAL') {
                        if(window.confirm("선택한 항목을 삭제 하시겠습니까?")){
                                delData[0].status = 'DELETE';
                            }
                    }
                    onSaveClick();
            };

    const { dark } = useThemeSwitcher();

    //======================================================================================================

    //===================================================================================
    return (
        <>
            <div>
                <DeptInfoSearch
                    open={open}
                    codeList={codeList}
                    searchCondition={searchCondition}
                    openD={openD}
                    SearchName={SearchName}
                    setSearchName={setSearchName}
                    setWorkplaceCode={setWorkplaceCode}
                    formVisible={formVisible}
                    handleChange={handleChange}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    setOpenD={setOpenD}
                    searchClick={searchClick}
                    addClick={addClick}
                    DeptColDefs={DeptColDefs}
                    DialogCellClick={DialogCellClick}
                    onSaveClick={onSaveClick}
                    delClick={delClick} /*삭제버튼 추가*/
                />
            </div>
            <div
                className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                style={{
                    height: '600px',
                    width: '100%',
                    paddingTop: '20px'
                }}
            >

                <AgGridReact
                    columnDefs={DeptColDefs}
                    rowData={DepartmentList}
                    onGridReady={onGridReady}
                    onCellEditingStarted={rowCellChanged}
                    onRowSelected={onRowSelected} /*선택한 행*/
                    rowSelection="multiple" /*여러행 선택가능*/
                />
            </div>
            ;
        </>
    );
}

export default DeptInfo;
//**************************************** 2020-11-19 최지은 종료 ****************************************

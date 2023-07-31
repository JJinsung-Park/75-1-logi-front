import React, {useCallback, useEffect, useState} from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { savaClientInfo, searchClientInfo } from 'erp/logistic/base/action/BasicInfoAction';
import {Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import Swal from "sweetalert2";
import useAsync from 'util/useAsync'
import * as api from "../../api";



//****************************2020-11-25 박미노****************************************** */

function NomalClientInfo(props) {
    const [gridRow, setGridRow] = useState([]);
    const dispatch = useDispatch();
    const [saveData, setSaveData] = useState([]);
    const ClientInfoList  = useSelector(state => state.RootReducers.logistic.basicinfo.ClientInfoList);
    // console.log("저장값",ClientInfoList);
    const list =ClientInfoList.filter(list => list.status !== 'DELETE');


    //첫 화면에 일반 거래처 정보



    const column = {
        columnDefs: [
            {
                headerName: '일반거래처 코드',
                field: 'customerCode',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            //변경
            { headerName: "NO", width: 55, valueGetter: "node.rowIndex + 1" ,hide:true},
            { headerName: '사업장코드', field: 'workplaceCode', editable: true },
            { headerName: '거래처명', field: 'customerName', width: 300, editable: true },
            { headerName: '거래처유형', field: 'customerType', editable: true },
            { headerName: '거래처대표자명', field: 'customerCeo', editable: true },
            { headerName: 'status', field: 'status' },
            {
                headerName: '사업자등록번호',
                field: 'businessLicenseNumber',
                width: 300,
                editable: true,
                hide: true
            },
            { headerName: '개인거래처 주민등록번호', field: 'socialSecurityNumber', hide: true },
            { headerName: '업태', field: 'customerBusinessConditions', editable: true },
            { headerName: '종목', field: 'customerBusinessItems', editable: true },
            { headerName: '우편번호', field: 'customerZipCode', editable: true, hide: true },
            {
                headerName: '기본주소',
                field: 'customerBasicAddress',
                width: 500,
                editable: true,
                hide: true
            },
            { headerName: '세부주소', field: 'customerDetailAddress', editable: true, hide: true },
            {
                headerName: '전화번호',
                field: 'customerTelNumber',
                width: 300,
                editable: true,
                hide: true
            },
            { headerName: '팩스번호', field: 'customerFaxNumber', editable: true, hide: true },
            { headerName: '비고', field: 'customerNote', hide: true },
            { headerName: '사업자등록번호', field: 'companyCeoName', hide: true }
        ]
    };


    const gridApi = params => {
        setGridRow(params.api);
        params.api.sizeColumnsToFit();
    };

    const rowCellChanged = params => {
        const selectedData = gridRow.getSelectedRows();
        if (  params.data.status=== "NORMAL") {
            for(let i=0;i<selectedData.length; i++){
                selectedData[i].status = 'UPDATE';
                gridRow.updateRowData({ update: selectedData.status});}
        }
    };


    //일괄저장

    // const saveClick = () => {
    //     // const deleteData = gridRow.getSelectedRows();
    //     //
    //     // for (let a = 0; a < deleteData.length; a++) {
    //     //     deleteData[a].status = 'DELETE';
    //     // }
    //
    //     gridRow.selectAll(); // 그리드 전체 값
    //     const rows = gridRow.getSelectedRows(); // 그리드의 모든 값을 반환
    //     const rowsCount = gridRow.getDisplayedRowCount(); // 표시된 총 행 수를 반환
    //
    //
    //     if (!window.confirm(' 저장하시겠습니까 ? ')) {
    //         alert(' 취소되었습니다.');
    //         gridRow.deselectAll();
    //         return;
    //     } else {
    //         for (let i = 0; i < rowsCount; i++) {
    //             if (rows[i].customerName === undefined) {
    //                 alert('거래처명을 정확하게 입력해주세요.');
    //                 gridRow.deselectAll();
    //                 return;
    //             }
    //             delete rows[i].errorCode;
    //             delete rows[i].errorMsg;
    //             delete rows[i].chk;
    //         }
    //         dispatch(savaClientInfo(rows));
    //         gridRow.deselectAll(); // 그리드 전체값 제거.
    //         dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' })); //다시 불러옴 , , , , ,
    //     }
    //    // dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    // };
    let resultList = [];

    const [result, batchSaveFetch] = useAsync(param=> api.saveClient(param),[],true);

    const batchSave = useCallback( () => {
        batchSaveFetch(resultList);}, [batchSaveFetch, resultList]);

    useEffect(() => {
        dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    }, [result.data]);

    // useEffect(() => {
    //     console.log("왜 useEffect 안돼?",result);
    //     console.log("왜 useEffect 안돼?",result.data);
    //     if(result.data) setSaveData(result.data.saveData);
    //         }, [result.data]);


    const addClick = () => {
        gridRow.selectAll(); // 그리드 전체 값
        const newRow = NewRowData(); //새로운 row를 변수에담음
        gridRow.updateRowData({ add: [newRow], addIndex: '' }); // ag그리드 api로 그리드에 add 함
        gridRow.deselectAll();
    };


    const NewRowData = () => {
        let newNo="";
        let rows = gridRow.forEachNode(n=>{
            newNo = n.data.no+1;
        });

        const newRow = {
            no: newNo,
            workplaceCode: 'BRC-01',
            customerCode: '저장시 지정됨',
            status: 'INSERT'
        };
        return newRow;
    };
    const saveClick = () => {
        let insertCount = 0;
        let updateCount = 0;
        let deleteCount = 0;

        gridRow.forEachNode((node, index) => {  //forEacthNode -> forEachNode
            let rowObject = node.data;
            console.log("rowObject : ", rowObject);
            let status = rowObject.status;
            console.log("status : ", status);
            if (status === "INSERT") {
                if (rowObject.customerName === "") {
                    alert("거래처명을 정확하게 입력해주세요.");
                } else {
                    resultList.push(rowObject);
                    insertCount++;
                }
            }else if(status === "UPDATE") {
                resultList.push(rowObject);
                updateCount++;
            }else if(status === "DELETE") {
                if(rowObject.deleteStatus !== "LOCAL 삭제") {
                    resultList.push(rowObject);
                    deleteCount++;
                }else {
                    let removedRows = [];
                    let selectRow = node.data;
                    removedRows.push(selectRow);
                    gridRow.updateRowData({ remove: [selectRow] });
                }
            }
        });

        let confirmMsg =
            (insertCount !== 0 ? insertCount + "개의 항목 추가\n" : "") +
            (updateCount !== 0 ? updateCount + "개의 항목 추가\n" : "") +
            (deleteCount !== 0 ? deleteCount + "개의 항목 추가\n" : "") +
            "\r위와 같이 작업합니다. 계속하시겠습니까?";

        let confirmStatus = "";

        if(resultList.length !== 0) {
            confirmStatus = window.confirm(confirmMsg);
        }

        if(resultList.length !== 0 && confirmStatus) {
            batchSave(); //새로운 항목 추가 후 일괄저장 버튼 클릭 시 batchSave 호출함
        }else if(resultList.length !== 0 && !confirmStatus) {
            alert("취소되었습니다.");
        }else if(resultList.length === 0) {
            alert("추가/수정/삭제할 항목이 없습니다.");
        }
        resultList = [];
        // dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    };

    // const onRowSelected = (e) =>{
    //     setDeleteData (e.api.getSelectedRows());
    // };

    const delClick = (e)=> {
        const selectedData = gridRow.getSelectedRows();
        if(selectedData.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(selectedData.length > 1) {
            if(!window.confirm(
                "해당 정보들을 삭제 하시겠습니까?"
            )) {
                return;
            } else {
                for(let i=0; i<selectedData.length; i++) {
                    selectedData[i].status = "DELETE";
                }
                gridRow.updateRowData({ update: selectedData.status});
                saveClick();
                // selectedData.status = "DELETE";
            }
        }else if(selectedData.length === 1) {
            if(!window.confirm(
                "해당 " + selectedData[0].customerName + "정보를 지우시겠습니까?"
            )) {
                return;
            }else {
                for(let i=0; i<selectedData.length; i++) {
                    selectedData[i].status = "DELETE";
                }
                gridRow.updateRowData({ update: selectedData.status});
                saveClick();
            }
        }
    };

    //로우 값 변경시


    function nomalClientInfoButton() {
        return (
            <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{marginRight: '1vh'}}
                    onClick={addClick}
                >
                    일반거래처 정보 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{marginRight: '1vh'}}
                    onClick={saveClick}
                >
                    저장
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{marginRight: '1vh'}}
                    onClick={delClick}
                >
                    삭제
                </Button>
            </Grid>
        )
    }
    return (
        <>
            <div></div>
            <MainCard
                content={false}
                title="일반 거래처"
                secondary={nomalClientInfoButton()}
            >

                <MyGrid
                    // onCellClicked={onCellClicked}
                    column={column}
                    list={list}
                    onCellValueChanged={rowCellChanged} //편집시작시 이벤트
                    rowSelection="multiple"
                    api={gridApi}
                    // onRowSelected={onRowSelected}
                >
                </MyGrid>
            </MainCard>
        </>
    );
}

export default NomalClientInfo;
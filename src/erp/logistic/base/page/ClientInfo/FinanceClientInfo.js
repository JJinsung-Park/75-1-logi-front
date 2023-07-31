import React, {useCallback, useEffect, useState} from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { saveFinanInfo, searchFinanInfo } from 'erp/logistic/base/action/BasicInfoAction';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Grid} from "@mui/material";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import useAsync from "../../../../../util/useAsync";
import * as api from "../../api";
//****************************2020-11-25 박미노****************************************** */

function FinanceClientInfo(props) {
    const [dataList, setDataList] = useState([]);
    const [gridRow, setGridRow] = useState();
    const dispatch = useDispatch();
    const  FinanInfoList  = useSelector(state => state.RootReducers.logistic.basicinfo.FinanInfoList);
    const  list = FinanInfoList.filter(list => list.status !== 'DELETE');



    const column = {
        columnDefs: [
            {
                headerName: '금융거래처 코드',
                field: 'accountAssociatesCode',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            { headerName: "NO", width: 55, valueGetter: "node.rowIndex + 1" ,hide:true},
            { headerName: '사업장코드', field: 'workplaceCode', width: 140, editable: true },
            {
                headerName: '금융거래처명',
                field: 'accountAssociatesName',
                width: 200,
                editable: true
            },
            {
                headerName: '금융거래처타입',
                field: 'accountAssociatesType',
                width: 130,
                editable: true
            },
            { headerName: '계좌번호', field: 'accountNumber', editable: true },
            {
                headerName: '금융기관코드',
                field: 'financialInstituteCode',
                width: 100,
                editable: true
            },
            {
                headerName: '금융기관명',
                field: 'financialInstituteName',
                width: 100,
                editable: true
            },
            { headerName: '비고', field: 'financialInstituteNote', hide: true, editable: true },
            { headerName: 'status', field: 'status' }
        ]
    };

    //***********************************2020-12-02 최지은 금융거래처 정보추가 & 일괄저장 **************************************************** */





    const gridApi = params => {
        setGridRow(params.api);
    };

    let resultList = [];

    const [result, FinanBatchSaveFetch] = useAsync(param=> api.saveFinanInfo(param),[],true);

    const batchSave = useCallback( () => {
        FinanBatchSaveFetch(resultList);}, [FinanBatchSaveFetch, resultList]);

    useEffect(() => {
        dispatch(searchFinanInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    }, [result.data]);

    // useEffect(() => {
    //     console.log("왜 useEffect 안돼?",result);
    //     console.log("왜 useEffect 안돼?",result.data);
    //     if(result.data) setDataList(result.data.datalist);
    // }, [result.data]);


    //금융거래처 정보 추가
    const addFinanInfo = () => {
        gridRow.selectAll();
        const newRow = newRowData();
        gridRow.updateRowData({ add: [newRow], addindex: '' });
        gridRow.deselectAll();
    };

    const newRowData = () => {
        let newNo="";
        let rows = gridRow.forEachNode(n=>{
            newNo = n.data.no+1;
        });

        const newRow = {
            no: newNo,
            workplaceCode: 'BRC-01',
            accountAssociatesCode: '저장시 지정됨',
            status: 'INSERT'
        };
        return newRow;
    };

    //셀편집시작
    const onRowChange = params => {
        const selectedData = gridRow.getSelectedRows();
        if (params.data.status === 'NORMAL') {
            for(let i=0;i<selectedData.length; i++){
                selectedData[i].status = 'UPDATE';}
            gridRow.updateRowData({ update: selectedData.status});
        }
    };



    //일괄저장
    const onSaveClick = () => {
        let insertCount = 0;
        let updateCount = 0;
        let deleteCount = 0;

        gridRow.forEachNode((node, index) => {  //forEacthNode -> forEachNode
            let rowObject = node.data;
            console.log("rowObject : ", rowObject);
            let status = rowObject.status;
            console.log("status : ", status);
            if (status === "INSERT") {
                if (rowObject.accountAssociatesName === "") {
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
    };

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
                onSaveClick();
                // selectedData.status = "DELETE";
            }
        }else if(selectedData.length === 1) {
            if(!window.confirm(
                "해당 " + selectedData[0].accountAssociatesName + "정보를 지우시겠습니까?"
            )) {
                return;
            }else {
                for(let i=0; i<selectedData.length; i++) {
                    selectedData[i].status = "DELETE";
                }
                gridRow.updateRowData({ update: selectedData.status});
                onSaveClick();
            }
        }
    };

    function financeClientInfoButton() {
        return <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
            <Button
                variant="contained"
                color="secondary"
                style={{marginRight: '1vh'}}
                onClick={addFinanInfo}
            >
                금융거래처 정보 추가
            </Button>
            <Button
                variant="contained"
                color="secondary"
                style={{marginRight: '1vh'}}
                onClick={onSaveClick}
            >
                일괄저장
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
    }

    return (
        <>
            <div></div>
            <MainCard
                content={false}
                title="금융 거래처 "
                secondary={financeClientInfoButton()}
>
            <MyGrid
                column={column}
                list={list}
                //onCellClicked={onCellClicked}
                rowSelection="multiple"
                api={gridApi}
                onCellEditingStarted={onRowChange}
            >
            </MyGrid>
        </MainCard>
        </>
    );
}

export default FinanceClientInfo;

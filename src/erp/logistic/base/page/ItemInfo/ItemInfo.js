import React, {useEffect, useState} from 'react';
import { Button } from "@mui/material";
import MyGrid from 'util/LogiUtil/MyGrid';
import {addItemDetailList, itemInfoDetail, saveItemDetailList, searchItemList} from '../../action/LogisticsInfoAction';
import { useSelector, useDispatch } from 'react-redux';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddItemDialog from './AddItemDialog';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/base/api';
import axios from "axios";
import {grid} from "@mui/system";


function ItemInfo(props){

    // const [gridApi, setGridApi] = useState([]);
    // const [gridColumnApi, setGridColumnApi] = useState([]);
    const [gridApiDetail, setGridApiDetail] = useState([]);
    const [gridDetailColumnApi, setGridDetailColumnApi] = useState([]);

    const [itemGrid, setItemGrid] = useState([]);
    //일단 선언
    const [list1,setList1]=useState([]);
    const [itemGroupCode, setItemGroupCode] = useState([]);
    // const [itemDetail, searchItemDetailFetch] = useAsync((param) => api.itemListCellClicked(param), [], true);
    const [rowItemDetail, setRowItemDetail] = useState([]);
    const dispatch = useDispatch();

    const itemList=useSelector(state => state.RootReducers.logistic.logisticsinfo.itemList);
    const list=itemList.filter(ele => {
        if(ele.status !== 'DELETE'){
            return ele;
        }
    });
    // const [listParams,setListParams] = useState([]);

    const itemDetailList=useSelector(state => state.RootReducers.logistic.logisticsinfo.itemInfoDetail);
    console.log('itemDetailList~~~~~~~~~~~~~',itemDetailList)
    const detailList=itemDetailList.filter(ele => {
        if(ele.status !== 'DELETE'){
            return ele;
        }
    });


    const columns = {
        columnDefs : [
            {width: '10', headerCheckboxSelection: false, checkboxSelection: true },
            {headerName: '품목그룹코드', field: 'itemGroupCode' },
            {headerName: '품목그룹명', field: 'itemGroupName', editable: true }
        ]
    };

    const detailColumn = {
        columnDefs: [
            { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
            { headerName: '품목 코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName', editable: true },
            { headerName: '품목군 코드', field: 'itemGroupCode', editable: true },
            { headerName: '품목 분류', field: 'itemClassification', editable: true },
            { headerName: '단위', field: 'unitOfStock' },
            { headerName: '손실율', field: 'lossRate', editable: true },
            { headerName: '소요일', field: 'leadTime', editable: true },
            { headerName: '표준단가', field: 'standardUnitPrice', editable: true },
            { headerName: '설명', field: 'description', editable: true },
            { headerName: '품목 사용여부', field: 'codeUseCheck', editable: true }
        ]
    };

    // const onGridReady = params => {
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    //     setItemGrid(params.api);
    // };

    const onGridReadyDetail = params => {
        console.log('onGridReadyDetail',params.api);
        setGridApiDetail(params.api);
        setGridDetailColumnApi(params.api);
    };

    useEffect(() => {
        dispatch(searchItemList());
    }, [] );


    //품목상세
    //품목상세는 선택된 itemGroupCode를 넘겨야 함. - ableContractInfo를 키로 넘김



    const onCellClicked = params => {
        setItemGroupCode(params.data.itemGroupCode);
        // setItemGroupCode(itemGroupCode);
        // setListParams(params);
        console.log('셀클릭! itemGroupCode - ',params.data.itemGroupCode);
    }

    // const btnClick2 =()=>{
    //     console.log(listParams);
    //     searchItemDetailFetch(listParams);
    //     console.log(itemDetail.data);
    //     itemDetail.data ? setRowItemDetail(itemDetail.data.gridRowJson) : null;
    // }

    const btnClick =()=>{
        console.log('상세조회 클릭!',itemGroupCode);
        dispatch(itemInfoDetail({itemGroupCode}));
        // itemDetail.data ? setRowItemDetail(itemDetail.data.gridRowJson) : null;
        // console.log(itemDetail.data.gridRowJson);
    }

    /*품목 삭제*/
    const deleteItem = () => {
        let getList = [];
        const rowsCount = itemGrid.getDisplayedRowCount(); //getDisplayedRowCount - 표시된 행의 총 수를 반환
        let rows = itemGrid.getSelectedRows(); //선택된 행의 index를 반환 - 예를들어 1,2,3~7번 중에 컨트롤 누르고 2,3번을 선택하면  2와3을 배열로 반환한다.
        for (let row of rows) {
            row.status = 'DELETE';
        }
        for (let i = 0; i < rowsCount; i++) {
            getList.push(itemGrid.getRowNode(i).data);
        }
        let newList = getList.filter(ele => {
            if (ele.status !== 'DELETE') {
                return ele;
            }
        });

        let delList = getList.filter(ele => {
            if (ele.status === 'DELETE') {
                return ele;
            }
        });
        console.log(delList);
        setList1(newList);
        // axios 해서 delList 보낸다.
        try {
            api.delBatchList(delList).then(function(respones) {
                console.log(respones.data.errorCode);
                if (parseInt(respones.data.errorCode) > 0) {
                    alert('삭제되었습니다.^^ ' + respones.data.errorMsg);
                }else if (parseInt(respones.data.errorCode) < 0) {
                    alert('삭제 실패');
                }
            });
        } catch (e) {
            alert(e);
        }
    };


    const [openDialog, setOpenDialog] = useState(false);
    const close = () => {
        setOpenDialog(false);
    };

    const addClick = () => {
        setOpenDialog(true);
    };
    function onSubmit(itemTo) { //저장 수정 중...
        console.log("here1",itemTo);
        // let map = [];
        // map.push(itemTo);
        gridApiDetail.applyTransaction({add: [itemTo]});
        // dispatch(addItemDetailList(itemTo));
        setOpenDialog(false);
        // try {
        //     axios.get.batchItemListProcess(map)
        //         .then(function(respones) {
        //             console.log(respones.data.errorCode);
        //             if (parseInt(respones.data.errorCode) > 0) {
        //                 alert('신청 성공하였습니다.^^ ' + respones.data.errorMsg);
        //             }
        //             if (parseInt(respones.data.errorCode) < 0) {
        //                 alert('신청 실패하였습니다.');
        //             }
        //         });
        // } catch (e) {
        //     alert(e);
        // }
    }

    const delClick = params => {
        console.log('품목상세삭제버튼',params);
        const rows = gridApiDetail.getSelectedRows();
        for(let i=0;i<rows.length;i++)
            rows[i].status = 'DELETE';
        gridApiDetail.updateRowData({remove : rows});
        saveClick();
    }

    // const [detailListRow, SaveDetailListRowFetch] = useAsync((param) => api.delBatchList(param), [],true);

    const saveClick = () =>{
        const rows = gridApiDetail.getSelectedRows();
        for(let i=0;i<rows.length;i++)
            rows[i].status = 'INSERT';
        dispatch(saveItemDetailList(rows))
    }

    return (
        <div>
            {/* <button onClick={btnClick}>선택 완료</button>
            <button onClick={btnClick2}>품목 상세조회</button> */}
            <MyGrid
                column={columns}
                list={list}
                rowSelection="single"
                // api={onGridReady}
                onCellClicked={onCellClicked}
                onGridSizeChanged={event => {
                    event.api.sizeColumnsToFit();
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={btnClick}
                >
                    상세조회
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={deleteItem}
                >
                    품목삭제
                </Button>

            </MyGrid>
            {/*품목상세조회 그리드*/}
            <MyGrid
                column={detailColumn}
                rowSelection="single"
                api={onGridReadyDetail}
                list={detailList}
                onGridSizeChanged={event => {
                    event.api.sizeColumnsToFit();
                }}
            >

                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    품목상세추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={delClick} //delClick 구현해야함.
                >
                    품목상세삭제
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={saveClick} //delClick 구현해야함.
                >
                    품목상세저장
                </Button>
            </MyGrid>
            <MyDialog close={close} open={openDialog}>
                <div>
                    <AddItemDialog itemGroupCode={itemGroupCode} onSubmit={onSubmit} />
                </div>
            </MyDialog>
        </div>
    );
}

export default ItemInfo;

// import React, { useState, useEffect } from 'react';
// import MyGrid from 'util/LogiUtil/MyGrid';
// import { Button, Grid } from "@mui/material";
// import SelectItemInfo from './SelectItemInfo';
// import Axios from 'axios';
// import MyDialog from 'util/LogiUtil/MyDialog';
// import AddItemDialog from './AddItemDialog';
// import useAsync from 'util/useAsync';
// import * as Api from 'erp/logistic/base/api';

// function ItemInfo(props) {
//     const [list, setList] = useState([]);
//     const columns = {
//         columnDefs: [
//             { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
//             { headerName: '품목 코드', field: 'itemCode' },
//             { headerName: '품목명', field: 'itemName', editable: true },
//             { headerName: '품목군 코드', field: 'itemGroupCode', editable: true },
//             { headerName: '품목 분류', field: 'itemClassification', editable: true },
//             { headerName: '단위', field: 'unitOfStock' },
//             { headerName: '손실율', field: 'lossRate', editable: true },
//             { headerName: '소요일', field: 'leadTime', editable: true },
//             { headerName: '표준단가', field: 'standardUnitPrice', editable: true },
//             { headerName: '설명', field: 'description', editable: true },
//             { headerName: '품목 사용여부', field: 'codeUseCheck', editable: true }
//         ]
//     };
//     const getList = getList => {
//         setList(getList);
//     };

//     const [code, setCode] = useState('');
//     const [detailCode, setDetailCode] = useState('');

//     const getDivisionCode = getDivisionCode => {
//         if (getDivisionCode === 'IT') {
//             setCode('ITEM_CLASSIFICATION');
//         }
//         if (getDivisionCode === 'IT-GROUP') {
//             setCode('ITEM_GROUP_CODE');
//         }
//     };

//     const getDetailCode = getDetailCode => {
//         setDetailCode(getDetailCode);
//     };
// /*
//     const [state, refetch] =
//     useAsync(() => Api.searchItem(code,detailCode,setList), [code,detailCode,setList], true);

//     console.log(state);
//   */
//     useEffect(() => {
//         if (detailCode !== '') {
//             if (code === 'ITEM_GROUP_CODE') {
//                 Api.searchItemA(code,detailCode).then(function(respones) {
//                     setList(respones.data.gridRowJson);
//                 });
//             }
//             if (code === 'ITEM_CLASSIFICATION') {
//                 console.log('여기여기!!!',code);
//                 Api.searchItemB(code, detailCode).then(function(respones) {
//                     setList(respones.data.gridRowJson);
//                 });
//             }
//         }
//     }, [code, detailCode]);


//     const [openDialog, setOpenDialog] = useState(false);
//     const close = () => {
//         setOpenDialog(false);
//     };

//     const addClick = () => {
//         setOpenDialog(true);
//     };

//     function onSubmit(itemTo) {
//         console.log(itemTo);
//         var map = [];
//         map.push(itemTo);
//         try {
//                 Api.batchItemListProcess(map).then(function(respones) {
//                 console.log(respones.data.errorCode);
//                 if (parseInt(respones.data.errorCode) > 0) {
//                     alert('신청 성공하였습니다.^^ ' + respones.data.errorMsg);
//                 }
//                 if (parseInt(respones.data.errorCode) < 0) {
//                     alert('신청 실패하였습니다.');
//                 }
//             });
//         } catch (e) {
//             alert(e);
//         }
//     }

//     const [selectList, setSelectList] = useState(null);
//     const [delData, setDelData] = useState({});
//     const [updateData, setUpdateData] = useState({});
//     const [grid, setGrid] = useState();

//     const api = params => {
//         setGrid(params.api);
//     };

//     // const onRowSelected = (e) => {
//     //     var rows = e.api.getSelectedRows();
//     //     for(var row of rows){
//     //          row.status = 'DELETE';
//     //      }
//     //      setDelData(rows);

//     //     console.log("체크한 delete 정보 : ", delData);
//     // }

//     const deleteItem = () => {
//         var getList = [];
//         const rowsCount = grid.getDisplayedRowCount(); //getDisplayedRowCount - 표시된 행의 총 수를 반환
//         var rows = grid.getSelectedRows(); //선택된 행의 index를 반환 - 예를들어 1,2,3~7번 중에 컨트롤 누르고 2,3번을 선택하면  2와3을 배열로 반환한다.
//         for (var row of rows) {
//             row.status = 'DELETE';
//         }
//         for (var i = 0; i < rowsCount; i++) {
//             getList.push(grid.getRowNode(i).data);
//         }
//         var newList = getList.filter(ele => {
//             if (ele.status !== 'DELETE') {
//                 return ele;
//             }
//         });

//         var delList = getList.filter(ele => {
//             if (ele.status === 'DELETE') {
//                 return ele;
//             }
//         });
//         console.log(delList);
//         setList(newList);
//         // axios 해서 delList 보낸다.
//         try {
//             Api.delBatchList(delList).then(function(respones) {
//                 console.log(respones.data.errorCode);
//                 if (parseInt(respones.data.errorCode) > 0) {
//                     alert('삭제되었습니다.^^ ' + respones.data.errorMsg);
//                 }
//                 if (parseInt(respones.data.errorCode) < 0) {
//                     alert('삭제 실패');
//                 }
//             });
//         } catch (e) {
//             alert(e);
//         }
//     };

//     const updataItem = () => {
//         var rows = grid.getSelectedRows();
//         for (var row of rows) {
//             row.status = 'UPDATE';
//         }
//         console.log(rows);
//         try {
//             Api.rowsBatchList(rows).then(function(respones) {
//                 console.log(respones.data.errorCode);
//                 if (parseInt(respones.data.errorCode) > 0) {
//                     alert('수정되었습니다.^^ ' + respones.data.errorMsg);
//                 }
//                 if (parseInt(respones.data.errorCode) < 0) {
//                     alert('수정실패.');
//                 }
//             });
//         } catch (e) {
//             alert(e);
//         }
//     };

//     const save = () => {
//         console.log('삭제할 delData : ', delData);
//         console.log('수정할 updateDate : ', updateData);
//     };

//     return (
//         <div>
//             <MyGrid
//                 column={columns}
//                 // title={'품 목 조 회'}
//                 list={list}
//                 rowSelection="single"
//                 //onRowSelected={onRowSelected}
//                 api={api}
//                 onGridReady={event => { //onload이벤트와 비슷. ready이후 힐요한 이벤트를 삽입한다.
//                     event.api.sizeColumnsToFit();
//                     setSelectList(event.api);
//                 }}
//             >
//                 <div align="left" style={{ float: 'left' }}>
//                     <SelectItemInfo
//                         getList={getList}
//                         getDivisionCode={getDivisionCode}
//                         getDetailCode={getDetailCode}
//                     />
//                 </div>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     style={{ marginRight: '1vh' }}
//                     onClick={addClick}
//                 >
//                     품목 추가
//                 </Button>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     style={{ marginRight: '1vh' }}
//                     onClick={updataItem}
//                 >
//                     수정사항 저장
//                 </Button>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     style={{ marginRight: '1vh' }}
//                     onClick={deleteItem}
//                 >
//                     선택삭제
//                 </Button>
//             </MyGrid>
//             <MyDialog close={close} open={openDialog}>
//                 <div>
//                     <AddItemDialog onSubmit={onSubmit} />
//                 </div>
//             </MyDialog>
//         </div>
//     );
// }

// export default ItemInfo;

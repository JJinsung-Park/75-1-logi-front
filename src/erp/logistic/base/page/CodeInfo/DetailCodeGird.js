import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
    addDetailCodeList,
    codeDetailList,
    DetailCodeList, saveCodeList,
    saveDetailCodeList,
    searchCodeList
} from 'erp/logistic/base/action/LogisticsInfoAction';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddDetailCode from './AddDetailCode';

function DetailCodeGrid(props) {
    var divisionCodeNo = props.divisionCodeNo;
    
    const dispatch = useDispatch();
    // const detailCodeList = useSelector(state => state.RootReducers.logistic.logisticsinfo.detailCodeList);

    //   if (ele[0].divisionCodeNo === divisionCodeNo) {
    //         return ele;
    //     }
    // });var detailList2 = detailCodeList.filter(ele => {
    //   
    const detailList = useSelector(state => state.RootReducers.logistic.logisticsinfo.detailCodeList);


    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [detailCodeGrid, setDetailCodeGrid] = useState();

    const column = {
        columnDefs: [
            //{ headerName: '잠금',field: "codeUseCheckbox",checkboxSelection: true, width:120 }, //cellRenderer : onCheckClicked
            { headerName: '상세코드구성', field: 'divisionCodeNo' }, //
            { headerName: '상세코드', field: 'detailCode', editable: props.edit},
            { headerName: '상세코드이름', field: 'detailCodeName', editable: props.edit},
            { headerName: '코드사용여부', field: 'description', editable: true },
            { headerName: '코드종류', field: 'codeUseCheck' },
            { headerName: '상태', field: 'status' } //
        ]
    };

    

    const addClick = () => {
        setAddOpenDialog(true);
        if (detailList === undefined) {
            alert('코드를 선택해주세요.');
            close();
        }
    };

    const onCellClicked = params => {
        //const selRow = detailCodeGrid.getSelectedRows();
   
        if (params.colDef.field === 'codeUseCheck') {
            params.data.codeUseCheck = params.data.codeUseCheck === null ? 'N' : null;
            params.data.status = 'UPDATE';
        } else if (params.colDef.field === 'description') {
            params.data.status = 'UPDATE';
        }
        detailCodeGrid.updateRowData({ update: [params.data] });
    };

    const close = () => {
        setAddOpenDialog(false);
    };

    const onSubmit = detailCodeTo => {  //그냥 복붙함.
        dispatch(addDetailCodeList(detailCodeTo));
    
        detailCodeGrid.updateRowData({ add: [detailCodeTo] });
        close();
    };

    const saveClick = () => {
        let detailCodeList = [];
        detailCodeGrid.forEachNode(node => {
            detailCodeList.push(node.data);
        });


        dispatch(saveCodeList(detailCodeList));
    };

    const DetailCodeApi = params => {
        setDetailCodeGrid(params.api);
    };

    const onClick = () => {
        dispatch(codeDetailList({divisionCodeNo}));
    }

    return (
        <>
            <MyGrid
                column={column}
                // title={'상세 코드 관리'}
                list={detailList}
                rowSelection="multiple"
                api={DetailCodeApi}
                onCellClicked={onCellClicked}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onClick}
                >
                    코드상세조회
                </Button>
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    color="secondary"*/}
                {/*    style={{ marginRight: '1vh' }}*/}
                {/*    onClick={addClick}*/}
                {/*>*/}
                {/*    상세코드 추가*/}
                {/*</Button>*/}
                {/*<Button type="button" variant="contained" color="secondary" onClick={saveClick}>*/}
                {/*    상세코드 저장*/}
                {/*</Button> */}
            </MyGrid>
            <MyDialog open={addOpenDialog} close={close}>
                <div>
                    <AddDetailCode divisionCodeNo={divisionCodeNo} onSubmit={onSubmit} />
                </div>
            </MyDialog>
        </>
    );
}

export default DetailCodeGrid;

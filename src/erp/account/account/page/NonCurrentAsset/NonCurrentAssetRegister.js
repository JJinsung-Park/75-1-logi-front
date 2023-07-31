import React ,{useState} from 'react';
import {useSelector , useDispatch} from 'react-redux';
// material-ui
import {Box, Button, Grid, Modal} from '@mui/material';
// material-ui
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import * as types from '../../reducer/AccountReducer';
import {AgGridReact} from "ag-grid-react";


// ==============================|| 고정자산등록 ||============================== //

const NonCurrentAssetRegister = () => {

  const [open, setOpen] = useState(false);

  const assetData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.assetList); //DB에서 받아온 값 을 그리드에뿌리려고 데꼬옴
  const detailData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.assetDta);

  const theme = useTheme();
  const dispatch = useDispatch();

  const searchCurrentData = () => {
    setOpen(true);
    dispatch({
      type: types.SEARCH_CURRENT_REQUEST
    });
  };


  const searchData = (e) => {
   
    setOpen(false);
    dispatch({
      type : types.SEARCH_ASSET_DTA_REQUEST,
      params : {
        parentsCode : e.data.assetCode
      }

    });
  };

  const searchDetailData = (e) => {
    
    dispatch({
      type : types.SEARCH_ASSET_LIST_REQUEST,
      params : {
        parentsCode: e.data.parentsCode
      }
    })
  }

  const detailcolumns = [
    { headerName: '세부자산코드', field: 'assetItemCode', width: 80 },
    { headerName: '세부자산명', field: 'assetItemName', width: 135 },
  ]

  const accountColumnDefs = [
    { headerName: '자 산 코 드', field: 'assetCode', width: 180 },
    { headerName: '자 산 계 정 과 목', field: 'assetName', width: 210 },
    { headerName: '자산번호', field: 'assetNumber', hide: true},
  ];


  return (
      <div>
        <MainCard
            content={false}
            title="고정자산"
            secondary={
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={searchCurrentData} startIcon={<SearchIcon/> }>조회</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}>추가</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary"  startIcon={<DeleteIcon/>}>삭제</Button>
                </Grid>
              </Grid>
            }
        >
          {/* table data grid */}
          <div
              className="ag-theme-balham"
              style={{
                height : 300,
                width : "30%"
              }}
          >
            <AgGridReact
                rowData={detailData}
                columnDefs={detailcolumns}
                pagination={true}
                checkboxSelection
                onCellClicked={searchDetailData}
            />
          </div>
          <Modal open={open}>
            <div align="center">
              <div
                  className="ag-theme-balham"
                  style={{
                    height : 300,
                    width: "60%"
                  }}
              >
                <AgGridReact
                    rowData={assetData}
                    columnDefs={accountColumnDefs}
                    pagination={true}
                    onRowClicked={searchData}
                />
              </div>
            </div>
          </Modal>
        </MainCard>
      </div>
  );
}

export default NonCurrentAssetRegister;
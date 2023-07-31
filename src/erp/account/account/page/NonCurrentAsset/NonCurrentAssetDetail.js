import React, {useState} from 'react';
// material-ui
import {Box, Button, CardContent, Divider, Grid, IconButton, Modal, TextField, Typography} from '@mui/material';
// material-ui
import {useTheme} from '@mui/material/styles';
import * as types from '../../reducer/AccountReducer';
// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import SubCard from '../../../../../template/ui-component/cards/SubCard';

import CloseIcon from '@mui/icons-material/Close';
import {DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import {AgGridReact} from "ag-grid-react";
import * as type from '../../../base/reducer/BaseReducer'



const deptColumn = [
  { headerName: '부 서 코 드', field: 'deptCode', width: 180 },
  { headerName: '부 서 이 름', field: 'deptName', width: 180 },
]

const accountColumnDefs = [
  { headerName: '자 산 계 정 코 드', field: 'assetCode', width: 180 },
  { headerName: '자 산 계 정 과 목', field: 'assetName', width: 210 },
  { headerName: '자산번호', field: 'assetNumber', hide: true},
];


// ==============================|| 고정자산상세 ||============================== //

const NonCurrentAssetDetail= () =>{

  let selectedRow;

  const assetData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.assetList); //DB에서 받아온 값 을 그리드에뿌리려고 데꼬옴
  const detailData = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.detailAssetList);
  const deptData = useSelector((state) => state.RootReducers.AccReducer.BaseReducer.deptList);

  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [deptOpen , SetDeptOpen] = useState(false);
  const [accountOpen , setAccountOpen] = useState(false);
  const [dept , setDept]= useState('');
  const [account , setAccount] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCellClicked = (e) => {
    if(e.colDef.field === 'parentsCode') {
      setAccountOpen(true);
      dispatch({
        type : types.SEARCH_CURRENT_REQUEST
      })
    }
    if(e.colDef.field === 'manageMentDeptName') {
      SetDeptOpen(true);
      dispatch({
        type : type.SEARCH_WORKPLACE_REQUEST
      })
    }
    
  }


  const insertAssetListData = (e) => {
    setAccountOpen(false);
    
    setAccount(e.data.assetCode);
    selectedRow=e.data;
  }

  const insertDeptListData = (e) => {
    SetDeptOpen(false);
   
    setDept(e.data.deptName);
    selectedRow=e.data;
  }

  const Body = React.forwardRef(({modalStyle, handleClose}, ref) => (
      <div ref={ref} tabIndex={-1}>
        <MainCard
            style={modalStyle}
            sx={{
              position: 'absolute',
              width: {xs: 280, lg: 450},
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            title="월상각내역"
            content={false}
            secondary={
              <IconButton onClick={handleClose} size="large">
                <CloseIcon fontSize="small"/>
              </IconButton>
            }
        >
          <CardContent>
            <Grid container spacing={1}>
              <Box
                  sx={{
                    height: 500,
                    width: '100%',
                    '& .MuiDataGrid-root': {
                      border: 'none',
                      '& .MuiDataGrid-cell': {
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                      },
                      '& .MuiDataGrid-columnsContainer': {
                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                      },
                      '& .MuiDataGrid-columnSeparator': {
                        color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                      }
                    }
                  }}
              >
                <DataGrid rows={rows} columns={columns}/>
              </Box>
            </Grid>
            <Typography variant="body2" sx={{mt: 2}}>
              합계
            </Typography>
          </CardContent>
          <Divider/>
        </MainCard>
      </div>
  ));

  return (
      <MainCard
          content={false}
          title="고정자산 상세"
          secondary={
            <Grid container spacing={1}>
              <Grid item>
                <Button variant="contained" color="secondary">등록</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={handleOpen}>월상각내역</Button>
              </Grid>
              <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description">
                <Body handleClose={handleClose}/>
              </Modal>
            </Grid>
          }
      >
        <SubCard>
          <Grid item xs={12} md={10}>
            <Grid container spacing={4} mb={1}>
              <Grid item xs={3}>
                <TextField fullWidth id="outlined-basic" label="관리번호" variant="standard"/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="filled-basic" label="자산명" variant="standard"/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="standard-basic" label="취득일자" variant="standard" />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={3}>
                <TextField fullWidth id="outlined-basic" label="계정과목" onClick={onCellClicked} variant="filled" disabled/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="filled-basic" label="계정과목명" variant="filled" disabled/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="filled-basic" label="관리부서" variant="filled" disabled/>
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={3}>
                <TextField fullWidth id="outlined-basic" label="취득금액" variant="standard"/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="standard-basic" label="내용연수" variant="standard" />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={2}>
              <Grid item xs={3}>
                <TextField fullWidth id="outlined-basic" label="감가상각누계액" variant="filled" disabled/>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth id="filled-basic" label="잔존가치" variant="filled" disabled/>
              </Grid>
            </Grid>
          </Grid>
        </SubCard>
        <Modal open={accountOpen}>
          <div align="center">
            <div
                className="ag-theme-balham"
                style={{
                  height:500,
                  width:"50%"
                }}
            >
              <DataGrid
                  rows={assetData}
                  columns={accountColumnDefs}
                  pageSize={10}
                  onRowClick={insertAssetListData}
                  getRowId={(row)=> row.assetCode}
              />
            </div>
          </div>
        </Modal>
        <Modal open={deptOpen}>
          <div align="center">
            <div
                className="ag-theme-balham"
                style={{
                  height:500,
                  width:"50%"
                }}
            >
              <DataGrid
                  rows={deptData}
                  columns={deptColumn}
                  pageSize={10}
                  onRowClick={insertDeptListData}
                  getRowId={(row)=> row.deptCode}
              />
            </div>
          </div>
        </Modal>
      </MainCard>

  )
}

export default NonCurrentAssetDetail;
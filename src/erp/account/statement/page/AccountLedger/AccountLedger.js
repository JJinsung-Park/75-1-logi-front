// material-ui
import {Box, Button, Grid, TextField , Modal} from '@mui/material';
// material-ui
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import {gridSpacing} from '../../../../../template/store/constant';
import SearchIcon from "@mui/icons-material/Search";
import React,{useState} from "react";
import {useSelector , useDispatch} from 'react-redux';
import * as types from "../../reducer/StatementReducer";
import {SEARCH_ACCOUNT_LIST_REQUEST} from "../../reducer/StatementReducer";
import {AgGridReact} from "ag-grid-react";
import moment from "moment/moment";



// ==============================|| 계정별원장 ||============================== //

const AccountLedger = () => {
  const accountListData = useSelector( state =>state.RootReducers.AccReducer.StatementReducer.accountList);
  const dataAccount = useSelector(state =>state.RootReducers.AccReducer.StatementReducer.accountBean);
  const ledgerListData = useSelector(state =>state.RootReducers.AccReducer.StatementReducer.accountLedgerList);

  const [accountData, setAccountData] = useState('');
  const [nameData , setNamaData] = useState('');
  const [open ,setOpen] = useState(false);

  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';

  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(toDay);

  const theme = useTheme();
  const dispatch = useDispatch();

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: ({value}) => currencyFormatter.format(value),
  };

  const accountColumns = [
    {field: 'accountCode', headerName: '계정코드', width: 280 },
    {field: 'accountName', headerName: '계정명', width: 280  }
  ];

  const AccountLedgerGrid = [
    { headerName: '일자', field: 'reportingDate' },
    { headerName: '회계계정', field: 'accountName' },
    {
      headerName: '차변금액',
      field: 'leftDebtorPrice',
      ...wonPrice,
    },
    {
      headerName: '대변금액',
      field: 'rightCreditsPrice',
      ...wonPrice,
    },
    { headerName: '거래처', field: 'customerName' },
    { headerName: '적요', field: 'expenseReport', width:300 }
  ];


  const searchData = () => {
    setOpen(true);
    dispatch({
      type : types.SEARCH_ACCOUNT_DATA_REQUEST
    })
  }

  const searchAccountData = (e) => {
    setOpen(false);
   
    setNamaData(e.data.accountName);
    setAccountData(e.data.accountCode);
    dispatch({
      type : types.SEARCH_ACCOUNT_LIST_REQUEST,
      params: {
        accountCode: e.data.accountCode,
        accountName: e.data.accountName
      }
    });
  }

  const searchLedgerData = () => {
    dispatch({
      type: types.SEARCH_ACCOUNT_TINFO_REQUEST,
      params:{
        startDate: moment(startDate).format("yyyy-MM-DD"),
        endDate: moment(endDate).format("yyyy-MM-DD"),
        accountCode: accountData,
      }
    })
  }

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item sm={4}>
          <MainCard
              content={false}
              title="계정찾기"
              secondary={
                <div Align="center">
                  <div>
                    <TextField value={nameData} variant={"standard"} sx={{mx: 1, width:130}} placeholder={"계정코드"}/>
                    <Button variant="contained" color="secondary" startIcon={<SearchIcon/>} onClick={searchData}
                            sx={{mx: 1, mb: "10px"}}>검색</Button>
                  </div>
                </div>}

          >
            {/* table data grid */}
            <div
                className="ag-theme-balham"
                style={{
                  height:700,
                  width:"100%"
                }}
            >
              <AgGridReact
                  rowData={dataAccount}
                  columnDefs={accountColumns}
                  pagination={true}
              />
              <Modal open={open}>
                <div align="center">
                  <div
                      className="ag-theme-balham"
                      style={{
                        height : 500,
                        width : "37%"
                      }}
                  >
                    <AgGridReact
                        rowData={accountListData}
                        columnDefs={accountColumns}
                        onCellClicked={searchAccountData}
                    />
                  </div>
                </div>
              </Modal>
            </div>
          </MainCard>
        </Grid>
        <Grid item sm={8}>
          <MainCard
              content={false}
              title="계정별 원장 출력기간"
              secondary={
                <div Align="center">
                  <div>
                    <TextField id="startDate" type={"date"} defaultValue={startDate} variant={"standard"} onChange={(e) => setStartDate(e.target.value)} sx={{mx: 1}}/>
                    <TextField id="endDate" type={"date"} defaultValue={endDate} variant={"standard"} onChange={(e) => setEndDate(e.target.value)} sx={{mx: 1}}/>
                    <Button variant="contained" color="secondary" startIcon={<SearchIcon/>} onClick={searchLedgerData}
                            sx={{mx: 1, mb: "10px"}}>조회</Button>
                  </div>
                </div>
              }
          >
            {/* table data grid */}
            <Box
                sx={{
                  height: 800,
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
              <DataGrid rows={ledgerListData} columns={AccountLedgerGrid} getRowId={(row) => row.reportingDate}/>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
  );
}

export default AccountLedger;
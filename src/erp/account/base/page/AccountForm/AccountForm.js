// material-ui
import {Box, Button, Grid} from '@mui/material';
// material-ui
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import {gridSpacing} from '../../../../../template/store/constant';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as types from '../../reducer/BaseReducer'

const accountColumns = [
  { headerName: '계정과목 코드', field: 'accountInnerCode', width: 100 },
  { headerName: '계정과목', field: 'accountName', width: 250 }
];

const accountDetailcolums = [
    {field: 'accountInnerCode', headerName: '계정과목코드', width: 200},
    {field: 'accountName', headerName: '계정과목명', width: 200}
];

// table data
const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lancaster', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lancaster', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65}
];

// ==============================|| 계정과목관리 ||============================== //

export default function TableBasic() {

  const dispatch = useDispatch();
  const theme = useTheme();

  const accountData = useSelector((state)=>state.RootReducers.AccReducer.BaseReducer.accountCodeList);
  const accountDetailData = useSelector((state)=>state.RootReducers.AccReducer.BaseReducer.accountDetailList);

  useEffect(()=>{
    dispatch({
      type : types.SEARCH_ACCOUNT_REQUEST
    })
  },[])

    const onRowClicked = (e) => {
        
        dispatch({
          type: types.SEARCH_DETAIL_ACCOUNT_REQUEST,
          params:{
            code : e.row.accountInnerCode
          }
        })
    }

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item sm={4}>
          <MainCard
              content={false}
              title="계정"
          >
            {/* table data grid */}
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
              <DataGrid
                  rows={accountData}
                  columns={accountColumns}
                  pageSize={15}
                  rowsPerPageOptions={[5]}
                  getRowId={(row)=>row.accountName}
                  onRowClick={onRowClicked}
              />
            </Box>
          </MainCard>
        </Grid>
        <Grid item sm={8}>
          <MainCard
              content={false}
              title="계정과목"
              secondary={
                <Grid container spacing={1}>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}>추가</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}>삭제</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<SaveIcon/>}>저장</Button>
                  </Grid>
                </Grid>
              }
          >
            {/* table data grid */}
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
              <DataGrid rows={accountDetailData} columns={accountDetailcolums} pageSize={5} rowsPerPageOptions={[5]}
                        checkboxSelection
                        getRowId={(row)=>row.accountInnerCode}
              />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
  );
}

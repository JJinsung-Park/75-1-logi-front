import React, { useState } from "react";
import {useSelector} from 'react-redux';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {useTheme} from '@mui/material/styles';

const JournalFormGrid = () => {
  const data = useSelector( state  => state.RootReducers.AccReducer.AccountReducer.journalList);
  const { isLoading } = useSelector(state => state.RootReducers.AccReducer);

  const theme = useTheme();

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: ({value}) => currencyFormatter.format(value),
  };


  const JournalFoamColumnDefs = [
    { headerName: '계정코드', field: 'accountCode' },
    { headerName: '계정명', field: 'accountName' },
    { headerName: '계정구분', field: 'balanceDivision' },
    {
      headerName: '차변금액',
      field: 'leftDebtorPrice',
      ...wonPrice,
      width: 300
    },
    {
      headerName: '대변금액',
      field: 'rightCreditsPrice',
      ...wonPrice,
      width: 300
    },
    { headerName: '분개번호', field: 'journalNo', width: '300px' }
  ];



  return (
      <div
          style={{
            width:"82%"
          }}>
        <MainCard
            content={false}
            sx={{
              '&MuiCard-root': {color: theme.palette.text.primary}
            }}
        >
          {/* table data grid */}
          <Box
              sx={{
                align : 'center',
                height: 700,
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
                domLayout={'autoHeight'}
                rows={data}
                columns={JournalFoamColumnDefs}
                rowSelection="single"
                pagination={true}
                pageSize={10}
                getRowStyle={function (params) {
                  if(params.data.balanceDivision==="차변"){
                    return{ background: 'aliceblue' }
                  }else(params.data.balanceDivision==="대변")
                  return {background: 'white' }
                }}
                getRowId={(row)=>row.accountCode}
            />
          </Box>
        </MainCard>
      </div>
  );
};

export default JournalFormGrid;

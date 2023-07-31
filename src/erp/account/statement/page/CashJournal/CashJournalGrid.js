import React from "react";
import { useSelector } from "react-redux";
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Box} from "@mui/material";

const CashJournalGrid = () => {
  const theme = useTheme();

  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.cashJournalList);

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: ({value}) => currencyFormatter.format(value),
  };

  const accountColumnDefs = [
    { headerName: "해당월", field: "monthReportingDate", width: 100 },
    { headerName: "일자", field: "reportingDate" },
    { headerName: "적요", field: "expenseReport", width: 180 },
    { headerName: "거래처명", field: "customerName" },
    {
      headerName: "입금",
      field: "deposit",
      width: 172,
      ...wonPrice
    },
    {
      headerName: "출금",
      field: "withdrawal",
      width: 172,
      ...wonPrice
    },
    {
      headerName: "잔액",
      field: "balance",
      width: 172,
      ...wonPrice
    },
  ];


  return (
      <MainCard
          content={false}
          title="전표"
          sx={{
            '&MuiCard-root': {color: theme.palette.text.primary}
          }}
      >
        {/* table data grid */}
        <Box
            sx={{
              height: 600,
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
              rows={data}
              columns={accountColumnDefs}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.reportingDate}
          />
        </Box>
      </MainCard>
  );
};

export default CashJournalGrid;

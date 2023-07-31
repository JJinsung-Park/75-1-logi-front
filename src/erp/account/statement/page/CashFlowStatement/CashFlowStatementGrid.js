import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const CashFlowStatementGrid = () => {
  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.CashFlowList);

  const theme = useTheme();

  const CashFlowStatementGrid = [
    {
      headerName: "과목",
      field: "accountName",
      colId: "과목명",
      cellStyle: {
        textAlign: "left",
        //borderLeft: "0.1mm ridge #c2c2c2",
        borderRight: "0.1mm ridge #c2c2c2",
      },
      width: 150,
    },
    {
      headerName: "당기",
      headerClass: "participant-group",
      marryChildren: true,
      children: [
        {
          headerName: "세부금액",
          field: "cashFlow",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "cashFlowSummary",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
      ],
    },
    {
      headerName: "전기",
      headerClass: "participant-group",
      marryChildren: true,
      children: [
        {
          headerName: "세부금액",
          field: "earlyCashFlow",
          colId: "전기",
          cellStyle: {
            textAlign: "right",
            borderLeft: "0.1mm ridge #c2c2c2",
            //borderRight: "0.1mm ridge #c2c2c2",
          },
          width: 150,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "earlyCashFlowSummary",
          colId: "전기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
      ],
    },
  ];


  return (
      <div>
        <MainCard
            content={false}
            sx={{
              '&MuiCard-root': {color: theme.palette.text.primary}
            }}
        >
          {/* table data grid */}
          <Box
              sx={{
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
            <AgGridReact
                columnDefs={columnDefs}
                rowData={data}
                rowSelection="single"
                getRowStyle={function (param) {
                  if (param.data.lev === 0) {
                    return { background: '#cfdfde' };
                  } else if (param.data.lev === 1 || param.data.lev === 2) {
                    return { background: '#d6e8d0' };
                  }
                }}
                onGridReady={(event) => {
                  event.api.sizeColumnsToFit();
                }}
                domLayout={'autoHeight'}
            />
          </Box>
        </MainCard>
      </div>
  );
};

export default CashFlowStatementGrid;

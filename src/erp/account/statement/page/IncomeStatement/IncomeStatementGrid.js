import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const IncomeStatementGrid = () => {
  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.incomeList);

  const theme = useTheme();

  const IncomeStatementGrid = [
    { headerName: '과목', field: 'accountName', width: 100, cellStyle: { textAlign: 'left', whiteSpace: 'pre' } },
    {
      headerName: '당기',
      headerClass: 'participant-group',
      marryChildren: true,
      children: [
        {
          headerName: '금액',
          field: 'income',
          colId: '당기',
          width: 180,
          valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
        },
        {
          headerName: '잔액',
          field: 'incomeSummary',
          colId: '당기',
          width: 180,
          valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
        }
      ]
    },
    {
      headerName: '전기',
      headerClass: 'participant-group',
      marryChildren: true,
      children: [
        {
          headerName: '금액',
          field: 'earlyIncome',
          colId: '전기',
          width: 180,
          valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
        },
        {
          headerName: '잔액',
          field: 'earlyIncomeSummary',
          colId: '전기',
          width: 180,
          valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"'
        }
      ]
    }
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
          <div
              className="ag-theme-balham"
              style={{
                width:"100%",
                height:1000
              }}
          >
            <AgGridReact
                columnDefs={IncomeStatementGrid}
                rowData={data}
                rowSelection="single"
                getRowStyle={function (param) {
                  //가운데
                  if (param.node.rowPinned) {
                    return { 'font-weight': 'bold', background: '#dddddd' };
                  }
                  return { 'text-align': 'center' };
                }}
                onGridReady={(event) => {
                  event.api.sizeColumnsToFit();
                }}
                domLayout={'autoHeight'}
            />
          </div>
        </MainCard>
      </div>
  );
};

export default IncomeStatementGrid;

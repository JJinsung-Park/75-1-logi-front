import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";
import {SEARCH_TOTALTRIAL_REQUEST} from "../../reducer/StatementReducer";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";

function FinancialStatementsGrid(props) {
  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.financialPositionList);

  const { isLoading } = useSelector(state => state.RootReducers.AccReducer.StatementReducer);

  const theme = useTheme();

  const FinancialStatementGrid = [
    {
      headerName: "과목",
      field: "accountName",
      colId: "과목명",
      cellStyle: {
        textAlign: "left",
        borderRight: "0.1mm ridge #c2c2c2",
      },
      width: 150,
    },
    {
      headerName: "당기",
      headerClass: "participant-group",
      marryChildren: true,
      width: 150,
      children: [
        {
          headerName: "세부금액",
          field: "balanceDetail",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 200,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "balanceSummary",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 200,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
      ],
    },
    {
      headerName: "전기",
      headerClass: "participant-group",
      marryChildren: true,
      width: 150,
      children: [
        {
          headerName: "세부금액",
          field: "preBalanceDetail",
          colId: "전기",
          cellStyle: {
            textAlign: "right",
            borderLeft: "0.1mm ridge #c2c2c2",
          },
          width: 200,
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "preBalanceSummary",
          colId: "전기",
          cellStyle: { textAlign: "right" },
          width: 200,
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
          <div
              className="ag-theme-balham"
              style={{
                width: "100%",
                height:1000
              }}
          >
            <AgGridReact
                columnDefs={FinancialStatementGrid}
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
          </div>
        </MainCard>
      </div>
  );
}

export default FinancialStatementsGrid;

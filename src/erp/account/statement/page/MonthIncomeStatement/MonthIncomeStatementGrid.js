import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Box} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {DataGrid} from "@mui/x-data-grid";

const MonthIncomeStatementGrid = () => {
  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.monthIncomeList);

  const theme = useTheme();

  const currencyFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  const wonPrice = {
    type: 'number',
    valueFormatter: ({value}) => currencyFormatter.format(value),
  };

  const MonthIncomeStatementGrid = [
    {
      headerName: "연도",
      field: "year",
      hide: true,
      width:"150",
    },
    {
      headerName: "월",
      field: "month",
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: "grid-cell-centered",
      width: 50
    },
    {
      headerName: "매출액",
      field: "salesSummary",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "매출원가",
      field: "salesCostSummary",
      background: "red",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "매출총액",
      field: "grossMargin",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "판관비",
      field: "salesManageCostSummary",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "영업이익",
      field: "operatingProfit",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "영업외수익",
      field: "nonOperatingProfitSummary",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "영업외비용",
      field: "nonOperatingCostSummary",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "법인세차감전이익",
      field: "ordinaryProfit",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "법인세",
      field: "corporateTaxSummary",
      ...wonPrice,
      width: 150
    },
    {
      headerName: "당기순이익",
      field: "netIncome",
      ...wonPrice,
      width: 150
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
                width:"100%",
                height:500
              }}
          >
            <DataGrid
                columns={MonthIncomeStatementGrid}
                rows={data}
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
                getRowId={(row) => row.month}
            />
          </div>
        </MainCard>
      </div>
  );
};

export default MonthIncomeStatementGrid;

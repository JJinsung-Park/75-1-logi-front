import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useSelector } from "react-redux";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {useTheme} from "@mui/material/styles";
import {AgGridReact} from "ag-grid-react";


const TotalTrialBalanceGrid = () => {
  const data = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.totaltrialList);

  const theme = useTheme();

  const currencyFormatter = (params) => {
    return formatNumber(params.value) + ' 원';
  };

  const formatNumber = (number) => {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const  columnDefs = [
    {
      headerName: '차변 잔액',
      field: 'debitsSumBalance',
      valueFormatter: currencyFormatter,
      width: 250
    },
    {
      headerName: '차변 합계',
      field: 'debitsSum',
      valueFormatter: currencyFormatter,
      width: 250
    },
    { headerName: ' 계정 과목 ', field: 'accountName' },
    {
      headerName: '대변 합계',
      field: 'creditsSum',
      valueFormatter: currencyFormatter,
      width: 250
    },
    {
      headerName: '대변 잔액',
      field: 'creditsSumBalance',
      valueFormatter: currencyFormatter,
      width: 250
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
                height: 1000,
                width : "100%"
              }}
          >
            <AgGridReact
                columnDefs={columnDefs}
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
            />
          </div>
        </MainCard>
      </div>
  );
};

export default TotalTrialBalanceGrid;

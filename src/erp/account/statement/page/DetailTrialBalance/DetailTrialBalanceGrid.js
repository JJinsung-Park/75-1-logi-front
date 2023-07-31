import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {useTheme} from "@mui/material/styles";

const DetailTrialBalanceGrid = () => {
  const data = useSelector(state => state.RootReducers.AccReducer.StatementReducer.detailTrialBalanceList);

  const theme = useTheme();


  const columnDefs = [
    {
      headerName: "계층",
      field: "lev",
      width: 250,
      hide: "true",
    },
    {
      headerName: "계정내부코드",
      field: "accountInnerCode",
      width: 250,
      hide: "true",
    },
    {
      headerName: "차변",
      cellStyle: {
        textAlign: "center"
      },
      children: [
        {
          headerName: "계",
          field: "debitsSum",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {textAlign: "right"},
        },
        {
          headerName: "대체",
          field: "exceptCashDebits",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {textAlign: "right"},
        },
        {
          headerName: "현금",
          field: "cashDebits",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {textAlign: "right"},
        },
      ],
    },
    {
      headerName: "개정과목",
      field: "accountName",
      width: 180,
      cellStyle: {
        textAlign: "center",
        borderLeft: "0.1mm ridge #c2c2c2",
        borderRight: "0.1mm ridge #c2c2c2",
      },
      resizable: true,
    },
    {
      headerName: "대변",
      children: [
        {
          headerName: "현금",
          field: "cashCredits",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {
            textAlign: "right",
          },
        },
        {
          headerName: "대체",
          field: "exceptCashCredits",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {
            textAlign: "right",
            //background: "black"
          },
        },
        {
          headerName: "계",
          field: "creditsSum",
          valueFormatter:
              ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
          cellStyle: {textAlign: "right"},
        },
      ],
    },
  ];

  return (
      <div style={{
        width:"88%"
      }}>
        <MainCard
            content={false}
            sx={{
              '&MuiCard-root': {color: theme.palette.text.primary}
            }}
        >
          {/* table data grid */}
          <div
              style={{
                height:500,
                width:"100%"
              }}
              className="ag-theme-balham">
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
                pagination={true}
            />
          </div>
        </MainCard>
      </div>
  );
};

export default DetailTrialBalanceGrid;

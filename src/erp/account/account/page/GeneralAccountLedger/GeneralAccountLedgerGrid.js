import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useThemeSwitcher } from 'mui-theme-switcher';
// material-ui
import {Box} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';

// project imports
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import {AgGridReact} from "ag-grid-react";


const GeneralAccountLedgerGrid = (props) => {
  const data = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.generalAccountLedgerList);

  const theme = useTheme();

  const JournalFoamColumnDefs = [
    { headerName: '일자', field: 'reportingDate' },
    { headerName: '회계계정', field: 'accountName' },
    {
      headerName: '차변금액',
      field: 'leftDebtorPrice',
      valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
    },
    {
      headerName: '대변금액',
      field: 'rightCreditsPrice',
      valueFormatter: ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"'
    },
    { headerName: '거래처', field: 'customerName' },
    { headerName: '적요', field: 'expenseReport' }
  ];



  return (
      <>
        <MainCard
            content={false}
            sx={{
              '&MuiCard-root': {color: theme.palette.text.primary}
            }}
        >
          <div className="ag-theme-balham">
            <AgGridReact
                domLayout={'autoHeight'}
                columnDefs={JournalFoamColumnDefs}
                rowData={data}
                rowSelection="single"
                //onCellClicked={onCellClicked}
                onGridReady={(params) => {
                  props.setGeneralAccountLedgerGrid(params.api);
                  params.api.sizeColumnsToFit();
                  //params.api.setQuickFilter(props.filterChanged);
                }}
                getRowStyle={(param) => ({ 'text-align': 'center' })}
                onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                pagination={true}
            />
          </div>
        </MainCard>
      </>
  );
};

export default GeneralAccountLedgerGrid;

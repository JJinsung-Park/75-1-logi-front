import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../reducer/StatementReducer";
import {useTheme} from "@mui/material/styles";
import {gridSpacing} from "../../../../../template/store/constant";
import {Box, Grid, Modal, Button,Typography } from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const CashFlowStatementMenu = () => {
  const list = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.periodNoList);

  const theme = useTheme();
  const dispatch = useDispatch();
  const [open , setOpen] = useState(false);

  const periodListData = () => {
    setOpen(true);
    dispatch({
      type: types.SEARCH_PERIOD_NO_REQUEST
    });
  };

  const searchData = (e) => {
    dispatch({
      type: types.SEARCH_CASHFLOW_REQUEST,
      params: {
        searchData : e.row.periodEndDate
      },
    });
  };

  const columns = [
    {
      headerName: '회계 기수',
      field: 'accountPeriodNo',
      width: 250
    },
    {
      headerName: '회계 시작일',
      field: 'periodStartDate',
      width: 250
    },
    { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
  ]

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div Align="center">
            <Typography variant="h3">[ 검색조건 ]</Typography>
            <div>
              <Button onClick={periodListData} variant="contained" color="secondary">
                회계 기수조회
              </Button>
              <Modal open={open}>
                <Box
                    sx={{

                      height: 400,
                      width: '50%',
                      backgroundColor: 'white',
                      border: '1px solid black'
                    }}
                >
                  <DataGrid
                      rows={list}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      getRowId={(row) => row.accountPeriodNo}
                      onCellClick={searchData}
                  />
                </Box>
              </Modal>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};


export default CashFlowStatementMenu;

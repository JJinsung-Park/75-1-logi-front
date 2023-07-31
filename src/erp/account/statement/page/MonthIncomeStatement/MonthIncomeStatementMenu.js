import React, { useState } from "react";
import moment from "moment";
import {TextField, Button, makeStyles, Typography, Grid, Modal, Box} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../reducer/StatementReducer";
import {useTheme} from "@mui/material/styles";
import {gridSpacing} from "../../../../../template/store/constant";
import {DataGrid} from "@mui/x-data-grid";

const MonthIncomeStatementMenu = () => {
  const list = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.periodNoList);

  const theme = useTheme();
  const dispatch = useDispatch();
  const [open , setOpen] = useState(false);
  const callResult = 'SEARCH';

  const periodListData = () => {
    setOpen(true);
    dispatch({
      type: types.SEARCH_PERIOD_NO_REQUEST
    });
  };


  const searchData = (e) => {
    setOpen(false);
    
    dispatch({
      type: types.SEARCH_MONTH_INCOME_REQUEST,//이부분 바꿔야됨
      params: {
        searchDate: e.row.periodEndDate
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
                <div align="center">
                  <div
                      align="center"
                      className="ag-theme-balham"
                      style={{
                        width:"50%",
                        height:500,
                        background : "white"
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
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};

export default MonthIncomeStatementMenu;

import React, { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import {Box, Button, Grid, Modal, TextField, Typography} from "@mui/material";
import * as types from "../../reducer/StatementReducer";
import {gridSpacing} from "../../../../../template/store/constant";
import {DataGrid} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";



const TotalTrialBalanceMenu = () => {

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
      type: types.SEARCH_TOTALTRIAL_REQUEST,
      params: {
        accountPeriodNo: e.id, //2
        callResult: callResult //SEARCH
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
                      onRowClick={searchData}
                  />
                </div>
              </Modal>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};


export default TotalTrialBalanceMenu;

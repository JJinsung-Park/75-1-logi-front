import React, { useCallback, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../reducer/StatementReducer";
import {useTheme} from "@mui/material/styles";
import {gridSpacing} from "../../../../../template/store/constant";
import {Box, Grid, Modal, Button, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const DetailTrialBalanceMenu = () => {
  //년도 가져오는데이터
  const yearList = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.periodNoList);
  //월 가져오는 데이터
  const monthList = useSelector((state) => state.RootReducers.AccReducer.StatementReducer.monthList);

  const [monthOpen , setMonthOpen] = useState(false);
  const [month, setMonth] = useState('');

  const [yearOpen , yearSetOpen] = useState(false);
  const [year, setYear] = useState('');

  const dispatch = useDispatch();

  const yearListData = () => {
    yearSetOpen(true);
    dispatch({
      type: types.SEARCH_PERIOD_NO_REQUEST
    });
  };




  //월계표 월 그리드 칼럼
  const monthColumns = [
    {
      headerName : "조회 월",
      field : 'month',
      width : 250
    },
    {
      headerName : "시작월일",
      field : 'monthStartDate',
      width : 250
    },
    {
      headerName : "종료월일",
      field : 'monthEndDate',
      width : 250
    }
  ]

  //월계표 년도 그리드 칼럼
  const yearColumns = [
    {
      headerName: "회계 년도",
      field : 'fiscalYear'
    },
    {
      headerName: '회계 시작일',
      field: 'periodStartDate',
      width: 250
    },
    { headerName: '회계 종료일', field: 'periodEndDate', width: 250 }
  ];

  const searchMonthData = (e) => {
    setMonthOpen(false);
    
    setMonth(e.row.month);
    dispatch({
      type : types.SEARCH_DETAILTRIAL_REQUEST,
      params : {
        fromDate : year+"-"+e.row.monthStartDate, // 달의 첫날
        toDate : year+"-"+e.row.monthEndDate // 달의 마지막날
      }
    })
  };

  const searchYearData = (e) => {
    yearSetOpen(false); // 기존모달을 닫고
    setYear(e.row.fiscalYear); // 년도를 useState로 저장
    setMonthOpen(true); // 새 모달을 열기
    dispatch({
      type: types.SEARCH_MONTH_DATA_REQUEST
    });
  }


  return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div Align="center">
            <div>
              <Typography variant="h3" gutterBottom>
                {year}년 {month}월
              </Typography>
              <Button onClick={yearListData} variant="contained" color="secondary">
                월계표 조회
              </Button>
              <Modal open={yearOpen}>
                <div
                    align="center"
                    style={{
                      height: 400,
                      width: '100%',
                    }}
                >
                  <Box
                      sx={{
                        height: 400,
                        width: '40%',
                        background: 'white',

                      }}
                  >
                    <DataGrid
                        rows={yearList}
                        columns={yearColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row) => row.accountPeriodNo}
                        onRowClick={searchYearData}
                    />
                  </Box>
                </div>
              </Modal>
              <Modal open={monthOpen}>
                <div
                    align="center"
                    style={{
                      height: 400,
                      width: '100%',
                    }}
                >
                  <Box
                      sx={{
                        height: 400,
                        width: '40%',
                        background: 'white',

                      }}
                  >
                    <DataGrid
                        rows={monthList}
                        columns={monthColumns}
                        pageSize={12}
                        rowsPerPageOptions={[5]}
                        getRowId={(row) => row.month}
                        onRowClick={searchMonthData}
                    />
                  </Box>
                </div>
              </Modal>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};


export default DetailTrialBalanceMenu;

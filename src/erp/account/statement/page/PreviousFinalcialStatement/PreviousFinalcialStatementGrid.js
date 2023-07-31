//************************* 2020-11-26 전기분재무상태표 시작 최지은&노원찬 *************************
import React from "react";
import useStyles from "./Theme";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { Grid, AppBar, Typography, Toolbar, Paper } from "@mui/material";
import { useThemeSwitcher } from "mui-theme-switcher";
import {useTheme} from "@mui/material/styles";

const PreviousFinalcialStatementGrid = () => {
  const theme = useStyles(); //CSS

  const onGridReady = params => {
    params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
  };

  const previousFinalcialList = useSelector(
      state => state.RootReducers.AccReducer.StatementReducer.financialPositionList);

  const liabilities = []; //부채,자본리스트
  const assets = []; //자산리스트
  const total = []; //총계리스트
  if (previousFinalcialList) {
    previousFinalcialList.map(v => {
      if (v.category === "자산" && v.lev === 3) {
        assets.push(v);
      } else if (
          (v.category === "부채" || v.category === "자본") &&
          v.lev === 3
      ) {
        liabilities.push(v);
      } else {
        total.push(v);
      }
    });
   
  }

  //색 구분
  const levStyle = params => {
    var lev = params.data.lev;
    
    return lev == 0
        ? { background: "#FFB69E" }
        : lev == 1
            ? { background: "#E4F7BA" }
            : lev == 2
                ? { background: "#FAF4C0" }
                : null;
  };

  //그리드 칼럼
  const AssetsColumnDefs = [
    { headerName: "코드", field: "accountCode", width: 100 },
    { headerName: "계정과목", field: "accountName", width: 120 },
    {
      headerName: "금액",
      field: "preBalanceSummary",
      width: 100,
      valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
  ];
  const DebtAndEquityDefs = [
    { headerName: "코드", field: "accountCode", width: 100 },
    { headerName: "계정과목", field: "accountName", width: 120 },
    {
      headerName: "금액",
      field: "preBalanceSummary",
      width: 100,
      valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
  ];

  const TotalDefs = [
    { headerName: "계정과목", field: "accountName", width: 120 },
    {
      headerName: "합계",
      field: "preBalanceSummary",
      width: 100,
      valueFormatter:
          ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
    },
  ];

  const { dark } = useThemeSwitcher();

  return (
      <React.Fragment>
        <Grid container spacing={3}>
          <br />
          <Grid item xs={4}>
            <Paper className={theme.Paper}>
              <AppBar position="relative" className={theme.subCategory}>
                <Toolbar>
                  <Typography variant="h2" color={"white"}>자산</Typography>
                </Toolbar>
              </AppBar>
              <div
                  className={dark ? "ag-theme-balham-dark" : "ag-theme-balham"}
                  style={{
                    height: "94%",
                    width: "100%",
                    paddingTop: "20px",
                  }}
              >
                <AgGridReact
                    getRowStyle={levStyle}
                    columnDefs={AssetsColumnDefs}
                    rowData={assets}
                    rowSelection="single" //행 선택유형
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true} //페이지당 로드 할 행의 수가 자동으로 조정
                    pagination={true} //페이지 매김
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={theme.Paper}>
              <AppBar position="relative" className={theme.subCategory}>
                <Toolbar>
                  <Typography variant="h2" color={"white"}>자본및부채</Typography>
                </Toolbar>
              </AppBar>
              <div
                  className={dark ? "ag-theme-balham-dark" : "ag-theme-balham"}
                  style={{
                    height: "94%",
                    width: "100%",
                    paddingTop: "20px",
                  }}
              >
                <AgGridReact
                    getRowStyle={levStyle}
                    columnDefs={DebtAndEquityDefs}
                    rowData={liabilities}
                    rowSelection="single" //행 선택유형
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true}
                    pagination={true}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={theme.Paper}>
              <AppBar position="relative" className={theme.subCategory}>
                <Toolbar>
                  <Typography variant="h2" color={"white"}>합계</Typography>
                </Toolbar>
              </AppBar>
              <div
                  className={"ag-theme-balham"}
                  style={{
                    height: "94%",
                    width: "100%",
                    paddingTop: "20px",
                  }}
              >
                <AgGridReact
                    getRowStyle={levStyle}
                    columnDefs={TotalDefs}
                    rowData={total}
                    rowSelection="single" //행 선택유형
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true}
                    pagination={true}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
  );
};

export default PreviousFinalcialStatementGrid;

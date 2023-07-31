import React, { useState } from "react";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import {useTheme} from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { Button, Grid, TextField, Typography} from '@mui/material';
import * as types from "../../reducer/StatementReducer";

import {gridSpacing} from '../../../../../template/store/constant';

const CashJournalMenu = () => {
  const theme = useTheme();

  let year = moment(new Date()).format("yyyy");
  let month = moment(new Date()).format("MM");
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format("yyyy-MM-DD");
  let monthFirstDay = year + "-" + month + "-01";

  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(monthFirstDay);
  const [toDate, setToDate] = useState(toDay);

  const searchData = () => {
    dispatch({
      type: types.SEARCH_CASHJOURNAL_REQUEST,
      params: {
        fromDate: fromDate,
        toDate: toDate,
      },
    });
  };

  return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div Align="center">
            <Typography variant="h3">[ 검색조건 ]</Typography>
            <div>
              <TextField id="startDate" type={"date"} variant={"standard"}  defaultValue={fromDate} //defaultValue : 초기값.
                         onChange={(e) => setFromDate(e.target.value)} sx={{mx: 1}}/>
              <TextField id="endDate" type={"date"} variant={"standard"}  defaultValue={toDate}
                         onChange={(e) => setToDate(e.target.value)} sx={{mx: 1}}/>
              <Button variant="contained" color="secondary" startIcon={<SearchIcon/>} onClick={searchData}
                      sx={{mx: 1, mb: "10px"}}>조회</Button>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};


export default CashJournalMenu;

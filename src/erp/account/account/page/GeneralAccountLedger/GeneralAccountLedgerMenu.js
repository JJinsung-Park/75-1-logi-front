import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../reducer/AccountReducer';
import moment from 'moment';

// material-ui
import { Button, Grid, TextField, Typography} from '@mui/material';
import {gridSpacing} from '../../../../../template/store/constant'
import {useTheme} from '@mui/material/styles';
// project imports
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const GeneralAccountLedgerMenu = (props) => {

  const theme = useTheme();

  let year = moment(new Date()).format('yyyy');
  let month = moment(new Date()).format('MM');
  //let date = moment(new Date()).format("DD");
  let toDay = moment(new Date()).format('yyyy-MM-DD');
  let monthFirstDay = year + '-' + month + '-01';
  const data = useSelector((state) => state.RootReducers.AccReducer.AccountReducer.generalAccountLedgerList);

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(monthFirstDay);
  const [endDate, setEndDate] = useState(toDay);

  const searchData = () => {
    dispatch({
      type: types.SELECT_GENERAL_ACCOUNT_LEDGER_START,
      params: {
        startDate: moment(startDate).format('yyyy-MM-DD'),
        // moment라이브러리를 통해 날짜를 가져온다.
        endDate: moment(endDate).format('yyyy-MM-DD')
      }
    });
  };
  

  return (
      <>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <div Align="center">
              <Typography variant="h3">[ 검색조건 ]</Typography>
              <div>
                <TextField
                    style={{ width: '20ch' }}
                    disabled={data.length === 0 ? true : false}
                    //required
                    id="outlined-select-currency"
                    //select
                    label="조건내 검색"
                    variant="outlined"
                    name="division"
                    onChange={(e) => props.generalAccountLedgerGrid.setQuickFilter(e.target.value)}
                    margin="normal"
                    size="small"
                />
                <TextField id="startDate" type={"date"} defaultValue={startDate} variant={"standard"} onChange={(e) => setStartDate(e.target.value)} sx={{mx: 1}}/>
                <TextField id="endDate" type={"date"} defaultValue={endDate} variant={"standard"} onChange={(e) => setEndDate(e.target.value)} sx={{mx: 1}}/>
                <Button variant="contained" color="secondary" onClick={searchData} startIcon={<SearchIcon/>}
                        sx={{mx: 1, mb: "10px"}}>조회</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </>
  );
};

export default GeneralAccountLedgerMenu;

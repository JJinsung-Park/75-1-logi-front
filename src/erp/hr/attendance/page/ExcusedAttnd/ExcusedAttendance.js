import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";

import axios from "axios";

import useInput from "util/useInput";
import moment from "moment";


// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
import ExcusedAttdProfile from './ExcusedAttdProfile';
import MainCard from 'template/ui-component/cards/MainCard';
import { gridSpacing } from 'template/store/constant';


const ExcusedAttendance = props => {

  const theme = useTheme();

  //사원코드 임시등록
  sessionStorage.setItem("empCodeInfo_token","A490073");
  sessionStorage.setItem("empNameInfo_token","락창카이");

  const empCode = sessionStorage.getItem("empCodeInfo_token");
  const empName = sessionStorage.getItem("empNameInfo_token");


  // // useInputs : state등록하는 함수

  // const insertExcusedAttd = () => {

  //   props.handleInsertExcusedAttd(empCode,
  //     restTypeCode,
  //     restTypeName,
  //     requestDate,
  //     startDate,
  //     endDate,
  //     numberOfDays,
  //     cause,
  //     applovalStatus,
  //     startTime,
  //     endTime,);

  // };

  return (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <MainCard title="근태외 신청" content={false}>
                <Grid container spacing={gridSpacing}>
                    
                    <Grid item xs={12} lg={12}>
                        <CardContent
                            sx={{
                                borderLeft: '1px solid',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                                height: '100%'
                            }}
                        >
                                {/* 유저프로필에 props 전달 */}
                                <ExcusedAttdProfile  empCode={empCode} empName={empName}  handleInsertExcusedAttd={props.handleInsertExcusedAttd} />
                            
                        </CardContent>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                   
                </CardActions>
            </MainCard>
        </Grid>
    </Grid>
);
};
export default ExcusedAttendance;

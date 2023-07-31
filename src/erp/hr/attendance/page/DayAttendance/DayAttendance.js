import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";

import axios from "axios";
import EmpProfile from "./EmpProfile";
import useInput from "util/useInput";
import moment from "moment";

import PropTypes from 'prop-types';


// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
import UserProfile from './UserProfile';
import useConfig from 'template/hooks/useConfig';
import MainCard from 'template/ui-component/cards/MainCard';
import AnimateButton from 'template/ui-component/extended/AnimateButton';
import { gridSpacing } from 'template/store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';

import AttdTable from './AttdTable';

// tabs
function TabPanel({ children, value, index, ...other }) {
  return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
          {value === index && <div>{children}</div>}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
      label: '일근태 등록',
      icon: <PersonOutlineTwoToneIcon />,
      caption: 'Time Settings'
  },
  {
      label: '일근태 조회',
      icon: <PersonOutlineTwoToneIcon />,
      caption: 'All DayAttendance'
  },
];


const DayAttendance = props => {

  const theme = useTheme();
    const { borderRadius } = useConfig();
    const [value, setValue] = useState(0);


  //사원코드 임시등록
  sessionStorage.setItem("empCodeInfo_token","A490073");
  sessionStorage.setItem("empNameInfo_token","락창카이");


  const empCode = sessionStorage.getItem("empCodeInfo_token");
  const empName = sessionStorage.getItem("empNameInfo_token");
 

  // useInputs : state등록하는 함수

  // 현재시간
  let thisTime = moment().format("HH:mm");
  // 오늘 날짜
  let today = moment().format("YYYY-MM-DD");
  // 적용일
  const [applyDay, setApplyDay] = useState(today);
  // 근태구분코드
  const attdType = useInput();
  // 근태구분명
  const attdTypeName = useInput();
  // 출퇴근시간
  const [time, setTime] = useState(thisTime);

  const [delData, setDelData] = useState([]);

  useEffect(() => {
  
    props.handleDayAttd(applyDay, empCode);
  }, []);

  const searchDayAttd = () => {
    
    props.handleDayAttd(applyDay, empCode);
  
  };


  // 프로필의 값을 가져오는 함수
  const profileData = (sendData)=>{
   
  }

 


  const handleChange = (event, newValue) => {
    setValue(newValue);
    searchDayAttd();
};

  return (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <MainCard title="일근태 등록" content={false}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={3}>
                        <CardContent>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                orientation="vertical"
                                variant="scrollable"
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: 'none'
                                    },
                                    '& button': {
                                        color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                                        minHeight: 'auto',
                                        minWidth: '100%',
                                        py: 1.5,
                                        px: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        borderRadius: `${borderRadius}px`
                                    },
                                    '& button.Mui-selected': {
                                        color: theme.palette.primary.main,
                                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                                    },
                                    '& button > svg': {
                                        marginBottom: '0px !important',
                                        marginRight: 1.25,
                                        marginTop: 1.25,
                                        height: 20,
                                        width: 20
                                    },
                                    '& button > div > span': {
                                        display: 'block'
                                    },
                                    '& > div > span': {
                                        display: 'none'
                                    }
                                }}
                            >
                                {tabsOption.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        icon={tab.icon}
                                        label={
                                            <Grid container direction="column">
                                                <Typography variant="subtitle1" color="inherit">
                                                    {tab.label}
                                                </Typography>
                                                <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                    {tab.caption}
                                                </Typography>
                                            </Grid>
                                        }
                                        {...a11yProps(index)}
                                    />
                                ))}
                            </Tabs>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <CardContent
                            sx={{
                                borderLeft: '1px solid',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                                height: '100%'
                            }}
                        >
                            <TabPanel value={value} index={0}>
                                {/* 유저프로필에 props 전달 */}
                                <UserProfile time={time} today={today} empCode={empCode} profileData={profileData} handleInsertDayAttd={props.handleInsertDayAttd}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* 조회텝 눌렀을때  */}
                                <AttdTable DayAttdTO={props.attdData.DayAttdTO}/>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                            </TabPanel>
                        </CardContent>
                    </Grid>
                </Grid>
                <Divider />
                <CardActions>
                    <Grid container justifyContent="space-between" spacing={0}>
                        <Grid item>
                            {value > 0 && (
                                <AnimateButton>
                                    <Button variant="outlined" size="large" onClick={(e) => handleChange(e, value + 1)}>
                                        Back
                                    </Button>
                                </AnimateButton>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </MainCard>
        </Grid>
    </Grid>
);
};
export default DayAttendance;

//**************************************** 2020-11-25 권은비 시작 ****************************************

import React, { useState } from 'react';
import UseStyles from "erp/hr/util/UseStyles";
import {
    Paper,
    AppBar,
    Tab,
  } from "@material-ui/core";
  import TabContext from "@material-ui/lab/TabContext";
  import { TabList, TabPanel } from "@material-ui/lab";
  import BasicInfo from "./BasicInfo";
  import WorkInfo from "./WorkInfo";
  import CareerInfo from "./CareerInfo";
  import EducationInfo from "./EducationInfo";
  import FamilyInfo from "./FamilyInfo";

function EmpDetailedInfo(props) {

    const classes = UseStyles();
    const [value, setValue] = React.useState("3");
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
        <div>
            
                <Paper className={classes.rightPaper}>
                    <TabContext value={value}>
                        <AppBar position="static">
                            <TabList
                                onChange={handleChange}
                            //aria-label="simple tabs example"
                            //centered 

                            >
                                <Tab label="기본정보" value="3" />
                                <Tab label="재직정보" value="4" />
                                <Tab label="경력정보" value="5" />
                                <Tab label="학력정보" value="6" />
                                <Tab label="가족정보" value="7" />
                            </TabList>
                        </AppBar>


                        <TabPanel value="3">
                           <BasicInfo/>
                        </TabPanel>
                        <TabPanel value="4">
                            <WorkInfo/>
                        </TabPanel>
                        <TabPanel value="5">
                            <CareerInfo/>
                        </TabPanel>
                        <TabPanel value="6">
                            <EducationInfo/>
                         </TabPanel>
                        <TabPanel value="7">
                            <FamilyInfo/>
                        </TabPanel>
                    </TabContext>
                </Paper>
           
        </div>
    );
}

export default EmpDetailedInfo;


//**************************************** 2020-11-20 권은비 종료 ****************************************
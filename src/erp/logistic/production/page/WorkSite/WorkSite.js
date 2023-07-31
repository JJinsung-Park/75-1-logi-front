import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@mui/material/styles';
import WorkSiteProcess from 'erp/logistic/production/page/WorkSite/WorkSiteProcess';
import WorkSiteLog from 'erp/logistic/production/page/WorkSite/WorkSiteLog';
import {Link} from "react-router-dom";
import { Box, Tab, Tabs } from '@mui/material';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
// import {TabPanel} from "@mui/lab";
//****************************2020-11-25 박미노****************************************** */

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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


function WorkSite() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper
        }
    }));
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        // <div className={classes.root}>
        //     <AppBar position="static">
        //         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        //             <Tab label="일반 거래처" />
        //             <Tab label="금융 거래처" />
        //         </Tabs>
        //     </AppBar>
        //     {value === 0 && <NomalClientInfo />}
        //     {value === 1 && <FinanceClientInfo />}
        // </div>
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        fontWeight: 'bold',
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
                        mr: 2.25,
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.secondary.main
                    },
                    '& a > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25
                    },
                    mb: 3
                }}
            >
                <Tab component={Link} to="#" label="작업장"  {...a11yProps(0)}/>
                <Tab component={Link} to="#" label="작업장 로그"  {...a11yProps(1)}/>
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <WorkSiteProcess />
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <WorkSiteLog />
            </TabPanel>

        </MainCard>
    );
}

export default WorkSite;

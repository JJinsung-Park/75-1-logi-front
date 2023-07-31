import {Box, Tab, Tabs} from '@mui/material';
import React from 'react';
import DeliverySearch from './DeliverySearch';
import DeliveryInfo from './DeliveryInfo';
import MainCard from "../../../../../template/ui-component/cards/MainCard";
import {Link} from "react-router-dom";
import {useTheme, makeStyles} from "@mui/styles";
import PropTypes from "prop-types";

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

function Delivery(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = makeStyles
    ((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    return (
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
                <Tab component={Link} to="#" label="납품"  {...a11yProps(0)}/>
                <Tab component={Link} to="#" label="납품현황"  {...a11yProps(1)}/>
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <DeliverySearch/>
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <DeliveryInfo/>
            </TabPanel>

        </MainCard>
    );
}

export default Delivery;
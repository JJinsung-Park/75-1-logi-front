import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React, { Fragment, useState } from 'react';
import Deploy from './Deploy/Deploy';
import Regist from './Regist/Regist';
import './styles.css';
import MainCard from 'template/ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function TabPanel(props) {
    const { children, value, index, ...other } = props;  // children : Deploy, Regist 컴포넌트! , value & index : 0 or 1

    return (
        <>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </>
        // <div
        //     role="tabpanel"
        //     hidden={value !== index}
        //     id={`full-width-tabpanel-${index}`}
        //     aria-labelledby={`full-width-tab-${index}`}
        //     {...other}
        // >
        // {value === index && (
        //     <Box p={3}>
        //         <Typography>{children}</Typography>
        //     </Box>
        // )}
        // </div>
    );
}

const LogisticsBOM = (props) => {

    const useSytles = makeStyles(theme => ({
        bar: {
            background: "primary",
            color: "white",
            width: "100%",
            height: "50px",
            fontSize: 20
        }
    }));

    const classes = useSytles();
    const [value, setValue] = useState(0);
    const [deployCondition, setDeployCondition] = useState();
    const [itemCode, setItemCode] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    function allyProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }
    return (
        <>

            <MainCard>
                <Tabs value={value} onChange={handleChange} >
                    <Tab component={Link} to="#" label="BOM 정전개 / 역전개" {...allyProps(0)} />
                    <Tab component={Link} to="#" label="BOM 등록 / 수정" {...allyProps(1)} />
                </Tabs>
            </MainCard>

            <div>
                { value === 0 ? (
                        <TabPanel value={value} index={0} >
                            {<Deploy />}
                        </TabPanel>
                    )
                    : (
                        <TabPanel value={value} index={1} >
                            {<Regist />}
                        </TabPanel>
                    )
                }
            </div>

        </>
        // <Fragment>
        //   <div>
        //         <AppBar className = {classes.bar} position="static">
        //             <Tabs value={value} onChange={handleChange}>
        //                 <Tab label = "BOM 정전개 / 역전개" {...allyProps(0)} />
        //                 <Tab label = "BOM 등록 / 수정" {...allyProps(1)} />
        //             </Tabs>
        //         </AppBar>
        //     </div>
        //     <div>
        //         {value === 0 ? (
        //             <TabPanel value={value} index={0} >
        //                 {<Deploy />}
        //             </TabPanel>) : (
        //             <TabPanel value={value} index={1} >
        //                 {<Regist />}
        //             </TabPanel>
        //         )}
        //     </div>
        // </Fragment>
    );
};

export default LogisticsBOM;
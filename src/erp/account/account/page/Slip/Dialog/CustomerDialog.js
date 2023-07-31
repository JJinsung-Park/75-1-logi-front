import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import { AppBar, Tab, } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import { TabList, TabPanel } from '@material-ui/lab';
import NormalAccount from "./NormalAccount";
import FinanceAccount from "./FinanceAccount";
import CreditCard from "./CreditCard";

//=============================== 2020-09-10 거래처관리 조편백 ======================================
const CustomerDialog = ({ open, close, value }, props) => {

    //============================== 닫기버튼 ====================================
    const Close = () => {
        close({
            data: undefined,
        });
    };
    //============================== 일반거래처 ====================================
    const handleNormalRow = (Rows) => {
        
        close({ data: Rows });
    };
    //============================== 금융거래처 ====================================
    const handleFinanceRow = (Rows) => {
        
        close({ data: Rows });
    };
    //============================== 신용카드 ====================================
    const handleCreditRow = (Rows) => {
       
        close({ data: Rows });
    };
    //========================== Tab visible ==========================
    const [tabValue, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //==================================================================

    return (
        <Dialog aria-labelledby="alert-dialog-slide-title" open={open} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle Align="center">거 래 처</DialogTitle>
            <DialogContent dividers>

                <TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={handleChange} indicatorColor="primary" variant="fullWidth" >
                            <Tab label="일반거래처" value="1" />
                            <Tab label="금융거래처" value="2" />
                            <Tab label="신용카드" value="3" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1"><NormalAccount handleNormalRow={handleNormalRow} /></TabPanel>
                    <TabPanel value="2"><FinanceAccount handleFinanceRow={handleFinanceRow} /></TabPanel>
                    <TabPanel value="3"><CreditCard handleCreditRow={handleCreditRow} /></TabPanel>
                </TabContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={Close} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDialog;
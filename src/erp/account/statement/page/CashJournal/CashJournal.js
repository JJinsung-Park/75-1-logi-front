import React from "react";
import {Typography} from '@mui/material';
import CashJournalMenu from "./CashJournalMenu";
import CashJournalGrid from "./CashJournalGrid";

const CashJournal = () => {
    return (
        <>
            <CashJournalMenu />
            <CashJournalGrid />
        </>
    );
};

export default CashJournal;

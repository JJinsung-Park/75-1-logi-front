import React, { useState } from 'react';
import GeneralAccountLedgerGrid from './GeneralAccountLedgerGrid';
import GeneralAccountLedgerMenu from './GeneralAccountLedgerMenu';

const GeneralAccountLedger = () => {
    const [generalAccountLedgerGrid, setGeneralAccountLedgerGrid] = useState('');
    return (
        <>
            <GeneralAccountLedgerMenu generalAccountLedgerGrid={generalAccountLedgerGrid} />
            <GeneralAccountLedgerGrid setGeneralAccountLedgerGrid={setGeneralAccountLedgerGrid} />
        </>
    );
};

export default GeneralAccountLedger;

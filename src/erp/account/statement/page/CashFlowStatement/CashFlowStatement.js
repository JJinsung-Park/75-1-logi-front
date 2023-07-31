import React from "react";
import CashFlowStatementGrid from "./CashFlowStatementGrid";
import CashFlowStatementMenu from "./CashFlowStatementMenu";

const CashFlowStatement = () => {
    return (
        <>
            <CashFlowStatementMenu />
            <CashFlowStatementGrid />
        </>
    );
};

export default CashFlowStatement;

import React from "react";
import MonthIncomeStatementGrid from "./MonthIncomeStatementGrid";
import MonthIncomeStatementMenu from "./MonthIncomeStatementMenu";
import { Typography } from "@material-ui/core";

const MonthIncomeStatement = () => {
    return (
        <>
            <MonthIncomeStatementMenu />
            <MonthIncomeStatementGrid />
        </>
    );
};

export default MonthIncomeStatement;

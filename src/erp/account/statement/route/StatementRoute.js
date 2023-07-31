import React from "react";


import { default as DetailTrialBalance } from "../page/DetailTrialBalance/DetailTrialBalance"; // 일(월)계표 *********** 2020-08-24 김진호 추가 ***********
import { default as CashJournal } from "../page/CashJournal/CashJournal"; // 현금출납장  *********** 2020-08-24 정대현 추가 ***********
import { default as AccountLedger } from "../page/AccountLedger/AccountLedger"; // 계정별 원장  ======  2020-08-25 조편백  추가 =======
import { default as FinancialStatements } from "../page/FinancialStatements/FinancialStatements"; // 재무상태표
import { default as TotalTrialBalance } from "../page/TotalTrialBalance/TotalTrialBalance"; // 합계잔액시산표
import { default as IncomeStatement } from "../page/IncomeStatement/IncomeStatement"; //손익계산서 ======  2020-08-24 조편백  추가 =======
import { default as MonthIncomeStatement } from "../page/MonthIncomeStatement/MonthIncomeStatement";
import { default as PreviousFinalcialStatement } from "../page/PreviousFinalcialStatement/PreviousFinalcialStatement"; //전기분재무상태표 ======  2020-11-25 최지은&노원찬 추가 =======
import { default as CashFlowStatement } from "../page/CashFlowStatement/CashFlowStatement";
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout"; //원가명세서 ======  2020-11-11 추가 =======

const StatementRoute = {
        path: '/',
        element : (
            <AuthGuard>
                    <MainLayout/>
            </AuthGuard>
        ),
        children : [
                {
                        path:  '/app/acc/statement/detailTrialBalance',
                        element: <DetailTrialBalance/>
                },
                {
                        path: '/app/acc/statement/cashJournal' ,
                        element:<CashJournal/>
                },
                {
                        path:  '/app/acc/statement/AccountLedger',
                        element:<AccountLedger/>
                },
                {
                        path:  '/app/acc/statement/financialPosition',
                        element:<FinancialStatements/>
                },
                {
                        path:  '/app/acc/statement/totalTrialBalance',
                        element:<TotalTrialBalance/>
                },
                {
                        path: '/app/acc/statement/IncomeStatement' ,
                        element:<IncomeStatement/>
                },
                {
                        path:  '/app/acc/statement/MonthIncomeStatement',
                        element:<MonthIncomeStatement/>
                },
                {
                        path:  '/app/acc/statement/PreviousFinalcialStatement',
                        element:<PreviousFinalcialStatement/>
                },
                {
                        path: '/app/acc/statement/cashFlowStatement' ,
                        element:<CashFlowStatement/>
                }
        ]
};

export default StatementRoute;
{/* ///////////////////////// 2021-02-23 이은기  /////////////////////////// */}
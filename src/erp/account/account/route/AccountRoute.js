import React from "react";

// 전 표  =========================================================================================================================
import { default as Slip } from "../page/Slip/Slip"; // 일반전표
import { default as ApprovalManager } from "../page/ApprovalManager/ApprovalManager"; // 전표승인
import { default as JournalForm } from "../page/JournalForm/JournalForm"; // 분개장
import { default as GeneralAccountLedger } from "../page/GeneralAccountLedger/GeneralAccountLedger"; // 총계정원장 2020-11-23 추가
// 고정 자산 ===============================================================================================================================
import { default as NonCurrentAsset } from "../page/NonCurrentAsset/NonCurrentAsset";
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";


const AccountRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children : [
        {
            path: '/app/acc/account/slipForm',
            element : <Slip/>
        },
        {
            path: '/app/acc/account/approvalManager',
            element : <ApprovalManager/>
        },
        {
            path:  '/app/acc/account/journalForm',
            element : <JournalForm/>
        },
        {
            path: '/app/acc/account/GeneralAccountLedger',
            element : <GeneralAccountLedger/>
        },
        {
            path: '/app/acc/account/CurrentAssetRegister',
            element : <NonCurrentAsset/>
        }
    ]
};

export default AccountRoute;
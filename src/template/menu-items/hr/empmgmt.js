import { FormattedMessage } from "react-intl";

export const empmgmt1 = {
    id: 'empmgmt1',
    title: <FormattedMessage id="사원정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'empReg',
            title: (
                <>
                    <FormattedMessage id="사원등록" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'empDetail',
            title: (
                <>
                    <FormattedMessage id="사원조회" />
                </>
            ),
            type: 'item',
            url: '',
        },
        {
            id: 'empEval',
            title: (
                <>
                    <FormattedMessage id="인사고과등록" />
                </>
            ),
            type: 'item',
            url: '',
        },
        {
            id: 'empEvalApproval',
            title: (
                <>
                    <FormattedMessage id="인사고과관리" />
                </>
            ),
            type: 'item',
            url: '',
        }
        ,
        {
            id: 'appointmentReg',
            title: (
                <>
                    <FormattedMessage id="인사발령등록" />
                </>
            ),
            type: 'item',
            url: '',
        }
        ,
        {
            id: 'issuanceManagement',
            title: (
                <>
                    <FormattedMessage id="인사발령관리" />
                </>
            ),
            type: 'item',
            url: '',
        }
    ]
};

export const empmgmt2 = {
    id: 'empmgmt2',
    title: <FormattedMessage id="서류 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'certificate',
            title: (
                <>
                    <FormattedMessage id="재직증명서신청" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'certificateApproval',
            title: (
                <>
                    <FormattedMessage id="재직증명서관리" />
                </>
            ),
            type: 'item',
            url: '',
        },
        {
            id: 'receiptProof',
            title: (
                <>
                    <FormattedMessage id="증빙서류신청" />
                </>
            ),
            type: 'item',
            url: '',
        },
        {
            id: 'proofApproval',
            title: (
                <>
                    <FormattedMessage id="증빙서류관리" />
                </>
            ),
            type: 'item',
            url: '',
        }

    ]
};
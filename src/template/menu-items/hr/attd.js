import { FormattedMessage } from "react-intl";

export const attd1 = {
    id: 'attd1',
    title: <FormattedMessage id="근태 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'dailyAttnd',
            title: (
                <>
                    <FormattedMessage id="일근태등록" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/dailyAttnd',
        },
        {
            id: 'excusedAttnd',
            title: (
                <>
                    <FormattedMessage id="근태외신청" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/excusedAttnd',
        },
        {
            id: 'break',
            title: (
                <>
                    <FormattedMessage id="연차신청" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/break',
        },
        {
            id: 'travel',
            title: (
                <>
                    <FormattedMessage id="출장/교육신청" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/travel',
        }
        ,
        {
            id: 'overwork',
            title: (
                <>
                    <FormattedMessage id="초과근무신청" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/overwork',
        }
    ]
};

export const attd2 = {
    id: 'attd2',
    title: <FormattedMessage id="근태 승인" />,
    type: 'collapse',
    children: [
        {
            id: 'dailyAttndMgt',
            title: (
                <>
                    <FormattedMessage id="일근태관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/dailyAttndMgt',
        },
        {
            id: 'monthlyAttndMgt',
            title: (
                <>
                    <FormattedMessage id="월근태관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/monthlyAttndMgt',
        }
        ,
        {
            id: 'attndApproval',
            title: (
                <>
                    <FormattedMessage id="근태외 승인관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/attndApproval',
        }
        ,
        {
            id: 'annualLeaveMgt',
            title: (
                <>
                    <FormattedMessage id="연차관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/attd/annualLeaveMgt',
        }
    ]
};
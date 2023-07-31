import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};

const accountPages = {
    id: 'slip',
    title: <FormattedMessage id="전표/장부관리" />,
    type: 'collapse',
    children: [
        {
            id: 'slipForm',
            title: (
                <>
                    <FormattedMessage id="일반전표" />
                </>
            ),
            type: 'item',
            url: '/app/acc/account/slipForm',

        },
        {
            id: 'approvalManager',
            title: (
                <>
                    <FormattedMessage id="전표승인 및 취소" />
                </>
            ),
            type: 'item',
            url: '/app/acc/account/approvalManager',
        },
        {
            id: 'journalForm',
            title: (
                <>
                    <FormattedMessage id="분개장" />
                </>
            ),
            type: 'item',
            url: '/app/acc/account/journalForm',
        },
        {
            id: 'detailTrialBalance',
            title: (
                <>
                    <FormattedMessage id="일(월)계표" />
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/detailTrialBalance',
        },
        {
            id: 'GeneralAccountLedger',
            title: (
                <>
                    <FormattedMessage id="총계정원장" />
                </>
            ),
            type: 'item',
            url: '/app/acc/account/GeneralAccountLedger',
        },
        {
            id: 'cashJournal',
            title: (
                <>
                    <FormattedMessage id="현금출납장" />
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/cashJournal',
        },
        {
            id: 'AccountLedger',
            title: (
                <>
                    <FormattedMessage id="계정별원장" />
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/AccountLedger',
        }
    ]
};


export default accountPages;

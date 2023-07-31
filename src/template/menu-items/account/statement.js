import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};

const statementPages = {
    id: 'base',
    title : <FormattedMessage id="결산/재무제표관리" />,
    type: 'collapse',
    children: [
        {
            id : 'totalTrialBalance',
            title: (
                <>
                    <FormattedMessage id="합계잔액시산표"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/totalTrialBalance',
        },
        {
            id : 'financialPosition',
            title: (
                <>
                    <FormattedMessage id="재무상태표"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/financialPosition',
        },
        {
            id : 'incomeStatement',
            title: (
                <>
                    <FormattedMessage id="손익계산서"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/IncomeStatement',
        },
        {
            id : 'monthIncomeStatement',
            title: (
                <>
                    <FormattedMessage id="월별손익계산서"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/monthIncomeStatement',
        },
        {
            id : 'PreviousFinalcialStatement',
            title: (
                <>
                    <FormattedMessage id="전기분재무상태표"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/statement/PreviousFinalcialStatement',
        }
    ]
}

export default statementPages;
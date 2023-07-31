import { FormattedMessage } from 'react-intl';

export const outsourc = {
    id: 'outsourc',
    title: <FormattedMessage id="외주 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'order',
            title: (
                <>
                    <FormattedMessage id="외주 발주 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/outsourc/order',
        },
        {
            id: 'forward',
            title: (
                <>
                    <FormattedMessage id="외주 자재 출고 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/outsourc/forward',
        },
        {
            id: 'inspection',
            title: (
                <>
                    <FormattedMessage id="외주 자재 실적 검사" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/outsourc/inspection',
        }
    ]
};

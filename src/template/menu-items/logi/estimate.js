import { FormattedMessage } from 'react-intl';

export const estimate = {
    id: 'estimate',
    title: <FormattedMessage id="견적 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'estimateInfo',
            title: (
                <>
                    <FormattedMessage id="견적 조회/수정" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/estimateInfo',
        },
        {
            id: 'estimateRegister',
            title: (
                <>
                    <FormattedMessage id="견적 등록" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/estimateRegister',
        }
    ]
};

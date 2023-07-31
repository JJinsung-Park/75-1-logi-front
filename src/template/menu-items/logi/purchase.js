import { FormattedMessage } from 'react-intl';


export const perchase = {
    id: 'perchase',
    title: <FormattedMessage id="자재 구매 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'logisticsBOM',
            title: (
                <>
                    <FormattedMessage id="자재명세서(BOM)" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/purchase/logisticsBOM',
        },
        {
            id: 'orderRegister',
            title: (
                <>
                    <FormattedMessage id="발주 및 재고처리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/purchase/orderRegister',
        },
        {
            id: 'stockInfo',
            title: (
                <>
                    <FormattedMessage id="재고 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/purchase/stockInfo',
        }
    ]
};

import { FormattedMessage } from 'react-intl';
import {estimate} from "./estimate";

export const sales = {
    id: 'sales',
    title: <FormattedMessage id="영업 관리" />,
    type: 'collapse',
    children: [
        estimate
        ,
        {
            id: 'contract',
            title: (
                <>
                    <FormattedMessage id="수주 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/contractRegister',
        },
        {
            id: 'delivery',
            title: (
                <>
                    <FormattedMessage id="납품 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/deliveryInfo',
        },
        {
            id: 'salesplaninfo',
            title: (
                <>
                    <FormattedMessage id="판매 계획" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/salesPlanInfo',
        },
        {
            id: 'processplaninfo',
            title: (
                <>
                    <FormattedMessage id="공정 계획 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/sales/processPlanInfo',
        }
    ]
};

import { FormattedMessage } from 'react-intl';

export const base = {
    id: 'base',
    title: <FormattedMessage id="기초정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'companyInfo',
            title: (
                <>
                    <FormattedMessage id="회사 정보" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/companyInfo',
        },
        {
            id: 'workplaceInfo',
            title: (
                <>
                    <FormattedMessage id="사업장 정보" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/workplaceInfo',
        },
        {
            id: 'deptInfo',
            title: (
                <>
                    <FormattedMessage id="부서 정보" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/deptInfo',
        },
        {
            id: 'clientInfo',
            title: (
                <>
                    <FormattedMessage id="거래처 정보" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/clientInfo',
        }
    ]
};

export const base2 = {
    id: 'base2',
    title: <FormattedMessage id="물류정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'codeInfo',
            title: (
                <>
                    <FormattedMessage id="코드 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/codeInfo',
        },
        {
            id: 'itemInfo',
            title: (
                <>
                    <FormattedMessage id="품목 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/itemInfo',
        },
        {
            id: 'wareHouseInfo',
            title: (
                <>
                    <FormattedMessage id="창고 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/base/wareHouseInfo',
        }
    ]
};

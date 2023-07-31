import { FormattedMessage } from 'react-intl';



export const production = {
    id: 'production',
    title: <FormattedMessage id="생산 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'mpsRegister',
            title: (
                <>
                    <FormattedMessage id="주생산계획(MPS)" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/production/mpsRegister',
        },
        {
            id: 'mrp',
            title: <FormattedMessage id="소요량전개(MRP)" />,
            type: 'item',
            // eslint-disable-next-line no-use-before-define
            url: '/app/logistic/production/mrpRegisterAnd',
        },
        {
            id: 'workInstruction',
            title: (
                <>
                    <FormattedMessage id="작업지시 / 생산실적 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/production/workInstruction',
        },
        {
            id: 'workSite',
            title: (
                <>
                    <FormattedMessage id="작업장 / 작업장로그" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/production/workSite',
        }
    ]
};

import { FormattedMessage } from 'react-intl';

export const transport = {
    id: 'transport',
    title: <FormattedMessage id="운송 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'transportInfo',
            title: (
                <>
                    <FormattedMessage id="출차 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/transport/transportInfo',
        },
        {
            id: 'transportInfo',
            title: (
                <>
                    <FormattedMessage id="입차 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/transport/transportInfo',
        },
        {
            id: 'transportInInfo',
            title: (
                <>
                    <FormattedMessage id="입차 관리" />
                </>
            ),
            type: 'item',
            url: '/app/logistic/transport/transportInInfo',
        }
    ]
};

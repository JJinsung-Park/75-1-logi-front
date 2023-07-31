import { FormattedMessage } from 'react-intl';
import { IconTruck } from '@tabler/icons';

import { base, base2 } from './base';
import { sales } from './sales';
import { production } from './production';
import { perchase } from './purchase';
import { outsourc } from './outsourc';
import { transport } from './transport';

const icons = {
    IconTruck
};

const logiPages = {
    id: 'logi',
    title: <FormattedMessage id="물류 업무" />,
    type: 'collapse',
    icon: icons.IconTruck,
    children: [base, base2, sales, perchase, production, outsourc, transport]
};

export default logiPages;

import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};

const previousPages = {
    id: 'base',
    title : <FormattedMessage id="전기분손익계산서" />,
    type: 'collapse',
    children: [
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
};

export default previousPages;
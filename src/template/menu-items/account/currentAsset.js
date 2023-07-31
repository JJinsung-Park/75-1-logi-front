import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};

const currentAssetPages = {
    id: 'base',
    title : <FormattedMessage id="고정자산관리" />,
    type: 'collapse',
    children: [
        {
            id : 'CurrentAssetRegister',
            title: (
                <>
                    <FormattedMessage id="고정자산등록"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/account/CurrentAssetRegister',
        }
    ]
};

export default currentAssetPages
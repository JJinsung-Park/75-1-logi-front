import { FormattedMessage } from 'react-intl';
import { IconCash } from '@tabler/icons';

const icons = {
    IconCash
};

const basePages = {
    id: 'base',
    title : <FormattedMessage id="기초 정보관리" />,
    type: 'collapse',
    children: [
        {
            id : 'accountForm',
            title: (
                <>
                    <FormattedMessage id="계정과목관리"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/account/accountForm',
        },
        {
            id : 'WorkplaceManagement',
            title: (
                <>
                    <FormattedMessage id="거래처 관리"/>
                </>
            ),
            type: 'item',
            url: '/app/acc/company/WorkplaceManagement',
        }
    ]
};

export default basePages;
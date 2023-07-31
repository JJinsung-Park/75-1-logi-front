import { FormattedMessage } from 'react-intl';
import { IconMan } from '@tabler/icons';
import { comm1, comm2 } from "./comm";
import { empmgmt1, empmgmt2 } from "./empmgmt";
import { attd1, attd2 } from "./attd";
import { salary1, salary2 } from "./salary";
import { newemp1, newemp2 } from "./newemp";

const icons = {
    IconMan
};

const hrPages = {
    id: 'hr',
    title: <FormattedMessage id="인사 업무" />,
    type: 'collapse',
    icon: icons.IconMan,
    children: [
        comm1,
        comm2,
        empmgmt1,
        empmgmt2,
        attd1,
        attd2,
        salary1,
        salary2,
        newemp1,
        newemp2

    ]
};

export default hrPages;

import {IconCash} from "@tabler/icons";
import {FormattedMessage} from "react-intl";
import accountPages from "./account";
import basePages from "./base";
import statementPages from "./statement";
import previousPages from "./previousStatement";
import currentAssetPages from "./currentAsset";


const icons = {
    IconCash
};

const accPages = {
    id: 'acc',
    title: <FormattedMessage id="회계 업무" />,
    type: 'collapse',
    icon: icons.IconCash,
    children: [accountPages,basePages,statementPages,currentAssetPages]
};

export default accPages;
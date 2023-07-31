import { FormattedMessage } from "react-intl";

export const comm1 = {
    id: 'comm1',
    title: <FormattedMessage id="인사기초정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'holidayList',
            title: (
                <>
                    <FormattedMessage id="휴일정보관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'deptList',
            title: (
                <>
                    <FormattedMessage id="부서정보관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/deptManage',
        },
        {
            id: 'positionList',
            title: (
                <>
                    <FormattedMessage id="직급정보관리" />
                </>
            ),
            type: 'item',
            url: '',
        }
        ,
        {
            id: 'baseWorkTime',
            title: (
                <>
                    <FormattedMessage id="기준근무시간관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/baseWorkTime',
        }
    ]
};

export const comm2 = {
    id: 'comm2',
    title: <FormattedMessage id="인사시스템 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'empAuth',
            title: (
                <>
                    <FormattedMessage id="권한관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'codeList',
            title: (
                <>
                    <FormattedMessage id="코드조회" />
                </>
            ),
            type: 'item',
            url: '',
        }
    ]
};
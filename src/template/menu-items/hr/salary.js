import { FormattedMessage } from "react-intl";

export const salary1 = {
    id: 'salary1',
    title: <FormattedMessage id="급여정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'fullTimeSal',
            title: (
                <>
                    <FormattedMessage id="급여조회" />
                </>
            ),
            type: 'item',
            url: '/app/hr/Salary/monthSalary',
        },
        {
            id: 'salaryAwards',
            title: (
                <>
                    <FormattedMessage id="상여및성과급조회" />
                </>
            ),
            type: 'item',
            url: '/app/hr/Salary/salaryAwards',
        },
        {
            id: 'retirementSal',
            title: (
                <>
                    <FormattedMessage id="퇴직금조회" />
                </>
            ),
            type: 'item',
            url: '/app/hr/salary/severancePay',
        }

    ]
};

export const salary2 = {
    id: 'salary2',
    title: <FormattedMessage id="급여기준정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'baseSalMgt',
            title: (
                <>
                    <FormattedMessage id="급여기준관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/salary/baseSalaryManage',
        },
        {
            id: 'baseExtSalMgt',
            title: (
                <>
                    <FormattedMessage id="초과수당관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/salary/baseExtSalManage',
        }
        ,
        {
            id: 'socialIns',
            title: (
                <>
                    <FormattedMessage id="사회보험관리" />
                </>
            ),
            type: 'item',
            url: '/app/hr/salary/socialInsure',
        },
        {
            id: 'retirementSal',
            title: (
                <>
                    <FormattedMessage id="게시판" />
                </>
            ),
            type: 'item',
            url: '/app/hr/Salary/monthSalary1',
        }

    ]
};
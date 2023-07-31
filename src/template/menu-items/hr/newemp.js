import { FormattedMessage } from "react-intl";

export const newemp1 = {
    id: 'newemp1',
    title: <FormattedMessage id="인적자원개발 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'termsofEmp',
            title: (
                <>
                    <FormattedMessage id="인력계획" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'progress_education_mgmt',
            title: (
                <>
                    <FormattedMessage id="교육훈련진행관리" />
                </>
            ),
            type: 'item',
            url: '',
        },
        {
            id: 'recruitment_approval',
            title: (
                <>
                    <FormattedMessage id="채용승인" />
                </>
            ),
            type: 'item',
            url: '',
        }

    ]
};

export const newemp2 = {
    id: 'newemp2',
    title: <FormattedMessage id="인적자원정보 관리" />,
    type: 'collapse',
    children: [
        {
            id: 'resumemgmt',
            title: (
                <>
                    <FormattedMessage id="이력서조회" />
                </>
            ),
            type: 'item',
            url: '/app/hr/sys/holidayManage',
        },
        {
            id: 'personality_interview',
            title: (
                <>
                    <FormattedMessage id="인성검사/면접결과" />
                </>
            ),
            type: 'item',
            url: '',
        }
        ,
        {
            id: 'success_applicant',
            title: (
                <>
                    <FormattedMessage id="선발결정" />
                </>
            ),
            type: 'item',
            url: '',
        }

    ]
};
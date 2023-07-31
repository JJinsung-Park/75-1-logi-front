
import Axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function(SpecificComponent, url) {
    function AuthenticationCheck(props) {
        const empAuthority = useSelector(({ Auth }) => ({ empAuthority: Auth.empAuthority }));

        const authCheck = (empAuth, menuAuth) => {
            for (var a = 0; a < empAuth.length; a++) {
                for (var b = 0; b < menuAuth.length; b++) {
                    if (empAuth[a] === menuAuth[b]) {
                        return true;
                    }
                }
            }
            return false;
        };

        useEffect(() => {
            Axios.post('http://localhost:4000/erp/sys/menuAuth', { url: url }).then(response => {
                if (response.data) {

                    if (!authCheck(empAuthority.empAuthority, response.data.menuAuthority)) {
                        alert('해당 메뉴에 대한 접근 권한이 없습니다.');
                        props.history.push('/');
                    }
                } else {
                    alert('메뉴 이동에 실패했습니다');
                }
            });
        }, []);

        return <SpecificComponent {...props} />;
    }
    return AuthenticationCheck;
}

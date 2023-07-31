import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { logInOutRequest, authorityRequest } from 'common/reducer/commonReducer';
import { searchCode } from 'erp/hr/base/reducer/BaseCodeReducer';
import { withRouter } from 'react-router-dom';

const LoginContainer = props => {
    const {
        status,
        errorCode,
        errorMsg,
        logInOutRequest,
        isLogin,
        searchCode,
        company,
        workplace,
        authorityRequest
    } = props;
    
    const handleLogin = (empCode, password, companyCodes, workplaceCodes) => {
        
        authorityRequest({
            companyCode: companyCodes,
            workplaceCode: workplaceCodes,
            empCode: empCode
        });
        logInOutRequest({
            empCode: empCode,
            password: password,
            companyCode: companyCodes,
            workplaceCode: workplaceCodes,
            history: props.history
        });
    };

    return (
        <div>
            <Login
                handleLogin={handleLogin}
                status={status}
                errorCode={errorCode}
                errorMsg={errorMsg}
                isLogin={isLogin}
                searchCode={searchCode}
                companyCode={company}
                workPlaceCode={workplace}
            />
        </div>
    );
};

const mapStateToProps = state => {
    
    return {
        status: state.logInOutReducer.status,
        errorCode: state.logInOutReducer.errorCode,
        errorMsg: state.logInOutReducer.errorMsg,
        isLogin: state.logInOutReducer.isLogin,
        company: state.hr.base.basecode.company,
        workplace: state.hr.base.basecode.workplace
    };
};

export default connect(mapStateToProps, { logInOutRequest, searchCode, authorityRequest })(
    withRouter(LoginContainer)
);

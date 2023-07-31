import React from 'react';
import BreakAttdManage from './BreakAttdManage';
import { connect } from 'react-redux';
import { searchBreakAttdStart, updateBreakAttdStart } from '../../saga/ExcusedAttdSaga';
import { withRouter } from "react-router-dom";

//======================재영 일근태관리 컨테이너======================//

const BreakAttdManageContainer = (props) => {
    const { restAttdList, searchBreakAttdStart, updateBreakAttdStart}=props;

    const searchBreakAttd= (applyYearMonth) => {
        searchBreakAttdStart({applyYearMonth:applyYearMonth});
    }

    


    return(
        <div>
        <BreakAttdManage 
            searchBreakAttd={searchBreakAttd}
            updateBreakAttdStart={updateBreakAttdStart}
            restAttdList={restAttdList}  
        />
        </div>
    )
}

const mapStateToProps=(state) =>{
    return{
        restAttdList: state.RootReducers.hr.attendance.excusedAttd.restAttdList
    };
}

export default connect(mapStateToProps,{searchBreakAttdStart, updateBreakAttdStart })(BreakAttdManageContainer);
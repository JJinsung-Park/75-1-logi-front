import React from 'react';
import DayAttdManage from './DayAttdManage';
import { connect } from 'react-redux';
import { SearchDayAttdListRequest, updateDayAttdList } from '../../saga/DayMonthListSaga';
import { withRouter } from "react-router-dom";

//======================재영 일근태관리 컨테이너======================//

const DayAttdManagerContainer = (props) => {
    const { dayAttdMgtList, SearchDayAttdListRequest, updateDayAttdList, errorCode, errorMsg }=props;

    const searchDayAttd= (searchDate) => {
        SearchDayAttdListRequest({ applyDay:searchDate });
    }
    return(
        <div>
        <DayAttdManage 
            searchDayAttd={searchDayAttd}
            updateDayAttdList={updateDayAttdList}
            dayAttdMgtList={dayAttdMgtList}  
            errorCode={errorCode}
            errorMsg={errorMsg}
        />
        </div>
    )
}

const mapStateToProps=(state) =>{
    return{
        errorCode: state.RootReducers.hr.attendance.daymonthlist.errorCode,
        errorMsg: state.RootReducers.hr.attendance.daymonthlist.errorMsg,
        dayAttdMgtList: state.RootReducers.hr.attendance.daymonthlist.dayAttdMgtList
    };
}

export default connect(mapStateToProps,{SearchDayAttdListRequest, updateDayAttdList })(DayAttdManagerContainer);
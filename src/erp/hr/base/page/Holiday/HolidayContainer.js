import React from 'react'
import HolidayManageComponent from './HolidayManageComponent';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { holidayListRequest, updateHolidayRequest } from "../../saga/HolidaySaga";
import RootReducers from "../../../root/RootReducer";
const HolidayContainer = ({ errorCode, errorMsg, holidayList, holidayListRequest, updateHolidayRequest }) => {
    return (
        <>
            <HolidayManageComponent
                holidayListRequest={holidayListRequest}
                updateHolidayRequest={updateHolidayRequest}
                holidayList={holidayList}
                errorCode={errorCode}
                errorMsg={errorMsg}
            />
        </>
    )
};


const mapStateToProps = (state) => {
    return {
        errorCode: state.RootReducers.hr.base.holiday.errorCode,
        errorMsg: state.RootReducers.hr.base.holiday.errorMsg,
        holidayList: state.RootReducers.hr.base.holiday.holidayList
    };
}


export default connect(mapStateToProps, { holidayListRequest, updateHolidayRequest })(HolidayContainer);
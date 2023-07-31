/* eslint-disable no-unused-vars */

import React from 'react'
import EduAttendeeComponent from './EduAttendeeComponent'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { attendeeListRequest, 
    selectAttendeeRequest, 
    insertAttendeeRequest,
    deleteAttendeeRequest,
    updateAttendeeRequest,
    classBriefRequest,
 } from "../../saga/EduAttendeeSaga";
import {classListRequest} from "../../saga/CorporateEduSaga"

const EduAttendeeContainer = (props) =>
    {
    const {errorCode,errorMsg,attendeeList, classList,classListRequest,
        selectAttendeeRequest, insertAttendeeRequest, deleteAttendeeRequest, updateAttendeeRequest,
        attendeeListRequest,classBriefRequest
        
    } = props;

    return (
        <div>
        <EduAttendeeComponent
        classListRequest={classListRequest}
        classBriefRequest={classBriefRequest}
        attendeeListRequest={attendeeListRequest}
        selectAttendeeRequest={selectAttendeeRequest}
        insertAttendeeRequest={insertAttendeeRequest}
        deleteAttendeeRequest={deleteAttendeeRequest}
        updateAttendeeRequest={updateAttendeeRequest}
        attendeeList={attendeeList}
        classList={classList}
        errorCode={errorCode}
        errorMsg={errorMsg}
        />
        </div>
    )
};

const mapStateToProps=(state) =>{
    return{
        errorCode: state.RootReducers.hr.attendance.EduAttendee.errorCode,
        errorMsg: state.RootReducers.hr.attendance.EduAttendee.errorMsg,
        attendeeList: state.RootReducers.hr.attendance.EduAttendee.attendeeList,
        classList: state.RootReducers.hr.attendance.EduAttendee.classList,
    };
}

export default connect(mapStateToProps,{
    classListRequest,
    attendeeListRequest, 
    selectAttendeeRequest, 
    insertAttendeeRequest,
    deleteAttendeeRequest,
    updateAttendeeRequest,
    classBriefRequest
})(EduAttendeeContainer);
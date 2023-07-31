/* eslint-disable no-unused-vars */


import React from 'react'
import CoEduComponent from './CoEduComponent'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { classListRequest, 
    insertClassRequest,
    deleteClassRequest,
    updateClassRequest
 } from "../../saga/CorporateEduSaga";
 

const CoEduContainer = (props) =>
    {
    const {errorCode,errorMsg,classList,
        classListRequest, updateClassRequest, insertClassRequest, deleteClassRequest
        
    } = props;

    return (
        <div>
        <CoEduComponent
        classListRequest={classListRequest}
        //selectClassRequest={selectClassRequest}
        insertClassRequest={insertClassRequest}
        deleteClassRequest={deleteClassRequest}
        updateClassRequest={updateClassRequest}
        classList={classList} 
        errorCode={errorCode}
        errorMsg={errorMsg}
        />
        </div>
    )
};


const mapStateToProps=(state) =>{
    return{
        errorCode: state.hr.attendance.CorporateEdu.errorCode,
        errorMsg: state.hr.attendance.CorporateEdu.errorMsg,
        classList: state.hr.attendance.CorporateEdu.classList,
    };
}


export default connect(mapStateToProps,{
    classListRequest, 
    //selectClassRequest, 
    insertClassRequest,
    deleteClassRequest,
    updateClassRequest 
})(CoEduContainer);
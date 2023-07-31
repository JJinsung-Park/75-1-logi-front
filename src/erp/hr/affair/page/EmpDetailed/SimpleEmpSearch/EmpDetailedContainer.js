import React from "react";
import EmpDetailed from "./EmpDetailed";
import { connect } from "react-redux";
import { EmpDetailedInfoRequest, EmpUpdateRequest } from "../../../saga/EmpInfoSaga";
import { PositionListRequest } from "../../../saga/PositionSaga";


const EmpDetailedContainer = props => {
  const { PositionListRequest,EmpDetailedInfoRequest, EmpUpdateRequest, 
    positionList, empDetailedInfo, company, workPlace } = props;





  return (
    <div>
      <EmpDetailed
        PositionListRequest={PositionListRequest}
        EmpDetailedInfoRequest ={EmpDetailedInfoRequest}
        EmpUpdateRequest={ EmpUpdateRequest}
        companyCode={company}
        workPlaceCode={workPlace}
        positionList={positionList}
        empDetailedInfo={empDetailedInfo}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    status: state.hr.affair.status,
    errorCode: state.hr.affair.errorCode,
    errorMsg: state.hr.affair.errorMsg,
    company: state.hr.affair.company,
    workPlace: state.hr.affair.workPlace,
    positionList: state.hr.affair.positionList,
    empDetailedInfo: state.hr.affair.empDetailedInfo,

  };
};

export default connect(mapStateToProps, { PositionListRequest ,EmpDetailedInfoRequest,  EmpUpdateRequest })(EmpDetailedContainer);

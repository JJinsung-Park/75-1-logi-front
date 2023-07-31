import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmploymentManage from "./EmploymentManage";


const EmploymentManageLog = (props) => {
 
  // const [list,setList] = useState([{}]);
  // const dispatch=useDispatch();
  // const {EmploymentManagelList}=useSelector( state => state.HrReducer);


  // const searchEmploymentManageList = (searchEle) =>{
  //   dispatch(actions.searchEmploymentManageList())
  //   setList(EmploymentManagelList);
  // }
  return (    
    
    <div>
      <EmploymentManage
      searchEmploymentManageList={props.searchEmploymentManageList}
      EmploymentManageList={props.EmploymentManageList}
      update={props.update}
      flag={props.flag} />
    </div>
  );
};

export default EmploymentManageLog;


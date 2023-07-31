
import TextField from "@material-ui/core/TextField";
import React,{useState,useCallback,memo,useEffect}  from "react";
import 'erp/hr/Page/DayAttdManage/DayAttdManage.css';
import { Button } from "@material-ui/core"

import moment, { relativeTimeRounding } from "moment"
import {useDispatch,useSelector} from 'react-redux'
import { SEARCH_DAY_ATTD_LIST_REQUEST,
        SEARCH_DAY_ATTD_LIST_All,
        DAY_ATTD_DEADLINE_REGISTER, 
        DAY_ATTD_DEADLINE_CANCEL
       } from "../../ActionType/ActionType";


 
//@material-ui 설치 안되어 있으면 터이널에   yarn add @material-ui/core  하여 다운로드 
//달력 위치는 App.css 안의 .Calendar안에서 위치 조정 가능 함   


 const Calendar = ({onChange}) => {
               

  const [data,setData]=useState('');

  onChange(data);



  let now = new Date();                //오늘 날짜 만들기
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let date = leadingZeros(now.getDate(), 2);
  let today = year + '-' + month + '-' + date;

  
  const buttonsize={

    width: 150,
    height: 55,
    padding: 20
  }



      function leadingZeros(n, digits) {                  //숫자앞에 0붙여주는 함수 
           var zero = '';
            n = n.toString();

         if (n.length < digits) {
           for (var i = 0; i < digits - n.length; i++)
              zero += '0';
                                }
          return zero + n;
}




                let sDate=today;   //달력에 값 세팅
               let eDate=today;     //달력에 값 세팅
  
  const [cday,setCday] = useState(today);
                
  const [startDate,setStartDate] = useState(today);

  const [endDate,setEndDate] = useState(today);

  const [name,setName] = useState('');

                

const [empCodes,setEmpCodes] = useState([]);

const dispatch = useDispatch();

const {dayAttdMgtList} =useSelector(state => state.HrReducer);

const {errorCode} =useSelector(state => state.HrReducer);






useEffect(()=>{onChange(dayAttdMgtList)},[dayAttdMgtList])




const searchOnclick= async()=>{    /// 상태 N 조회


  
await dispatch({type:SEARCH_DAY_ATTD_LIST_REQUEST, data:{cday:cday ,name:name}});



  if(dayAttdMgtList===null||undefined){ result();}

  if(errorCode===0){alert("검색 완료!! 검색된 정보가 없으면 검색 조건을 확인 해 주세요");}
  
  if(errorCode===-1){alert("검색 실패!!");}
  
 }

function result(){


}


const allSearchOnclick=async()=>{   
   //전체조회
   
 
   await dispatch({type:SEARCH_DAY_ATTD_LIST_All, data:{startDate:startDate ,endDate:endDate}});
   
   
   if(dayAttdMgtList===null||undefined){ result();}

   if(errorCode===0){alert("검색완료! 검색된 정보가 없으면 날짜를 확인해주세요^^");}
   
   if(errorCode===-1){alert("검색 실패!!");}
   

}


 const DayDeadline=async()=>{
 ///전체마감하깅

if(dayAttdMgtList===null||undefined){alert("마감할 정보가 없습니다"); return;}

if(dayAttdMgtList!==null||undefined){
  const empData = dayAttdMgtList.map((location,index) => ({ empCode:location.empCode , applyDays:moment(location.applyDays).format('yyyyMMDD')}));
  await dispatch({type:DAY_ATTD_DEADLINE_REGISTER, data:{empData:empData}});
 if(errorCode===0){alert("전체 마감이 완료!");}
 else alert("마감 실패!!!");

 
}


 }




 const DayDeadlineCancel=async()=>{
// 마감취소
if(dayAttdMgtList===null||undefined){alert("마감취소할 정보가 없습니다"); return;}

  if(dayAttdMgtList!==null||undefined){
  const empData = dayAttdMgtList.map((location,index) => ({ empCode:location.empCode , applyDays:moment(location.applyDays).format('yyyyMMDD')}));

  await dispatch({type:DAY_ATTD_DEADLINE_CANCEL, data:{empData:empData}});

  }


if(errorCode===0){alert("취소 완료!!")}
else alert("취소 실패");
 }



const onChangeDate = useCallback((e) => {          
  setCday(e.target.value);

},[]);

const onChangeDate1 = useCallback((e) => {          
  setStartDate(e.target.value);

},[]);

const onChangeDate2 = useCallback((e) => {          
  setEndDate(e.target.value);

},[]);

const onChangeName = useCallback((e) => {          
  setName(e.target.value);

},[]);

return (

  <div>
    <div className="Calendar">
      
            <div>
                <TextField  variant="outlined"
                    name="ApplyDate"
                    type={"date"}
                    defaultValue={sDate}  //defaultValue : 초기값.
                    onChange={onChangeDate}
                />
           


            </div>
  </div>
<div>
  <div>
    
    
        <div className="CalendarAll">
      
            <div>
                <TextField  variant="outlined"
                    name="ApplyDate"
                    type={"date"}
                    defaultValue={sDate}  //defaultValue : 초기값.
                    onChange={onChangeDate1}  
                />
           


            </div>
      </div>
  </div>

   <div>
    
    
        <div className="CalendarAll1">
      
            <div>
                <TextField  variant="outlined"
                    name="ApplyDate"
                    type={"date"}
                    defaultValue={eDate}  //defaultValue : 초기값.
                    onChange={onChangeDate2}
                />
           


            </div>
      </div>
   </div>
</div>
            <div>
                    <div className="nameSearch">
              <TextField  variant="outlined" label="이름검색" onChange={onChangeName}></TextField>
                   </div>
            
            <div className="SearchButton">
    <Button variant="contained"  color="primary" size="large" style={buttonsize} onClick={searchOnclick}>마감여부"N" 조회</Button>
            </div>
            
            <div className="SearchAllButton">
    <Button variant="contained"  color="primary" size="large" style={buttonsize} onClick={allSearchOnclick}>전체조회</Button>
            </div>
            
            <div className="AllRegisterButton">
    <Button variant="contained"  color="primary" size="large" style={buttonsize}    onClick={DayDeadline}>전체마감하기</Button>
            </div>
    
            <div className="AllCancelButton"  >   
    <Button variant="contained" color="primary" size="large" style={buttonsize} onClick={DayDeadlineCancel} >전체마감취소</Button>
            </div>
            </div>
     
     </div>

     
  )
}
export default memo(Calendar);
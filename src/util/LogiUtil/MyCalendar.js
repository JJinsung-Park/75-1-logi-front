import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import moment from "moment";

function MyCalendar(props) {
    let today = moment(new Date()).format("yyyy-MM-DD");
    let year = moment(new Date()).format("yyyy");
    let month = moment(new Date()).format("MM");
    let monthFirstDay = year + "-" + month + "-01";
    const [startDate,setStartDate] = useState(monthFirstDay);
    const [endDate,setEndDate] = useState(today);
    const onChange = (e) => {
        e.target.id === 'startDate' ? setStartDate(e.target.value): setEndDate(e.target.value)
      if(props.onChangeDate !==  undefined ){
          props.onChangeDate(e)
      }
    }
    if(props.basicInfo !==  undefined ){
        props.basicInfo(startDate,endDate);
    }
    
    return (
        <>
            <TextField
                id="startDate"
                label='시작일'
                type={"date"}
                value={startDate}
                onChange={onChange}
                style={{marginRight:'1vw'}}
            />
            <TextField
                id="endDate"
                label='종료일'
                type={"date"}
                value={endDate}
                onChange={onChange}
                style={{marginRight:'1vw'}}
            />
        </>
    );
}

export default MyCalendar;
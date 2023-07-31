import React from 'react'
import Clock from 'react-live-clock'

///////////////npm install --save react-live-clock    <---설치 꼭 해야함///
const LiveClock=()=> {

   
    return (
        
        <div className="Clock" >
            <Clock format={'YYYY년 MM월 DD일'}   ticking={true}/><br/><br/>
            <Clock format={'dddd HH:mm:ss'}   ticking={true}  />
            
        </div>
    )
}

export default LiveClock;

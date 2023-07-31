
import React,{useRef,useState,useEffect} from 'react';
import axios from "axios";
const BonusRandomBoxComponent = () => {
    const [empBonus,setEmpBonus] = useState({});
    const box = useRef(null);
    const resultBox = [
        {
            result : '-50',
            url :  require('./img/-50퍼.png')
        },{
            result : '-10',
            url :  require('./img/-10퍼.png')
        },{
            result : '10',
            url :  require('./img/10퍼.png')
        },{
            result : '50',
            url :  require('./img/50퍼.png')
        },{
            result : '100',
            url : require('./img/100퍼.png')
        },{
            result : '150',
            url : require('./img/150퍼.png')
        },
    ]
    let check = true;
    const openBox = () => {
        if(!check){
            return;
        }
        check = false;
        if(empBonus.bonus === undefined || empBonus.bonus === null ){
            if(window.confirm('후회하지마세요')){
                setTimeout(() => {
                    box.current.src=require('./img/열상.png');
                    setTimeout(() => {
                        const i = Math.floor( Math.random() * resultBox.length )
                        box.current.src=resultBox[i].url;
                        insert(resultBox[i].result);
                        setTimeout(() => {
                            alert(`${resultBox[i].result}% 당첨되었습니다`)
                        }, 200)
                    }, 1200)
                },700)
            }
        }else{
            alert(`${empBonus.bonus}% 이번달 증가금이 있습니다.`)
        }
    }
/////////////////////////////////////////////////////////////////////
    let nowDate = new Date();
    const nowMonth = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}`;
    

    const select = () => {
        axios.get(
            "http://localhost:8282/hr/salary/findterBonus.do",
            { params: {
                empCode: sessionStorage.getItem("empCodeInfo_token"),
                applyYearMonth: nowMonth,
            }}
        ).then(({data}) => {
            
            setEmpBonus({
                empName : sessionStorage.getItem("empNameInfo_token"),
                empCode : data.empBonus.empCode,
                applyYearMonth : data.empBonus.applyYearMonth,
                bonus :data.empBonus.bonus
            })
         })
        .catch(e => {
            setEmpBonus({
                empName : sessionStorage.getItem("empNameInfo_token"),
                empCode : sessionStorage.getItem("empCodeInfo_token"),
                applyYearMonth : nowMonth,
                bonus :null
            })
        });
    }

    const insert = (result) => {
        axios.post(
            "http://localhost:8282/hr/salary/registerBonus.do",
            {
                empName : sessionStorage.getItem("empNameInfo_token"),
                empCode: empBonus.empCode,
                applyYearMonth : nowMonth,
                bonus : result
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            },
        ).then(()=>{select()});
    }
    
    const del = () => {
        axios.post(
            "http://localhost:8282/hr/salary/removeAllBonus.do",
        ).then(()=>{select()});
    }
    useEffect(select, []);
    return (
        <>
        <h2>
        {empBonus.empName} 님 환영합니다. 
        {empBonus.bonus ?`이번달 기본급에서 ${empBonus.bonus}% 증가 했습니다.` : '기회가 있습니다. 랜덤박스를 클릭하세요!'}
        </h2>
        <button onClick={del}>초기화</button>
        <div style={{
            "display": "flex",
            "align-items": "center",
            "justify-content": "center" ,
            "width":"100%",
            "height":"70%",

            }}>
            <div>
            </div>
            <div style={
                {
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center"  
                }
            }>
                <img src={require('./img/닫상.png')} onClick={openBox} ref={box}/>
            </div>
        </div>
        </>
    )
}

export default BonusRandomBoxComponent;
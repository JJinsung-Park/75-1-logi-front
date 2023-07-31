import React from "react";
import "./Cards.scss";
import CardItem from "./CardItem";
import { useSelector } from "react-redux";


function Cards({close}) {
  const list=[];
  const { menuList } = useSelector(state => state.menuListReducer)

  const imgList=[
    "https://picsum.photos/200/300"
    ,"http://farm1.staticflickr.com/33/45336904_1aef569b30_n.jpg"
    ,"http://farm6.staticflickr.com/5211/5384592886_80a512e2c9.jpg"
    ,"http://farm4.staticflickr.com/3691/11268502654_f28f05966c_m.jpg"
    ,"https://placeimg.com/640/480/any"
    ,"https://source.unsplash.com/random/200x200"
    ,"https://source.unsplash.com/random/201x200" 
    ,"https://source.unsplash.com/random/202x200"
    ,"https://source.unsplash.com/random/203x200"
    ,"https://source.unsplash.com/random/204x200"
    ,"https://source.unsplash.com/random/205x200"
    ,"https://source.unsplash.com/random/206x200"
    ,"https://source.unsplash.com/random/207x200"
    ,"https://source.unsplash.com/random/208x200"
    ,"https://source.unsplash.com/category/nature"
  ]
  const random=e=>{
    return e[Math.floor(Math.random()*e.length)]
  }
  menuList.map(el=>{
      el.subMenuList.map(el=>{
        el.subMenuList.map(el=>{
            if(el.menuUrl!=null || el.menuName!=null){
              Object.assign(el,{src:random(imgList)})
            list.push(el);
            }
          return null
        })
      return null
      })
    return null
  })
  return (
      <div >
          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index<10)
            return <CardItem close={close} src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>

          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index>10 && index<21)
            return <CardItem close={close}  src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>

          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index>20 && index<31)
            return <CardItem close={close} src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>
          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index>30 && index<41)
            return <CardItem close={close} src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>
          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index>40 && index<51)
            return <CardItem close={close} src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>
          <ul className="cards__items">
          {list.map((el,index)=>{
            if(index>50 && index<61)
            return <CardItem close={close} src={el.src} path={el.menuUrl} text={el.menuName}/>
          })}
          </ul>
          
         
        
      </div>
  );
}

export default Cards;
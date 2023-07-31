import React from "react";
import { Link } from "react-router-dom";

function CardItem({path,src,text,close}) {
  return (
    <>
      <li className="cards__item" onClick={close}>
        <Link className="cards__item__link" to={path}>
          <figure className="cards__item__pic-wrap" onClick={close}>
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={src}
              
            />
            
          </figure>
          <figcaption> {text}</figcaption>
        </Link>
      </li>
    </>
  );
}

export default CardItem;

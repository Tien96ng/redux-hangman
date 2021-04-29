import React from "react";
import "../css/Background.css";
import mushroom from '../img/mushroom.jpg'
import mushroom1 from '../img/mushroom1.png'
import mushroom2 from '../img/mushroom2.png'

import blue_mushroom from '../img/blue_mushroom.png'
export default function Background() {
  return (
    <>
        <div className="area" >
        <ul className="circles">
          <li><img src={blue_mushroom} className="mushroom"/></li>
          <li><img src={blue_mushroom} className="mushroom"/></li>
          <li><img src={blue_mushroom} className="mushroom2"/></li>
          <li><img src={blue_mushroom} className="mushroom"/></li>
          <li><img src={blue_mushroom} className="mushroom4"/></li>
          <li><img src={blue_mushroom} className="mushroom3"/></li>
          <li><img src={blue_mushroom} className="mushroom3"/></li>
          <li><img src={blue_mushroom} className="mushroom3"/></li>
          <li><img src={blue_mushroom} className="mushroom"/></li>
          <li><img src={blue_mushroom} className="mushroom3"/></li>
          <li><img src={blue_mushroom} className="mushroom"/></li>
        </ul>
      </div >
    </>
  )
}
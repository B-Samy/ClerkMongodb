'use client'

import React from 'react'
import '../../app/globals.css'

export default function Loader() {



  return (
    <>

   <div className="loader">
  <div id="pacman" className="pacman">
    <div className="top"></div>
    <div className="bottom"></div>
  </div>
  <div id="foodContainer" className="foodContainer">
    <span className="food">🍔</span>
    <span className="food">🍟</span>
    <span className="food">🥤</span>
    <span className="food">🍳</span>
  </div>
</div>
    </>
  )
}

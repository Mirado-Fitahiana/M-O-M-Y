import React from 'react'
import {BsFillBellFill,BsFillEnvelopeFill,BsPersonCircle,BsSearch,BsJustify}
from 'react-icons/bs'

function Header({setSideBarOpen}) {

  return (
    <header className='header'>
        <div className="menu-icon">
            <BsJustify onClick={()=>{setSideBarOpen(true)}} className='icon'/>
        </div>
        <div className="header-left">
            <BsSearch className='icon'/>
        </div>
        <div className="header-right">
            <BsFillBellFill className='icon' />
            <BsFillEnvelopeFill className='icon' />
            <BsPersonCircle className='icon' />
        </div>
    </header>
  )
}

export default Header
import React from 'react'
import {BsJustify, BsDoorClosed} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Header({setSideBarOpen}) {
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    localStorage.clear();
    navigate('/')
  };
  return (
    <header className='header'>
        <div className="menu-icon">
            <BsJustify onClick={()=>{setSideBarOpen(true)}} className='icon'/>
        </div>
        <div className="header-left">
            {/* <BsSearch className='icon'/> */}
        </div>
        <div className="header-right">
          <button className='deconnexion' onClick={handleDeconnexion}>
          <BsDoorClosed className='icon'/> Deconnexion
          </button>
        </div>
    </header>
  )
}

export default Header
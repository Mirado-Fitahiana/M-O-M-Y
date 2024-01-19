import React ,{useState}from 'react'
import Header from '../template/Header'
import SideBar from '../template/SideBar'
import Home from '../container/Home'
import '../App.css'

function Play({Component}) {
  const [sideBarOpen,setSideBarOpen] = useState(false);
  return (
     <div className='grid-container'>
      <Header setSideBarOpen={setSideBarOpen} />
      <SideBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen}/>
      {Component}
    </div>
  )
}

export default Play
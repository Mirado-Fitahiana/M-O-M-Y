    import React from 'react'
import { BsCart3 ,BsGrid1X2Fill,BsFillArchiveFill,
BsFillGrid3X2GapFill,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill,BsXCircleFill
} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function SideBar({setSideBarOpen,sideBarOpen}) {
  return (
    <aside id='sidebar' className={sideBarOpen?"sidebar reveal":"sidebar"}>
        <div className="sidebar-title">
            <div className="sidebar-brand">
                <BsCart3 className='icon_header'/> SHOP
            </div>
            <span onClick={()=>{setSideBarOpen(false)}} className='icon clode_icon'><BsXCircleFill style={{color:'red'}}/></span>
        </div>

        <ul id='menu' className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/Acceuil"  onClick={()=>{setSideBarOpen(false)}}>
                    <BsGrid1X2Fill className='icon'/> Dashbord
                </Link>
            </li>
            <li className='sidebar-list-item '>
                <Link to="">
                    <BsFillArchiveFill className='icon'/> Insertion
                </Link>
                <ul>
                    <li>
                    <Link to="/Categorie" onClick={()=>{setSideBarOpen(false)}}> Categorie </Link>
                    <Link to="/Transmission" onClick={()=>{setSideBarOpen(false)}}> Transmission </Link>
                    <Link to="/Marque"  onClick={()=>{setSideBarOpen(false)}}> Marque </Link>
                    <Link to="/Model"  onClick={()=>{setSideBarOpen(false)}}> Modele </Link>
                    <Link to="/Categorie_marque"  onClick={()=>{setSideBarOpen(false)}}> Categorie Marque </Link>
                    <Link to="/Pays" onClick={()=>{setSideBarOpen(false)}}> Pays </Link>
                    <Link to="/Energie" onClick={()=>{setSideBarOpen(false)}}> Energie </Link>
                    <Link to="/Etat_vehicule" onClick={()=>{setSideBarOpen(false)}}> Etat </Link>
                    </li>
                </ul>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Client" onClick={()=>{setSideBarOpen(false)}}>
                    <BsPeopleFill className='icon' /> Client
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Annonce" onClick={()=>{setSideBarOpen(false)}}>
                    <BsListCheck className='icon' /> Annonce
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon' onClick={()=>{setSideBarOpen(false)}}/> Parametre
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default SideBar
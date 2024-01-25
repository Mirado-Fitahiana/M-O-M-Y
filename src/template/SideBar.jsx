import React from 'react'

import {BsGrid1X2Fill,BsFillArchiveFill,
    BsPeopleFill,BsListCheck,BsFillGearFill,BsXCircleFill,BsCarFront,
    BsFillCartFill

} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function SideBar({setSideBarOpen,sideBarOpen}) {
  return (
    <aside id='sidebar' className={sideBarOpen?"sidebar reveal":"sidebar"}>
        <div className="sidebar-title">
            <div className="sidebar-brand">

                <BsCarFront className='icon_header'/> Repr'Izy

            </div>
            <span onClick={()=>{setSideBarOpen(false)}} className='icon clode_icon'>X</span>
        </div>
        <ul id='menu' className='sidebar-list'>
            <li className='sidebar-list-item'>

                <Link to="/Acceuil" onClick={()=>{setSideBarOpen(false)}}>
                    <BsGrid1X2Fill className='icon'  /> Dashboard

                </Link>
            </li>
            <li className='sidebar-list-item '>
                <Link to="">
                    <BsFillArchiveFill className='icon'/> Insertions
                </Link>
                <ul>

                    <li><Link className='insertion' to="/Categorie" onClick={()=>{setSideBarOpen(false)}} > Categorie </Link></li>
                    <li><Link className='insertion' to="/Transmission" onClick={()=>{setSideBarOpen(false)}} > Transmission </Link></li>
                    <li><Link className='insertion' to="/Marque" onClick={()=>{setSideBarOpen(false)}} > Marque </Link></li>
                    <li><Link className='insertion' to="/Model" onClick={()=>{setSideBarOpen(false)}} > Modele </Link></li>
                    <li><Link className='insertion' to="/Categorie_marque" onClick={()=>{setSideBarOpen(false)}} > Categorie Marque </Link></li>
                    <li><Link className='insertion' to="/Type" onClick={()=>{setSideBarOpen(false)}} >Type</Link></li>
                    <li><Link className='insertion' to="/Pays" onClick={()=>{setSideBarOpen(false)}} > Pays </Link></li>
                    <li><Link className='insertion' to="/Energie" onClick={()=>{setSideBarOpen(false)}} > Energie </Link></li>
                    <li><Link className='insertion' to="/Etat_vehicule" onClick={()=>{setSideBarOpen(false)}} > Etat </Link></li>

                </ul>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Client">
                    <BsPeopleFill className='icon'/> Client
                </Link>
            </li>

            <li className='sidebar-list-item'  >
                <Link to="/Annonce" onClick={()=>{setSideBarOpen(false)}}>
                    <BsListCheck className='icon' /> Annonce
                </Link>
            </li>
            <li className='sidebar-list-item'  >
                <Link to="/Vente" onClick={()=>{setSideBarOpen(false)}}>
                    <BsFillCartFill className='icon' /> Vente
                </Link>
            </li>
            <li className='sidebar-list-item' >
                <Link to="/Parametre" onClick={()=>{setSideBarOpen(false)}} >
                    <BsFillGearFill className='icon' /> Parametres

                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Parametres
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default SideBar
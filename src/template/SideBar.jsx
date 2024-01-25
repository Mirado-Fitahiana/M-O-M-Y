import React from 'react'
import { BsCart3 ,BsGrid1X2Fill,BsFillArchiveFill,BsPeopleFill,BsListCheck,BsFillGearFill,BsXCircleFill,BsCarFront
} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function SideBar({setSideBarOpen,sideBarOpen}) {
  return (
    <aside id='sidebar' className={sideBarOpen?"sidebar reveal":"sidebar"}>
        <div className="sidebar-title">
            <div className="sidebar-brand">
                <BsCarFront className='icon_header'/> Repr'Izy
            </div>
            <span onClick={()=>{setSideBarOpen(false)}} className='icon clode_icon'><BsXCircleFill style={{color:'red'}}/></span>
        </div>
        <ul id='menu' className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/Acceuil">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item '>
                <Link to="">
                    <BsFillArchiveFill className='icon'/> Insertions
                </Link>
                <ul>
                    <li><Link className='insertion' to="/Categorie"> Categorie </Link></li>
                    <li><Link className='insertion' to="/Transmission"> Transmission </Link></li>
                    <li><Link className='insertion' to="/Marque"> Marque </Link></li>
                    <li><Link className='insertion' to="/Model"> Modele </Link></li>
                    <li><Link className='insertion' to="/Categorie_marque"> Categorie Marque </Link></li>
                    <li><Link className='insertion' to="/Type">Type</Link></li>
                    <li><Link className='insertion' to="/Pays"> Pays </Link></li>
                    <li><Link className='insertion' to="/Energie"> Energie </Link></li>
                    <li><Link className='insertion' to="/Etat_vehicule"> Etat </Link></li>
                </ul>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Client">
                    <BsPeopleFill className='icon'/> Client
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Annonce">
                    <BsListCheck className='icon'/> Annonce
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Vente">
                    <BsFillCartFill className='icon'/> Vente
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
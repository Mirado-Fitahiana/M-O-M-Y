    import React from 'react'
import { BsCart3 ,BsGrid1X2Fill,BsFillArchiveFill,
BsFillGrid3X2GapFill,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill
} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function SideBar({setSideBarOpen,sideBarOpen}) {
  return (
    <aside id='sidebar' className={sideBarOpen?"sidebar reveal":"sidebar"}>
        <div className="sidebar-title">
            <div className="sidebar-brand">
                <BsCart3 className='icon_header'/> SHOP
            </div>
            <span onClick={()=>{setSideBarOpen(false)}} className='icon clode_icon'>X</span>
        </div>

        <ul id='menu' className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/Acceuil">
                    <BsGrid1X2Fill className='icon'/> Dashbord
                </Link>
            </li>
            <li className='sidebar-list-item '>
                <Link to="">
                    <BsFillArchiveFill className='icon'/> Insertion
                </Link>
                <ul>
                    <li>
                    <Link to="/Categorie"> Categorie </Link>
                    <Link to="/Transmission"> Transmission </Link>
                    <Link to="/Marque"> Marque </Link>
                    <Link to="/Model"> Modele </Link>
                    <Link to="/Categorie_marque"> Categorie Marque </Link>
                    <Link to="/Pays"> Pays </Link>
                    <Link to="/Energie"> Energie </Link>
                    <Link to="/Etat_vehicule"> Etat </Link>
                    </li>
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
                <a href="">
                    <BsFillGearFill className='icon'/> Parametre
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default SideBar
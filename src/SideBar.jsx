import React from 'react'
import { BsCart3 ,BsGrid1X2Fill,BsFillArchiveFill,
BsFillGrid3X2GapFill,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill
} from 'react-icons/bs'

function SideBar() {
  return (
    <aside id='sidebar'>
        <div className="sidebar-title">
            <div className="sidebar-brand">
                <BsCart3 className='icon_header'/> SHOP
            </div>
            <span className='icon clode_icon'>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashbord
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Produit
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Client
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Rapport
                </a>
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
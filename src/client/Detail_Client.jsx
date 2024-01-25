import React from 'react'
import { Image } from 'primereact/image';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link } from 'react-router-dom';
import "primereact/resources/primereact.min.css";
import './annonce.css';
import './user.css';

function Detail_Client() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dummyData = [
        { id: 1, utilisateur: 'Jean', anonnce: '4', reussi: '7' },
        { id: 2, utilisateur: 'Mirado', anonnce: '3', reussi: '4' },
        { id: 3, utilisateur: 'Feno', anonnce: '2', reussi: '7' },
        { id: 4, utilisateur: 'Rado', anonnce: '0', reussi: '4' },
        { id: 5, utilisateur: 'Sandra', anonnce: '5', reussi: '7' },
        { id: 6, utilisateur: 'Tiana', anonnce: '4', reussi: '4' },
        { id: 7, utilisateur: 'Rija', anonnce: '3', reussi: '7' },
        { id: 8, utilisateur: 'Lanto', anonnce: '0', reussi: '4' },
        { id: 9, utilisateur: 'Tina', anonnce: '2', reussi: '7' },
        { id: 10, utilisateur: 'Rakoto', anonnce: '5', reussi: '4' },
        { id: 11, utilisateur: 'Lova', anonnce: '4', reussi: '7' },
        { id: 12, utilisateur: 'Mamisoa', anonnce: '3', reussi: '4' },
        { id: 13, utilisateur: 'Haja', anonnce: '0', reussi: '7' },
        { id: 14, utilisateur: 'Nirina', anonnce: '2', reussi: '4' },
        { id: 15, utilisateur: 'Mialy', anonnce: '5', reussi: '7' },
        { id: 16, utilisateur: 'Tahina', anonnce: '4', reussi: '4' },
        { id: 17, utilisateur: 'Rasoa', anonnce: '3', reussi: '7' },
        { id: 18, utilisateur: 'Fidisoa', anonnce: '0', reussi: '4' },
        { id: 19, utilisateur: 'Mandresy', anonnce: '2', reussi: '7' },
        { id: 20, utilisateur: 'Mamy', anonnce: '5', reussi: '4' },
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setCustomers(dummyData);
            setLoading(false);
        }, 1000);
    }, []);
    const detail = (rowData) => {
        return (
            <Link className='detail' to={'/Detail_annonce'}>
                {rowData.verified = 'Voir detail'}
            </Link>
        );
    };
    const nom = (rowData) => {
        return rowData.utilisateur;
    }
    const annonce = (rowData) => {
        return rowData.anonnce;
    }
    const reussi = (rowData) => {
        return rowData.reussi;
    }

    const header = (
        <div className="table-header">
            Annonces de l'utilisateur
        </div>
    );
    const images = [
        "fiara.jpg",
        "fiara.jpg",
        "fiara.jpg",
    ];
    const icon = (<i className="pi pi-search"></i>)
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <div className="user-profil">
                        <div className="image-container">
                            <Image className='sary circular-image' src={images[0]}  indicatorIcon={icon} alt="Image" preview></Image>
                            <h4>Yohan Rabe</h4>
                            <div className="stat">
                                <p><strong>80</strong> Anonnces</p>
                                <p><strong>80</strong> Voitures vendues</p>
                            </div>
                        </div>
                        {/* <div className="detail_user">
                            <div className="text">

                                <span>Nom:test </span>
                                <span>Date de naissance:test </span>
                                <span>Num Cin: 65474734734</span>
                            </div>
                            <div className="text">
                                <span>Prenom:test</span>

                                <span>Adresse:tett</span>
                            </div>
                        </div> */}
                    </div>
                    <DataTable className="custom-datatable" value={customers}
                        stripedRows
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Utilisateur','anonnce', 'reussi']} header={header}
                        emptyMessage="Tsy misy">
                        <Column className='column' field="utilisateur" header="Nom"  body={nom} style={{ minWidth: '12rem' }} filter filterPlaceholder='recherche par nom' />
                        <Column className='column' field="anonnce" header="Nombre Annonce" body={annonce} style={{ minWidth: '12rem' }} sortable />
                        <Column className='column' field="reussi" header="Vente Reussi" style={{ minWidth: '14rem' }} body={reussi} sortable />
                        <Column className='column detail-button' field="" header="" style={{ minWidth: '12rem' }} body={detail}/>

                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Detail_Client
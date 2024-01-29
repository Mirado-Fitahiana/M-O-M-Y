import React from 'react'
import { Image } from 'primereact/image';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link, useParams } from 'react-router-dom';
import { get} from '../axios_utils';

import "primereact/resources/primereact.min.css";
import './annonce.css';
import './user.css';
import { DotLoader } from 'react-spinners';

function Detail_Client() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id_client} = useParams();
    const [dataClient,setDataClient] = useState([]);
    const [annonceClient,setAnnonceClient] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detail,annonce] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Clients/' + id_client),
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces/client/' + id_client),
                ]);
                setDataClient(detail.data.data[0]);
                setAnnonceClient(annonce.data.data[0])
                console.log(annonceClient.length);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // console.log(dataClient);
     console.log(annonceClient);
    
    const detail = (rowData) => {
        return (
            <Link className='detail' to={'/Detail_annonce/'+rowData.id}>
                {rowData.verified = 'Voir detail'}
            </Link>
        );
    };
    const date_annonce = (rowData) => {
        const timestamp = rowData.date;
        const date = new Date(timestamp);
        const formatted = date.toLocaleString(); 
        return formatted;
    }
    const annonce = (rowData) => {
        return rowData.marque.nom;
    }
    const reussi = (rowData) => {
        return rowData.etatVehicule.nom;
    }

    const header = (
        <div className="table-header">
            Annonces de l' utilisateur
        </div>
    );
    // const images = [
    //     "fiara.jpg",
    // ];
    const icon = (<i className="pi pi-search"></i>)
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <div className="user-profil">
                        <div className="image-container">
                        <Image className='sary circular-image' src={dataClient.image || "/sarydefault.png"} indicatorIcon={icon} alt="loading.." preview />
                            <h4>{dataClient.prenom} {dataClient.nom}</h4>
                            <div className="stat">
                                <p><strong>{dataClient.annonce}</strong> Annonces</p>
                                <p><strong>{dataClient.vente}</strong> Vendues</p>
                            </div>
                        </div>
                        <div className="detail_user">
                            <div className="text">
                                <span>Date de naissance:{dataClient.dtn ? dataClient.dtn:" Non precise"}</span>
                                <span>CIN: {dataClient.cin}</span>
                            </div>
                        </div>
                      
                    </div>
                    <DataTable className="custom-datatable" value={annonceClient}
                        stripedRows
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Date','voiture', 'etat']} header={header}
                        emptyMessage="En attente">
                        <Column className='column' field="date" header="Date Annonce"  body={date_annonce} style={{ minWidth: '12rem' }} filter filterPlaceholder='recherche par nom' />
                        <Column className='column' field="voiture" header="Voiture" body={annonce} style={{ minWidth: '12rem' }}  />
                        <Column className='column' field="etat" header="Etat" style={{ minWidth: '14rem' }} body={reussi} />
                        <Column className='column detail-button' field="" header="" style={{ minWidth: '12rem' }} body={detail}/>


                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Detail_Client
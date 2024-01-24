import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link } from 'react-router-dom';
import "primereact/resources/primereact.min.css";
import './annonce.css';
import { Button } from 'primereact/button';
const Annonce = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const dummyData = [
        { id: 1, date: '02-05-2023', utilisateur: 'Jean', marque: 'mercedes', etat: 'En attente' },
        { id: 2, date: '02-06-2023', utilisateur: 'Mirado', marque: 'audi', etat: 'Valider' },
        { id: 3, date: '02-07-2023', utilisateur: 'Feno', marque: 'toyota', etat: 'En attente' },
        { id: 4, date: '02-08-2023', utilisateur: 'Rado', marque: 'bmw', etat: 'Valider' },
        { id: 5, date: '02-09-2023', utilisateur: 'Sandra', marque: 'volkswagen', etat: 'En attente' },
        { id: 6, date: '02-10-2023', utilisateur: 'Tiana', marque: 'mercedes', etat: 'Valider' },
        { id: 7, date: '02-11-2023', utilisateur: 'Rija', marque: 'audi', etat: 'En attente' },
        { id: 8, date: '02-12-2023', utilisateur: 'Lanto', marque: 'bmw', etat: 'Valider' },
        { id: 9, date: '02-01-2023', utilisateur: 'Tina', marque: 'toyota', etat: 'En attente' },
        { id: 10, date: '02-01-2023', utilisateur: 'Rakoto', marque: 'volkswagen', etat: 'Valider' },
        { id: 11, date: '02-01-2023', utilisateur: 'Lova', marque: 'mercedes', etat: 'En attente' },
        { id: 12, date: '02-01-2023', utilisateur: 'Mamisoa', marque: 'audi', etat: 'Valider' },
        { id: 13, date: '02-01-2023', utilisateur: 'Haja', marque: 'bmw', etat: 'En attente' },
        { id: 14, date: '02-01-2023', utilisateur: 'Nirina', marque: 'toyota', etat: 'Valider' },
        { id: 15, date: '02-01-2023', utilisateur: 'Mialy', marque: 'volkswagen', etat: 'En attente' },
        { id: 16, date: '02-01-2023', utilisateur: 'Tahina', marque: 'mercedes', etat: 'Valider' },
        { id: 17, date: '02-01-2023', utilisateur: 'Rasoa', marque: 'audi', etat: 'En attente' },
        { id: 18, date: '02-01-2023', utilisateur: 'Fidisoa', marque: 'bmw', etat: 'Valider' },
        { id: 19, date: '02-01-2022', utilisateur: 'Mandresy', marque: 'toyota', etat: 'En attente' },
        { id: 20, date: '02-01-2025', utilisateur: 'Mamy', marque: 'volkswagen', etat: 'Valider' },
    ];

    


    useEffect(() => {
        // Simulating an asynchronous data fetch
        setLoading(true);
        setTimeout(() => {
            setCustomers(dummyData);
            setLoading(false);
        }, 1000); // Simulating a 1-second delay
    }, []); // Empty dependency array to run the effect only once on component mount

    const header = (
        <div className="table-header">
            Liste des annonces
        </div>
    );

    const formatDate = (value) => {
        // Convertir le format '02-05-2023' en '2023-02-05'
        const formattedDate = value.split('-').reverse().join('-');
        
        // Créer un objet Date avec le nouveau format
        const dateObject = new Date(formattedDate);
    
        // Formater la date selon le format souhaité
        return dateObject.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };
    const countryBodyTemplate = (rowData) => {
        return rowData.utilisateur;
    };

    const representativeBodyTemplate = (rowData) => {
        return rowData.marque;
    };

    const statusBodyTemplate = (rowData) => {
        return rowData.etat;
    };

    const detailTemplate = (rowData) => {
        return (
            // <Link to={`/details/${rowData.id}`}>
            <Link to={'/Detail_annonce'} style={{textDecoration:'none',color:'black',border:'2px solid',borderRadius:'25px'}}>
              {rowData.verified ='Voir detail' }
            </Link>
          );
    };  
    return (
        <main className='main-container'>
            <div className="second-container">
            
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={customers}
                        stripedRows
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['date', 'utilisateur', 'marque', 'etat']} header={header}
                        emptyMessage="No customers found.">
                        <Column field="date" header="Date" dataType="date" body={dateBodyTemplate} style={{ minWidth: '12rem' }} sortable/>
                        <Column field="utilisateur" header="Utilisateur" body={countryBodyTemplate} style={{ minWidth: '12rem' }} filter filterPlaceholder="recherche par utilisateur" />
                        <Column field="marque" header="Marque" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style marque" />
                        <Column field="etat" header="Etat" style={{ minWidth: '12rem' }} body={statusBodyTemplate} sortable/>
                        <Column field="detail" header="" dataType="boolean" style={{ minWidth: '6rem' }} body={detailTemplate}/>

                    </DataTable>
                </div>
            </div>
        </main>
    );
};


export default Annonce;

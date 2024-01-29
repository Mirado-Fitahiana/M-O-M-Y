// import React from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link } from 'react-router-dom';
import "primereact/resources/primereact.min.css";
import './annonce.css'
import { get } from '../axios_utils';

function Liste_client() {
  const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Simulating an asynchronous data fetch
      setLoading(true);
      setTimeout(() => {
          setData(get('https://repr-izy-production.up.railway.app/api/v1/Clients')
          .then(response => {
              setData(response.data.data);
              console.log(response.data.data); 
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              setLoading(false);
            })
          );
      }, 1000); // Simulating a 1-second delay
  }, []);

  const nom = (rowData) =>{
    return rowData.nom +" "+rowData.prenom;
  }
  const annonce = (rowData) => {
    
    return rowData.cin;
  }
  const reussi = (rowData) => {
    const timestamp = rowData.dateInscription;
    const date = new Date(timestamp);
    const formatted = date.toLocaleString(); 
    return formatted;
  }
  const detail = (rowData) => {
    return (
        <Link className='detail' to={'/Detail_Client/'+rowData.id}>
          {rowData.verified ='Voir detail' }
        </Link>
      );
}; 
  return (
    <main className='main-container'>
            <div className="second-container">
                  <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des utilisateurs</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        stripedRows
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Utilisateur','anonnce', 'reussi']}
                        emptyMessage="Tsy misy">
                        <Column className='column' field="utilisateur" header="Nom"  body={nom} style={{ minWidth: '12rem' }} filter filterPlaceholder='recherche par nom' />
                        <Column className='column' field="anonnce" header="CIN" body={annonce} style={{ minWidth: '12rem' }} />
                        <Column className='column' field="reussi" header="Date inscription" style={{ minWidth: '14rem' }} body={reussi} sortable />
                        <Column className='column detail-button' field="" header="" style={{ minWidth: '12rem' }} body={detail}/>
                    </DataTable>
                </div>
            </div>
        </main>
  )
}

export default Liste_client
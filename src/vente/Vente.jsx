import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { get } from '../axios_utils';
import "primereact/resources/primereact.min.css";
import '../annonce/annonce.css';
import MyUrl from '../MyUrl';

function Vente() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await get(MyUrl+'Ventes');
                setData(response.data.data[0]);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const vente = (rowData) => rowData.id;
    const vendeur = (rowData) => rowData.vendeurUser.nom+" "+rowData.vendeurUser.prenom;
    const acheteur = (rowData) => rowData.acheteurUser.nom+" "+rowData.acheteurUser.prenom;

    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des ventes</h4>
                    <DataTable className="custom-datatable" value={data}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        // globalFilterFields={['date', 'utilisateur', 'marque', 'etat']}
                        emptyMessage="No customers found.">
                        <Column className='column' field="date" header="Annonce" dataType="date" body={vente} style={{ minWidth: '12rem' }} />
                        <Column className='column' field="utilisateur" header="Vendeur" body={vendeur} style={{ minWidth: '12rem' }}  />
                        <Column className='column' field="marque" header="Acheteur" style={{ minWidth: '14rem' }} body={acheteur} />
                    </DataTable>
                </div>
            </div>
        </main>
    );
}

export default Vente;

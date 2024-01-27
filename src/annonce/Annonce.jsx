import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link } from 'react-router-dom';
import "primereact/resources/primereact.min.css";
import './annonce.css';
import { get } from '../axios_utils';
const Annonce = () => {
    
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([]);

    useEffect(() => {
        // Simulating an asynchronous data fetch
        setLoading(true);
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Annonces')
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
    }, []); // Empty dependency array to run the effect only once on component mount

    // const formatDate = (value) => {
    //     const formattedDate = value.split('-').reverse().join('-');
    //     const dateObject = new Date(formattedDate);
    //     return dateObject.toLocaleDateString('en-US', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric'
    //     });
    // };

    const dateBodyTemplate = (rowData) => {
        return rowData.date;
    };
    const countryBodyTemplate = (rowData) => {
        return rowData.user.prenom;
    };

    const representativeBodyTemplate = (rowData) => {
        if(rowData.marque == null){
            rowData.marque = "non definie"
        }
        return rowData.marque;
    };

    const statusBodyTemplate = (rowData) => {
        if(rowData.etat == null){
            rowData.etat = "non definie"
        }
        return rowData.etat;
    };

    const detailTemplate = (rowData) => {
        return (
            // <Link to={`/details/${rowData.id}`}>
            <Link className='detail' to={`/Detail_annonce/${rowData.id}`}>
              {rowData.verified ='Voir detail' }
            </Link>
          );
    };  
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['date', 'utilisateur', 'marque', 'etat']}
                        emptyMessage="No customers found.">
                        <Column className='column' field="date" header="Date" dataType="date" body={dateBodyTemplate} style={{ minWidth: '12rem' }} sortable/>
                        <Column className='column' field="utilisateur" header="Utilisateur" body={countryBodyTemplate} style={{ minWidth: '12rem' }} filter filterPlaceholder="recherche par utilisateur" />
                        <Column className='column' field="marque" header="Marque" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style marque" />
                        <Column className='column' field="etat" header="Etat" style={{ minWidth: '12rem' }} body={statusBodyTemplate} sortable/>
                        <Column className='column detail-button' field="detail" header="" dataType="boolean" style={{ minWidth: '6rem' }} body={detailTemplate}/>
                    </DataTable>
                </div>
            </div>
        </main>
    );
};


export default Annonce;

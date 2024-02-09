import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Link } from 'react-router-dom';
import "primereact/resources/primereact.min.css";
import './annonce.css';
import { get } from '../axios_utils';
import MyUrl from '../MyUrl';
const Annonce = () => {
    
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([]);

    useEffect(() => {
        // Simulating an asynchronous data fetch
        setLoading(true);
        setTimeout(() => {
            setData(get(MyUrl+'Annonces')
            .then(response => {
                // console.log(response); 
                setData(response.data.data);
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
              })
            );
        }, 1000); // Simulating a 1-second delay
    }, []); // Empty dependency array to run the effect only once on component mount

   
    const convertDate = (rowData) => {
        const timestamp = rowData.date;
        const date = new Date(timestamp);
        const formatted = date.toLocaleString(); 
        return formatted;
      };

    const detailTemplate = (rowData) => {
        return (
            <Link className='detail' to={`/Detail_annonce/${rowData.id}`}>
              {rowData.verified ='Voir detail' }
            </Link>
          );
    };  
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h4 className="annonce-title" >Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['date', 'utilisateur', 'marque', 'etat']}
                        emptyMessage="No customers found.">
                        <Column className='column' field="date" header="Date" dataType="date" body={convertDate} style={{ minWidth: '12rem' }} sortable/>
                        <Column className='column' field="utilisateur" header="Utilisateur" body={(rowData)=>rowData.user.nom+" "+rowData.user.prenom} style={{ minWidth: '12rem' }} filter filterPlaceholder="recherche par utilisateur" />
                        <Column className='column' field="etat" header="Etat" style={{ minWidth: '12rem' }} body={(rowData)=>rowData.etatVehicule.nom} sortable/>
                        <Column className='column detail-button' field="detail" header="" dataType="boolean" style={{ minWidth: '6rem' }} body={detailTemplate}/>
                    </DataTable>
                </div>
            </div>
        </main>
    );
};


export default Annonce;
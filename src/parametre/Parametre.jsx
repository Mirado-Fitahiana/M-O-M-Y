import { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { post, handleChange, get } from '../axios_utils';
import Loader from '../loader/Loader';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";

function Parametre() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    
    useEffect(() => {
        
        setTimeout(() => {
            // loading(true)
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Parametres')
            
            .then(response => {
                setLoading(true);
                setData(response.data.data);
                console.log(response.data.data); 
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
              })
            );
        
            setLoading(false);
            
        }, 1000); 
       
    }, []);
    

    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
    };
    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();

        const response = await post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Parametres')
        if (response.data.error) {
            setLoader(false);
            setMessage(response.data.error)
            showError()
        } else {
            setLoader(false);
            setMessage(response.data.data[0].nom)
            showSuccess()
        }
        // const typesResponse = await get('https://repr-izy-production.up.railway.app/api/v1/Types');

    };
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h4>Parametrage de la commission</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form__group field">
                            <input onChange={handleInput} name='min' type="input" className="form__field" placeholder="Prix Minimal" required="" />
                            <label htmlFor="name" className="form__label">Prix Minimal</label>
                        </div>
                        <div className="form__group field">
                            <input onChange={handleInput} name='max' type="input" className="form__field" placeholder="Prix maximal" required="" />
                            <label htmlFor="name" className="form__label">Prix Maximal</label>
                        </div>
                        <div className="form__group field">
                            <input onChange={handleInput} name='pourcentage' type="input" className="form__field" placeholder="% de la commision" required="" />
                            <label htmlFor="name" className="form__label">% de la commision</label>
                        </div>
                        {loader && <Loader />}
                        <button className="button" type='submit'>
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Parametres</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '15rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Donnees en attentes">
                        <Column className='column' field="prixmin" header="Prix Minimum" style={{ minWidth: '14rem' }} body={(rowData)=>rowData.prixmin} filter filterPlaceholder="recherche par style nom" />
                        <Column className='column' field="prixmax" header="Prix Maximum" style={{ minWidth: '14rem' }} body={(rowData)=>rowData.prixmax} filter filterPlaceholder="recherche par style nom" />
                        <Column className='column' field="pourcentage" header="Pourcentage" style={{ minWidth: '14rem' }} body={(rowData)=>rowData.pourcentage} filter filterPlaceholder="recherche par style nom" />
                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Parametre
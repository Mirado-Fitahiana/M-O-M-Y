import './form.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useRef ,useEffect} from 'react';
import { get, handleChange, post } from '../axios_utils';
function Transmission() {
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [formData,setFormData]=useState(new FormData());
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Transmissions')
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
        }, 1000); 
    }, []);

    const representativeBodyTemplate = (rowData) => {
        return rowData.nom;
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    const handleInput=(e)=>{
        handleChange(e,formData,setFormData);
    }
    const handleSubmit=(e) =>{
        e.preventDefault();
        const response= post(formData,setFormData,'https://repr-izy-production.up.railway.app/api/v1/Transmissions');
        if (response.error) {
            setMessage(response.data.error);
            showError();
          
        }else{
            
            showSuccess();
           
        }
    };
   
    return (
        <main className='main-container'>
        <div className="second-container">
        <div className="input-card">
            <h1>Insertion Transmission</h1>
            <form onSubmit={handleSubmit} action="">

                <div className="form__group field">
                    <input onChange={handleInput} name='transmission' type="input" className="form__field" placeholder="Name" required="" />
                    <label htmlFor="name" className="form__label">N. Transmission</label>
                </div>
                <button type='submit' className="button">
                    <span className="box">
                        Enregistrer
                    </span>
                </button>
            </form>
            <Toast ref={toast} />
        </div>
        <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Transmission</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Pas de donnees">
                        <Column className='column' field="nom" header="Nom" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style nom" />
                    </DataTable>
                </div>
        </div>
    </main>
    )
}

export default Transmission
// import './form.css';
import React, { useState, useEffect ,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import  '../axios_utils';
import { get, handleChange, post } from '../axios_utils';
import { Toast } from 'primereact/toast';
function Categorie() {
    // const [sideBarOpen,setSideBarOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    const [formData,setFormData]=useState(new FormData());
    const [message,setMessage] = useState("");
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };
    
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Categories')
            .then(response => {
                // Assuming the data is in response.data.data
                setData(response.data.data);
                console.log(response.data.data); // Access the data here
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
              })
            );
            // setCustomers(data);
            setLoading(false);
            
        }, 1000); 
        // console.log(data);
    }, []);
    
    
    
    const representativeBodyTemplate = (rowData) => {
        return rowData.nom;
    };

    

    // localStorage.setItem('token','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYyNTQ0NDYsImV4cCI6MTcwNjM0MDg0Nn0.sXjb3-erDqg7W98MfRiM8XHR19SEtvc2prTbWGQ4daM');

    const handleInput=(e)=>{
        handleChange(e,formData,setFormData);
        console.log(formData.values);
    }
    

    const handleSubmit=(e) =>{
        e.preventDefault();
        const response = post(formData,setFormData,'https://repr-izy-production.up.railway.app/api/v1/Categories');
        if (response.error) {
            setMessage(response.error);
            showError();
          
        }else{
            
            showSuccess();
           
        }
    }
   
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Categorie</h1>
                    <form onSubmit={handleSubmit} action="">
                        <div className="form__group field">
                            <input onChange={handleInput} name='categorie' type="input" className="form__field" placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">Nom Categorie</label>
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
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Tsisy lty a tsisy.">
                        <Column className='column' field="nom" header="Nom" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style nom" />
                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Categorie
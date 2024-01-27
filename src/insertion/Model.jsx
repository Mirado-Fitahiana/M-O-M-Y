import './form.css'
import { get, handleChange, post } from '../axios_utils';
import  { useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
function Model() {
    const [message, setMessage] = useState("");
    const [data,setData]=useState([]);
    const [formData,setFormData]=useState(new FormData());
    const [marque,setMarque]=useState([]);
    const toast = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Modeles'));
            setMarque(get('https://repr-izy-production.up.railway.app/api/v1/Marques'));
        }, 1000); 
    }, []);

    localStorage.setItem('token','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYyNTQ0NDYsImV4cCI6MTcwNjM0MDg0Nn0.sXjb3-erDqg7W98MfRiM8XHR19SEtvc2prTbWGQ4daM');


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
        const response = post(formData,setFormData,'https://repr-izy-production.up.railway.app/api/v1/Modeles');
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
            <h1>Insertion nouveau modele</h1>
            <form onSubmit={handleSubmit} action="">
            <div className="form__group field">
                    <input onChange={handleInput} name='gamme' type="input" className="form__field" placeholder="Name" required="" />
                    <label htmlFor="name" className="form__label">Nom</label>
                </div>
                <div className="form__group field">
                    <label htmlFor="name" className="form__label">Marque</label>
                    <select onChange={handleInput} name="idmarque" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                    </select>
                </div>
                <button className="button">
                    <span className="box">
                        Enregistrer
                    </span>
                </button>
            </form>
            <Toast ref={toast} />
            </div>
        </div>
    </main>
    )
}

export default Model
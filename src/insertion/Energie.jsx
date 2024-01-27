
import axios from 'axios';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useRef ,useEffect} from 'react';
import { get, handleChange, post } from '../axios_utils';
function Energie() {
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [formData,setFormData]=useState(new FormData());
    const [data,setData]=useState([]);
    useEffect(() => {
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Energies'));
        }, 1000); 
    }, []);

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
        const response= post(formData,setFormData,'https://repr-izy-production.up.railway.app/api/v1/Energies');
        if (response.error) {
            setMessage(response.error);
            showError();
          
        }else{
            
            showSuccess();
           
        }
    };
    return (
        <main className='main-container'>
        <div className="second-container">
            <div className="input-card">
            <h1>Insertion Energie</h1>
                <form onSubmit={handleSubmit} action="">
                    <div className="form__group field">
                        <input onChange={handleInput} name='energie' type="input" className="form__field" placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Energie</label>
                    </div>
                    <button type='submit' className="button">
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

export default Energie
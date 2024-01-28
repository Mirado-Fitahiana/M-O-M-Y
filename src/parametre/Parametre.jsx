import { useState, useRef, useEffect } from 'react';
import { post, handleChange, get } from '../axios_utils';
import Loader from '../loader/Loader';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";

function Parametre() {
    const toast = useRef(null);
    const [message, setMessage] = useState("");
    const [loader,setLoader] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

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
        }else{
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
                        <input onChange={handleInput}  name='min' type="input" className="form__field" placeholder="Prix Minimal" required="" />
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
                    {loader && <Loader/>}
                    <button className="button" type='submit'>
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

export default Parametre
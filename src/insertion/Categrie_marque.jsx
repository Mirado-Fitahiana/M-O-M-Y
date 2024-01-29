import React, { useState, useEffect, useRef } from 'react'
import { post, handleChange, get } from '../axios_utils';
import Loader from '../loader/Loader';
import { Toast } from 'primereact/toast';
import { DotLoader } from 'react-spinners';
import './form.css'
function Categrie_marque() {
    const [categorie, setCategorie] = useState([]);
    const [marque, setMarques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(new FormData());
    const [loader, setLoader] = useState(true)
    const toast = useRef(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marqueResponse, categorieResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Marques'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Categories'),
                ]);
                setLoader(false)
                setMarques(marqueResponse.data.data[0]);
                setCategorie(categorieResponse.data.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Marques/addCategorie');
        if (response.error) {
            setMessage(response.error);
            showError();
        } else {
            showSuccess();
        }
    };
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };


    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
        console.log(formData.values);
    }

    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Categorie de la marque</h1>
                    {loader && <Loader />}
                    <form onSubmit={handleSubmit}>
                        <div className="form__group field">
                            <label htmlFor="name" className="form__label">Marque</label>
                            <select  onChange={handleInput} name="marque" id="marque">
                                <option value="">Marque</option>
                                {marque.map((option) => (
                                    <option key={option.id} value={option.id}>{option.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div className="checkbox-input">
                            <div className="checkbox-container">
                                <div className="checkbox">
                                    {categorie.map((option, index) => (
                                        <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'left',width:'60%'}}>
                                            <input
                                                onChange={handleInput}
                                                type="checkbox"
                                                className="checkbox__input"
                                                id={`checkbox${index}`}
                                                name="categorie"
                                                value={option.id}
                                                style={{}}
                                            />
                                            <label className="checkbox__label" htmlFor={`checkbox${index}`}>
                                                <span className="checkbox__custom"></span>
                                                {option.nom}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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

export default Categrie_marque
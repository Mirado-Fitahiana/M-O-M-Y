import React, { useState, useEffect } from 'react'
import { post, handleChange, get } from '../axios_utils';
import { DotLoader } from 'react-spinners';
import './form.css'
function Categrie_marque() {
    const [categorie, setCategorie] = useState([]);
    const [marque, setMarques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marqueResponse, categorieResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Marques'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Categories'),
                ]);

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
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Categorie de la marque</h1>
                    <form action="">
                        <div className="form__group field">
                            <label htmlFor="name" className="form__label">Marque</label>
                            <select name="marque" id="marque">
                                <option value="">Marque</option>
                                {marque.map((option) => (
                                    <option key={option.id} value={option.id}>{option.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div className="checkbox-input">
                            <div className="radio-button-container">
                                <div className="radio-button">
                                    {categorie.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                className="radio-button__input"
                                                id={`radio${index}`} // Using index to generate unique IDs
                                                name="categorie"
                                            />
                                            <label className="radio-button__label" htmlFor={`radio${index}`}>
                                                <span className="radio-button__custom"></span>
                                                {option.nom} {/* Assuming option is the text to display */}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="button">
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Categrie_marque
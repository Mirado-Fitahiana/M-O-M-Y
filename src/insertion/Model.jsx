import './form.css'
import { get, handleChange, post } from '../axios_utils';
import React, { useState, useEffect } from 'react';
function Model() {
    const [data,setData]=useState([]);
    const [formData,setFormData]=useState(new FormData());
    const [marque,setMarque]=useState([]);
    useEffect(() => {
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Modeles'));
            setMarque(get('https://repr-izy-production.up.railway.app/api/v1/Marques'));
        }, 1000); 
    }, []);

    localStorage.setItem('token','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYyNTQ0NDYsImV4cCI6MTcwNjM0MDg0Nn0.sXjb3-erDqg7W98MfRiM8XHR19SEtvc2prTbWGQ4daM');

    const handleInput=(e)=>{
        handleChange(e,formData,setFormData);
    }

    const handleSubmit=(e) =>{
        e.preventDefault();
        post(formData,setFormData,'https://repr-izy-production.up.railway.app/api/v1/Modeles');
    }
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                <h1>Insertion nouveau modele</h1>
                <form action="">
                <div className="form__group field">
                        <input name='gamme' type="input" className="form__field" placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Nom</label>
                    </div>
                    <div className="form__group field">
                        <label htmlFor="name" className="form__label">Marque</label>
                        <select name="idmarque" id="">
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
                    
                </div>
            </div>
        </main>
    )
}

export default Model
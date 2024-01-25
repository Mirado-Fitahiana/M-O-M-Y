// import './form.css';
import React, { useState, useEffect,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
function Categorie() {
    const [message,setMessage] = useState("");
    const toast = useRef(null);

    const dummyData = [
        { id: 1, date: '02-05-2023', utilisateur: 'Jean', marque: 'mercedes', etat: 'En attente' },
        { id: 2, date: '02-06-2023', utilisateur: 'Mirado', marque: 'audi', etat: 'Valider' },
        { id: 3, date: '02-07-2023', utilisateur: 'Feno', marque: 'toyota', etat: 'En attente' },
        { id: 4, date: '02-08-2023', utilisateur: 'Rado', marque: 'bmw', etat: 'Valider' },
        { id: 5, date: '02-09-2023', utilisateur: 'Sandra', marque: 'volkswagen', etat: 'En attente' },
        { id: 6, date: '02-10-2023', utilisateur: 'Tiana', marque: 'mercedes', etat: 'Valider' },
        { id: 7, date: '02-11-2023', utilisateur: 'Rija', marque: 'audi', etat: 'En attente' },
        { id: 8, date: '02-12-2023', utilisateur: 'Lanto', marque: 'bmw', etat: 'Valider' },
        { id: 9, date: '02-01-2023', utilisateur: 'Tina', marque: 'toyota', etat: 'En attente' },
        { id: 10, date: '02-01-2023', utilisateur: 'Rakoto', marque: 'volkswagen', etat: 'Valider' },
        { id: 11, date: '02-01-2023', utilisateur: 'Lova', marque: 'mercedes', etat: 'En attente' },
        { id: 12, date: '02-01-2023', utilisateur: 'Mamisoa', marque: 'audi', etat: 'Valider' },
        { id: 13, date: '02-01-2023', utilisateur: 'Haja', marque: 'bmw', etat: 'En attente' },
        { id: 14, date: '02-01-2023', utilisateur: 'Nirina', marque: 'toyota', etat: 'Valider' },
        { id: 15, date: '02-01-2023', utilisateur: 'Mialy', marque: 'volkswagen', etat: 'En attente' },
        { id: 16, date: '02-01-2023', utilisateur: 'Tahina', marque: 'mercedes', etat: 'Valider' },
        { id: 17, date: '02-01-2023', utilisateur: 'Rasoa', marque: 'audi', etat: 'En attente' },
        { id: 18, date: '02-01-2023', utilisateur: 'Fidisoa', marque: 'bmw', etat: 'Valider' },
        { id: 19, date: '02-01-2022', utilisateur: 'Mandresy', marque: 'toyota', etat: 'En attente' },
        { id: 20, date: '02-01-2025', utilisateur: 'Mamy', marque: 'volkswagen', etat: 'Valider' },
    ];

    


    // useEffect(() => {
    //     // Simulating an asynchronous data fetch
    //     setLoading(true);
    //     setTimeout(() => {
    //         setCustomers(dummyData);
    //         setLoading(false);
    //     }, 1000); // Simulating a 1-second delay
    // }, []); // Empty dependency array to run the effect only once on component mount

    // const formatDate = (value) => {
    //     const formattedDate = value.split('-').reverse().join('-');
    //     const dateObject = new Date(formattedDate);
    //     return dateObject.toLocaleDateString('en-US', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric'
    //     });
    // };

    // const dateBodyTemplate = (rowData) => {
    //     return formatDate(rowData.date);
    // };
    // const countryBodyTemplate = (rowData) => {
    //     return rowData.utilisateur;
    // };

    // const representativeBodyTemplate = (rowData) => {
    //     return rowData.marque;
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return rowData.etat;
    // };
   
    // set insert 

    const [formData, setFormData] = useState({
        categorie: '',
    });

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData.categorie);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'https://repr-izy-production.up.railway.app/api/v1/Categories';
        const token =localStorage.getItem('token');
        try {
            const data = new FormData();
            data.append('categorie', formData.categorie);
            data.append('authorization',token);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: apiUrl,
                headers: {
            
                },
                data: data
            };

            const response = await axios.request(config);

            if (response.data.error) {
                console.error('Erreur lors de la requête:', response.data);
                setMessage(response.data.error);
                showError();
            } else {
                console.log('Insertion réussie:', response.data);
                showSuccess();

                setFormData({
                    categorie: '',
                });
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à railway:', error);
        }
    };

    
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Categorie</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="form__group field">
                        <input type="text"
                        name='categorie' 
                        value={formData.categorie}
                        className="form__field"
                        placeholder="categories"
                        onChange={handleChange}
                        required />
                        <label htmlFor="name" className="form__label">Nom Categorie</label>
                    </div>

                    <button className="button" type='submit'>
                        <span className="box">
                            Enregistrer
                        </span>
                    </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                {/* <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={customers}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '400px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['date', 'utilisateur', 'marque', 'etat']}
                        emptyMessage="No customers found.">
                        <Column className='column' field="date" header="Date" dataType="date" body={dateBodyTemplate} style={{ minWidth: '12rem' }} sortable/>
                        <Column className='column' field="utilisateur" header="Utilisateur" body={countryBodyTemplate} style={{ minWidth: '12rem' }} filter filterPlaceholder="recherche par utilisateur" />
                        <Column className='column' field="marque" header="Marque" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style marque" />
                        <Column className='column' field="etat" header="Etat" style={{ minWidth: '12rem' }} body={statusBodyTemplate} sortable/>
                    </DataTable>
                </div> */}
            </div>
        </main>
    )
}

export default Categorie
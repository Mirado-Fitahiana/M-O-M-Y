import './form.css'
import { get, handleChange, post } from '../axios_utils';
import React, { useState, useEffect } from 'react';
import { DotLoader } from 'react-spinners';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Model() {
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [marques, setMarque] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYzNDczNjEsImV4cCI6MTcwNjQzMzc2MX0.8p8JZEFQFgPAs244qmBeV0Ro-rFyzuoc8amFMT2ChCk');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [modelesResponse, marquesResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Modeles'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Marques')
                ]);
                setData(modelesResponse.data.data[0]);
                setMarque(marquesResponse.data.data[0]);
                setIsLoading(false);
                setTableLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTableLoading(true);
        await post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Modeles')
        const typesResponse = await get('https://repr-izy-production.up.railway.app/api/v1/Modeles');
        setData(typesResponse.data.data[0]);
        setTableLoading(false);
    };
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion nouveau modele</h1>
                    {isLoading ?
                        <DotLoader color="#36d7b7" />
                        :
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form__group field">
                                <input onChange={handleInput} name='gamme' type="input" className="form__field" placeholder="Name" required="" />
                                <label htmlFor="name" className="form__label">Nom</label>
                            </div>
                            <div className="form__group field">
                                <label htmlFor="name" className="form__label">Marque</label>
                                <select onChange={handleInput} name="idmarque" id="">
                                    {marques.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type='submit' className="button">
                                <span className="box">
                                    Enregistrer
                                </span>
                            </button>
                        </form>
                    }
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={data}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        showGridlines
                        loading={isLoading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Modele', 'Marque']}
                        emptyMessage="Tsisy lty a tsisy.">
                        <Column className='column' field="nom" header="Modele" style={{ minWidth: '14rem' }} body={data.nom} filter filterPlaceholder="recherche par style nom" />
                        <Column className='column' field="idmarque" header="Marque" style={{ minWidth: '14rem' }} body={(rowData) => rowData.marque.nom} filter filterPlaceholder="recherche par marque" />
                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Model
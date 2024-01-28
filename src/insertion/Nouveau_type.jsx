import React, { useState, useEffect, useRef } from 'react';
import { DotLoader } from 'react-spinners';
import { post, handleChange, get } from '../axios_utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import Loader from '../loader/Loader';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Nouveau_type() {
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [tableLoading, setTableLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const toast = useRef(null);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYzNDczNjEsImV4cCI6MTcwNjQzMzc2MX0.8p8JZEFQFgPAs244qmBeV0Ro-rFyzuoc8amFMT2ChCk');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse, categoriesResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Types'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Categories'),
                ]);

                setData(typesResponse.data.data[0]);
                setCategorie(categoriesResponse.data.data[0]);
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

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };
    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        setTableLoading(true);
        const response = await post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Types')
        if (response.data.error) {
            setLoader(false);
            setMessage(response.data.error)
            showError()
        }else{
            setLoader(false);
            setMessage(response.data.data[0].nom)
            showSuccess()
        }
        const typesResponse = await get('https://repr-izy-production.up.railway.app/api/v1/Types');
        setData(typesResponse.data.data[0]);
        setTableLoading(false);
    };

    return (
        <main className="main-container">
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Nouveau type</h1>
                    {isLoading ? (
                        <DotLoader color="#36d7b7" />
                    ) : (
                        <form onSubmit={handleSubmit} action="">
                            <div className="form__group field">
                                <input onChange={handleInput} name="type" type="input" className="form__field" placeholder="Name" required />
                                <label htmlFor="name" className="form__label">
                                    Nom Type
                                </label>
                            </div>
                            <div className="form__group field">
                                <label htmlFor="name" className="form__label">
                                    Categorie
                                </label>
                                <select onChange={handleInput} className="select" name="idcategorie" id="">
                                    <option value="">Categorie</option>
                                    {categorie.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {loader && <Loader/>}
                            <button type="submit" className="button">
                                <span className="box">Enregistrer</span>
                            </button>
                        </form>
                    )}
                    <Toast ref={toast} />
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
                        globalFilterFields={['Type']}
                        emptyMessage="Donnnee en attente">
                        <Column className='column' field="nom" header="Type" style={{ minWidth: '14rem' }} body={data.nom} filter filterPlaceholder="recherche par style nom" />
                        <Column className='column' field="categorie" header="Categorie" style={{ minWidth: '14rem' }} body={(rowData) => rowData.cat.nom} sortable filter filterPlaceholder="recherche par categorie" />
                    </DataTable>
                </div>
            </div>
        </main>
    );
}

export default Nouveau_type;
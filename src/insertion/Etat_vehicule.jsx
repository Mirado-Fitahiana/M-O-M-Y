import React, { useState, useEffect, useRef } from 'react';
import { DotLoader } from 'react-spinners';
import { Toast } from 'primereact/toast';
import { post, handleChange, get, Delete, update } from '../axios_utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Loader from '../loader/Loader';
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import UpdateModal from '../component/UpdateModal';

function Etat_vehicule() {
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const toast = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Etats'),
                ]);
                setData(typesResponse.data.data[0]);
                setIsLoading(false);
                setTableLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateBodyTemplate = (rowData) => {
        return (
            <>
                <button className="p-button p-button-text" onClick={() => handleUpdate(rowData)} style={{ margin: '20px' }}>
                    <FaRegEdit style={{ fontSize: '1.5rem', color: 'green' }} />
                </button >
                <button className="p-button p-button-danger p-button-text" onClick={() => handleDelete(rowData)}>
                    <FaDeleteLeft style={{ fontSize: '1.5rem' }} />
                </button>
            </>
        );
    };

    const handleUpdate = (rowData) => {
        // Implement your update logic here using rowData.id
        setSelectedRowData(rowData);
        setModalOpen(true);
        console.log("Update clicked for id:", rowData.id);
    };
    const handleDelete = (rowData) => {
        console.log("Delete clicked for id:", rowData.id);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
    };
    
    const handleSubmit2 = (e) => {
        e.preventDefault();
        // setLoader(true);
        const response = update(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Etats/'+selectedRowData.id);
        if (response.error) {
            // setLoader(false)
            setMessage(response.data.error);
            showError();

        } else {
            // setLoader(false)
            console.log(response.data);
            showSuccess();
            setModalOpen(false)
        }
        const typeResponse = get('https://repr-izy-production.up.railway.app/api/v1/Categories');
        // setData(typeResponse.data.data);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        setTableLoading(true);
        const response = await post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Etats');
        if (response.data.error) {
            setMessage(response.data.error)
            showError();
            setLoader(false)
        } else {
            setMessage(response.data.data[0].nom)
            setLoader(false);
            showSuccess();
        }
        const typesResponse = await get('https://repr-izy-production.up.railway.app/api/v1/Etats');
        setData(typesResponse.data.data[0]);
        setTableLoading(false);
    };
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Etat Vehicule</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form__group field">
                            <input name="etat" onChange={handleInput} type="input" className="form__field" placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">Nom Etat</label>
                        </div>
                        {loader && <Loader />}
                        <button type="submit" className="button">
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des annonces</h4>
                    <DataTable className="custom-datatable" value={data}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={isLoading}
                        tableStyle={{ minWidth: '40rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Etat']}
                        emptyMessage="En attente de donnees">
                        <Column className='column' field="nom" header="Etat" style={{ minWidth: '14rem' }} body={data.nom} filter filterPlaceholder="recherche par style nom" />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />
                    </DataTable>
                </div>
            </div>
            <UpdateModal handleInput={handleInput} handleSubmit={handleSubmit2} isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData}  nomColonne="etat"/>
        </main>
    )
}

export default Etat_vehicule
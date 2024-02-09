import React, { useState, useEffect, useRef } from 'react';
import { DotLoader } from 'react-spinners';
import { post, handleChange, get, update, Delete } from '../axios_utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import Loader from '../loader/Loader';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateModal from '../component/UpdateModal';
import DeleteModal from '../component/DeleteModal';
import MyUrl from '../MyUrl';

function Nouveau_type() {
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [tableLoading, setTableLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const toast = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [deletemodalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse, categoriesResponse] = await Promise.all([
                    get(MyUrl+'Types'),
                    get(MyUrl+'Categories'),
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




    const showSuccessDelete = () => {
        toast.current.show({ severity: 'success', summary: 'Suppression réussie', detail: message, life: 3000 });
    };
    const showSuccessUpdate = () => {
        toast.current.show({ severity: 'success', summary: 'Modification réussie', detail: message, life: 3000 });
    };

    const handleSubmit3 = (e) => {
        e.preventDefault();
        console.log("selectedRowData.id azeea" + selectedRowData.id)
        const response = Delete(MyUrl+'Types/' + selectedRowData.id);
        if (response.error) {
            showErrorDelete()
        } else {
            showSuccessDelete(true)
            setDeleteModalOpen(false)
        }
    }

    const handleDelete = (rowData) => {
        setSelectedRowData(rowData);
        setDeleteModalOpen(true);
        console.log("Delete clicked for id:", rowData.id);
    };

    const closeModal = () => {
        setDeleteModalOpen(false);
        setModalOpen(false);
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        // setLoader(true);
        const response = update(formData, setFormData, MyUrl+'Types/' + selectedRowData.id);
        if (response.error) {
            // setLoader(false)
            setMessage(response.data.error);
            showError();

        } else {
            // setLoader(false)
            console.log(response.data);
            showSuccessUpdate();
            setModalOpen(false)
        }
        const typeResponse = get(MyUrl+'Types');
        // setData(typeResponse.data.data);
    }

    const updateBodyTemplate = (rowData) => {
        return (
            <>
                <button className="p-button p-button-success p-button-text" onClick={() => handleUpdate(rowData)} style={{ margin: '10px' }}>
                    <span className='boutonUpdate'> Modifier <FaRegEdit style={{ fontSize: '1.5rem', color: 'green' }} /></span>
                </button >
                <button className="p-button p-button-danger p-button-text " onClick={() => handleDelete(rowData)}>
                    <span className='boutonDelete'>Supprimer <FaRegTrashAlt style={{ fontSize: '1.5rem' }} /></span>
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
        const response = await post(formData, setFormData, MyUrl+'Types')
        if (response.data.error) {
            setLoader(false);
            setMessage(response.data.error)
            showError()
        } else {
            setLoader(false);
            setMessage(response.data.data[0].nom)
            showSuccess()
        }
        const typesResponse = await get(MyUrl+'Types');
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
                            {loader && <Loader />}
                            <button type="submit" className="button">
                                <span className="box">Enregistrer</span>
                            </button>
                        </form>
                    )}
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Types de voiture</h4>
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
                        <Column className='column' field="categorie" header="Categorie" style={{ minWidth: '14rem' }} sortable filter filterPlaceholder="recherche par categorie" />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />

                    </DataTable>
                </div>
            </div>
            <UpdateModal handleInput={handleInput} handleSubmit={handleSubmit2} isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData} nomColonne="nom" />
            <DeleteModal submitModal={handleSubmit3} isOpen={deletemodalOpen} handleClose={closeModal} rowData={selectedRowData} />
       
        </main>
    );
}

export default Nouveau_type;
// import './form.css';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Loader from '../loader/Loader';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '../axios_utils';
import { get, handleChange, post, update, Delete } from '../axios_utils';
import { Toast } from 'primereact/toast';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateModal from '../component/UpdateModal';
import DeleteModal from '../component/DeleteModal';
import MyUrl from '../MyUrl';
function Categorie() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(new FormData());
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const toast = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [deletemodalOpen, setDeleteModalOpen] = useState(false);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showSuccessDelete = () => {
        toast.current.show({ severity: 'success', summary: 'Suppression réussie', detail: message, life: 3000 });
    };
    const showSuccessUpdate = () => {
        toast.current.show({ severity: 'success', summary: 'Modification réussie', detail: message, life: 3000 });
    };
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
    
        try {
            const response = await post(formData, setFormData, MyUrl+'Categories');
    
            if (response.error) {
                setMessage(response.data.error);
                showError();
            } else {
                showSuccess();
            }
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            setLoader(false);
            const typeResponse = await get(MyUrl+'Categories');
            setData(typeResponse.data.data);
        }
    };
    
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setLoader(true);
    
        try {
            const response = await update(formData, setFormData, MyUrl+`Categories/${selectedRowData.id}`);
    
            if (response.error) {
                setMessage(response.data.error);
                showError();
            } else {
                showSuccessUpdate();
                setModalOpen(false);

            }
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setLoader(false);
            const typeResponse = await get(MyUrl+'Categories');
            setData(typeResponse.data.data);
        }
    };
    
    const handleSubmit3 = async (e) => {
        e.preventDefault();
        setLoader(true);
    
        try {
            await Delete(MyUrl+`Categories/${selectedRowData.id}`);
            showSuccessDelete();
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setLoader(false);
            
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await get(MyUrl+'Categories');
    
                if (response.data.error) {
                    console.error('Error fetching data:', response.data.error);
                } else {
                    setData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        const fetchDataWithDelay = setTimeout(fetchData, 1000);
    
        return () => clearTimeout(fetchDataWithDelay); // Cleanup function
    
    }, []);
    
    
    const handleDelete = (rowData) => {
        setSelectedRowData(rowData);
        setDeleteModalOpen(true);
        console.log("Delete clicked for id:", rowData.id);
      };

    const representativeBodyTemplate = (rowData) => {
        return rowData.nom;
    };




    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
        console.log(formData.values);
    }


    const updateBodyTemplate = (rowData) => {
        return (
            <>
            <>
                <button className="p-button p-button-success p-button-text" onClick={() => handleUpdate(rowData)} style={{ margin: '10px' }}>
                    <span  className='boutonUpdate'> Modifier <FaRegEdit style={{ fontSize: '1.5rem', color: 'green' }} /></span>
                </button >
                <button className="p-button p-button-danger p-button-text "  onClick={() => handleDelete(rowData)}>
                    <span className='boutonDelete'>Supprimer <FaRegTrashAlt style={{ fontSize: '1.5rem' }} /></span>
                </button>
            </>
            </>
        );
    };


    const handleUpdate = (rowData) => {
        setSelectedRowData(rowData);
        setModalOpen(true);
        console.log("Update clicked for id:", rowData.id);
    };
      const closeModal = () => {
        setDeleteModalOpen(false);  
        setModalOpen(false);
      };
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Categorie</h1>
                    <form onSubmit={handleSubmit} action="">
                        <div className="form__group field">
                            <input onChange={handleInput} name='categorie' type="input" className="form__field" placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">Nom Categorie</label>
                        </div>
                        {loader && <Loader />}
                        <button type='submit' className="button">
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Categories</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Donnees en attentes">
                        <Column className='column' field="nom" header="Nom" style={{ minWidth: '200px' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style nom" />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />
                    </DataTable>
                </div>
            </div>
            <UpdateModal handleInput={handleInput} handleSubmit={handleSubmit2} isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData}  nomColonne="categorie"/>
            <DeleteModal submitModal={handleSubmit3} isOpen={deletemodalOpen} handleClose={closeModal} rowData={selectedRowData}  />
        </main>
    )
}

export default Categorie
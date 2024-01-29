import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useRef, useEffect } from 'react';
import { get, handleChange, post, update, Delete } from '../axios_utils';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateModal from '../component/UpdateModal';
import DeleteModal from '../component/DeleteModal';

function Energie() {
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [deletemodalOpen, setDeleteModalOpen] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            //loading(false);
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Energies')
                .then(response => {
                    setData(response.data.data);
                    console.log(response.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    //setLoading(false);
                }));
        }, 1000);
    }, []);


    const showSuccessDelete = () => {
        toast.current.show({ severity: 'success', summary: 'Suppression réussie', detail: message, life: 3000 });
    };
    const showSuccessUpdate = () => {
        toast.current.show({ severity: 'success', summary: 'Modification réussie', detail: message, life: 3000 });
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        // setLoader(true);
        const response = update(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Energies/' + selectedRowData.id);
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
        const typeResponse = get('https://repr-izy-production.up.railway.app/api/v1/Energies');
        // setData(typeResponse.data.data);
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


    const handleSubmit3 = (e) => {
        e.preventDefault();
        console.log("selectedRowData.id azeea" + selectedRowData.id)
        Delete('https://repr-izy-production.up.railway.app/api/v1/Energies/' + selectedRowData.id);
        console.log("miditrqqq");
        showSuccessDelete(true)
        setDeleteModalOpen(false)
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
      
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
    }

    const representativeBodyTemplate = (rowData) => {
        return rowData.nom;
    };

    const handleUpdate = (rowData) => {
        setSelectedRowData(rowData);
        setModalOpen(true);
        console.log("Update clicked for id:", rowData.id);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const response = post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Energies');
        if (response.error) {
            setMessage(response.error);
            showError();
        } else {
            showSuccess();
        }
    };

    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Energie</h1>
                    <form onSubmit={handleSubmit} action="">
                        <div className="form__group field">
                            <input onChange={handleInput} name='energie' type="input" className="form__field" placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">Energie</label>
                        </div>
                        <button type='submit' className="button">
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Energie</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Data en attente">
                        <Column className='column' field="nom" header="Nom" style={{ minWidth: '200px' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style nom" />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />
                    </DataTable>
                </div>
            </div>
            <UpdateModal handleInput={handleInput} handleSubmit={handleSubmit2} isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData} nomColonne="energie" />
            <DeleteModal submitModal={handleSubmit3} isOpen={deletemodalOpen} handleClose={closeModal} rowData={selectedRowData} />
        </main>
    )
}

export default Energie
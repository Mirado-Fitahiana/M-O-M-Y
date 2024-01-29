import './form.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import Loader from '../loader/Loader';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useRef, useEffect } from 'react';
import { get, handleChange, post , update, Delete} from '../axios_utils';
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import UpdateModal from '../component/UpdateModal';
function Transmission() {
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [formData, setFormData] = useState(new FormData());
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Transmissions')
                .then(response => {
                    setData(response.data.data);
                    console.log(response.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                })
            );
        }, 1000);
    }, []);

    


    const handleSubmit2 = (e) => {
        e.preventDefault();
        // setLoader(true);
        const response = update(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Transmissions/'+selectedRowData.id);
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


    const representativeBodyTemplate = (rowData) => {
        return rowData.nom;
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
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        const response = post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Transmissions');
        if (response.error) {
            setLoader(false)
            setMessage(response.data.error);
            showError();
        } else {
            setLoader(false)
            showSuccess();
        }
        setFormData('');
        const maj = get('https://repr-izy-production.up.railway.app/api/v1/Transmissions');
        setData(maj.data.data);
    };

    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Transmission</h1>
                    <form onSubmit={handleSubmit} action="">

                        <div className="form__group field">
                            <input onChange={handleInput} name='transmission' type="input" className="form__field" placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">N. Transmission</label>
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
                    <h4 className="annonce-title" style={{}}>Transmission</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="small"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '30rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Pas de donnees">
                        <Column className='column' field="nom" header="Nom" style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterPlaceholder="recherche par style nom" />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />
                    </DataTable>
                </div>
            </div>
            <UpdateModal handleInput={handleInput}  handleSubmit={handleSubmit2}  isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData}  nomColonne="nom"/>
        </main>
    )
}

export default Transmission
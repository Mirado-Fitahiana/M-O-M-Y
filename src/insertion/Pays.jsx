import './form.css';
import { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { post, handleChange, get, update, Delete } from '../axios_utils';
import Loader from '../loader/Loader';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateModal from '../component/UpdateModal';
import DeleteModal from '../component/DeleteModal';
function Pays() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [file, setFile] = useState(null);
    const [base64URL, setBase64URL] = useState("");
    const [formData, setFormData] = useState(new FormData());
    const [loader, setLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [deletemodalOpen, setDeleteModalOpen] = useState(false);
    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };


    const showSuccessDelete = () => {
        toast.current.show({ severity: 'success', summary: 'Suppression réussie', detail: message, life: 3000 });
    };
    const showSuccessUpdate = () => {
        toast.current.show({ severity: 'success', summary: 'Modification réussie', detail: message, life: 3000 });
    };


    const handleSubmit3 = (e) => {
        e.preventDefault();
        console.log("selectedRowData.id azeea" + selectedRowData.id)
        const response = Delete('https://repr-izy-production.up.railway.app/api/v1/Pays/' + selectedRowData.id);
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
        const response = update(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Pays/'+selectedRowData.id);
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
        const typeResponse = get('https://repr-izy-production.up.railway.app/api/v1/Pays');
        // setData(typeResponse.data.data);
    }

    const updateBodyTemplate = (rowData) => {
        return (
            <>
                <button className="p-button p-button-success p-button-text" onClick={() => handleUpdate(rowData)} style={{ margin: '100px' }}>
                    <span  className='boutonUpdate'> Modifier <FaRegEdit style={{ fontSize: '1.5rem', color: 'green' }} /></span>
                </button >
                <button className="p-button p-button-danger p-button-text "  onClick={() => handleDelete(rowData)}>
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


    useEffect(() => {
        setTimeout(() => {
            // loading(true)
            setData(get('https://repr-izy-production.up.railway.app/api/v1/Pays')

                .then(response => {
                    setLoading(true);
                    setData(response.data.data);
                    console.log(response.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                })
            );

            setLoading(false);

        }, 1000);

    }, []);

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        getBase64(selectedFile)
            .then((result) => {
                selectedFile["base64"] = result;
                setFile(selectedFile);
                setBase64URL(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleInput = (e) => {
        handleChange(e, formData, setFormData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        console.log(base64URL);
        formData.append("drapeau", base64URL);
        const response = post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Pays');
        if (response.error) {
            setLoader(false)
            setMessage(response.error)
            showError()
        } else {
            setLoader(false)
            showSuccess()
        }
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Insertion réussie', detail: message, life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Insertion échouée', detail: message, life: 3000 });
    };

    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h1>Insertion Nouveau Pays</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form__group field">
                            <input name='pays' type="text" className="form__field" onChange={handleInput} placeholder="Name" required="" />
                            <label htmlFor="name" className="form__label">Nom Pays</label>
                        </div>
                        <br />
                        <div className="input-file">
                            <label className="custum-file-upload" htmlFor="file">
                                {file ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Selected File"
                                            style={{ maxWidth: '100%', maxHeight: '100%', marginTop: '49px' }}
                                        />
                                        <input type="file" id="file" onChange={handleFileInputChange} />
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="your_fill_color" viewBox="0 0 24 24">
                                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                            <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path>
                                            </g>
                                        </svg>
                                        <div className="text">
                                            <span>{file ? 'Change image' : 'Ajouter image drapeau'}</span>
                                        </div>
                                        <input name='pays' type="file" id="file" onChange={handleFileInputChange} />
                                    </>
                                )}
                            </label>
                        </div>
                        <br />
                        {loader && <Loader />}
                        <button className="button" type='submit'>
                            <span className="box">
                                Enregistrer
                            </span>
                        </button>
                    </form>
                    <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des pays</h4>
                    <DataTable className="custom-datatable" value={data[0]}
                        size="normal"
                        paginator rows={10}
                        dataKey="id"
                        loading={loading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['nom']}
                        emptyMessage="Donnees en attentes"
                        removableSort>
                        <Column field="nom" header="Pays" style={{ width: '200px' }} body={(rowData) => rowData.nom} filter filterPlaceholder="recherche par marque" />
                        <Column field="path" header="Drapeau" style={{ width: '200px' }} body={(rowData) => <img src={rowData.path} width="200px" height="200px" />} />
                        <Column style={{ minWidth: '14rem' }} body={updateBodyTemplate} className='updatedelete' />
                    </DataTable>
                </div>
            </div>

            <UpdateModal handleInput={handleInput} handleSubmit={handleSubmit2} isOpen={modalOpen} handleClose={closeModal} rowData={selectedRowData} nomColonne="nom" />
            <DeleteModal submitModal={handleSubmit3} isOpen={deletemodalOpen} handleClose={closeModal} rowData={selectedRowData} />
        </main>
    )
}

export default Pays
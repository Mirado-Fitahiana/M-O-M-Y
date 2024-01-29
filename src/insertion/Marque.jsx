import './form.css';
import { useState, useRef, useEffect } from 'react';
import { post, handleChange, get } from '../axios_utils';
import { DotLoader } from 'react-spinners';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Loader from '../loader/Loader';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css";
function Marque() {
    const [file, setFile] = useState(null);
    const [base64URL, setBase64URL] = useState("");
    const [formData, setFormData] = useState(new FormData());
    const [pays, setPays] = useState([]);
    const [marques, setMarques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    const toast = useRef(null);
    const [message, setMessage] = useState("");
    const [loader,setLoader] = useState(false);

    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYzNDczNjEsImV4cCI6MTcwNjQzMzc2MX0.8p8JZEFQFgPAs244qmBeV0Ro-rFyzuoc8amFMT2ChCk');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marqueResponse, paysResponse] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Marques'),
                    get('https://repr-izy-production.up.railway.app/api/v1/Pays'),
                ]);

                setMarques(marqueResponse.data.data[0]);
                setPays(paysResponse.data.data[0]);
                setIsLoading(false);
                setTableLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
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
        setLoader(true)
        formData.append("image", base64URL);
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        setTableLoading(true);
        const response = await post(formData, setFormData, 'https://repr-izy-production.up.railway.app/api/v1/Marques')
        if (response.data.error) {
            setLoader(false)
            setMessage(response.data.error)
            showError()
        }else{
            setLoader(false)
            setMessage(response.data.data[0].nom)
            showSuccess()
        }
        const typesResponse = await get('https://repr-izy-production.up.railway.app/api/v1/Marques');
        setMarques(typesResponse.data.data[0]);
        setTableLoading(false);
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
                    <h1>Insertion Marque</h1>
                    {isLoading ? <DotLoader color="#36d7b7" /> :
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form__group field">
                                <input name='marque' onChange={handleInput} type="input" className="form__field" placeholder="Name" required />
                                <label htmlFor="name" className="form__label">Nom Marque</label>
                            </div>
                            <div className="form__group field">
                                <label htmlFor="name" className="form__label">Pays</label>
                                <select onChange={handleInput} name="idpays" id="">
                                    <option value="">Pays</option>
                                    {pays.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nom}
                                        </option>
                                    ))}
                                </select>
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
                                                <span>{file ? 'Change image' : 'Choisir une image'}</span>
                                            </div>
                                            <input type="file" id="file" onChange={handleFileInputChange} />
                                        </>
                                    )}
                                </label>

                            </div>
                            <br />
                            {loader && <Loader />}
                            <button type='submit' className="button">
                                <span className="box">
                                    Enregistrer
                                </span>
                            </button>
                        </form>
                    }
                     <Toast ref={toast} />
                </div>
                <div className="input-card">
                    <h4 className="annonce-title" style={{}}>Liste des marques</h4>
                    <DataTable className="custom-datatable" showGridlines value={marques}
                        size="normal"
                        paginator rows={10}
                        dataKey="id"
                        loading={isLoading}
                        tableStyle={{ minWidth: '60rem', width: '200px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                        globalFilterFields={['Marques']}
                        emptyMessage="Donnees en attentes"
                        removableSort>
                        <Column field="nom" header="Marques" style={{ width: '100px' }} body={marques.nom} filter filterPlaceholder="recherche par marque" />
                        <Column field="path" header="Image" style={{ width: '100px' }} body={(rowData) =><img src={rowData.path} width="200px" height="200px"/>} />
                    </DataTable>
                </div>
            </div>
        </main>
    )
}

export default Marque
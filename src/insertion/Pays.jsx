import './form.css';
import { useState,useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
function Pays() {
    const [message,setMessage] = useState("");
    const toast = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader=new FileReader();
        reader.onloadend =() => {
            setSelectedFile(reader.result.toString());
            console.log(selectedFile);
        }
        reader.readAsDataURL(file);
    };

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'https://repr-izy-production.up.railway.app/api/v1/Pays';
        const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVVElMSVNBVEVVUjAwMDUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDYyMjA5MjgsImV4cCI6MTcwNjMwNzMyOH0.HYrURUHxyd1_uh9qY0hKrE53h6IUJHsEn9APCo7FI_w";
        try {
            const data = new FormData();
            data.append('pays', formData.pays);
            data.append('drapeau',selectedFile);
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
                    pays: '',
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
                    <h1>Insertion Nouveau Pays</h1>
                    <form action="" onSubmit={handleSubmit}>
                    <div className="form__group field">
                        <input name='pays' type="text" className="form__field" onChange={handleChange} placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Nom Pays</label>
                    </div>
                    <br />
                    <div className="input-file">
                        <label className="custum-file-upload" htmlFor="file">
                            {selectedFile ? (
                                <>
                                    <img
                                        src={selectedFile}
                                        alt="Selected File"
                                        style={{ maxWidth: '100%', maxHeight: '100%', marginTop: '49px' }}
                                    />
                                    <input type="file" id="file" onChange={handleFileChange} />
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
                                        <span>{selectedFile ? 'Change image' : 'Ajouter image drapeau'}</span>
                                    </div>
                                    <input name='pays' type="file" id="file" onChange={handleFileChange} />
                                </>
                            )}
                        </label>

                    </div>
                    <button className="button" type='submit'>
                        <span className="box">
                            Enregistrer
                        </span>
                    </button>
                    </form>
                    <Toast ref={toast} />
                </div>
            </div>
        </main>
    )
}

export default Pays
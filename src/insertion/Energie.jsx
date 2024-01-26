
import axios from 'axios';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useRef } from 'react';
function Energie() {
    const [message, setMessage] = useState("");
    const toast = useRef(null);

    const [formData, setFormData] = useState({
        energie: '',
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
        console.log(formData.energie);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'https://repr-izy-production.up.railway.app/api/v1/Energies';
        const token = localStorage.getItem('token');
        try {
            const data = new FormData();
            data.append('energie', formData.energie);
            data.append('authorization', token);
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
                    energie: '',
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
                    <form onSubmit={handleSubmit}>
                        <h1>Insertion Energie</h1> 
                        <div className="form__group field">
                            <input type="text"
                                name='energie'
                                value={formData.energie}
                                className="form__field"
                                placeholder="energies"
                                onChange={handleChange}
                                required />
                    <label htmlFor="name" className="form__label">Nom </label>
                </div>
                <button className="button">
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

export default Energie
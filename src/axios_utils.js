import axios from 'axios';
export function handleChange(e,formData,setFormData) {
    const { name, value } = e.target;
    if (formData.get(name)!="") {
        formData.set(name,value);
    } else {
        formData.append(name,value);
    }
    setFormData(formData);
}

export async function  post(formData,setFormData,url) {
    console.log("Posting....");
    const token ='Bearer '+localStorage.getItem('token');
        try {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'content-type':'multipart/form-data',
                    'authorization':token
                },
                data: formData
            };
            const response = await axios.request(config);
            setFormData(new FormData());
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à railway:', error);
        }
}

export async function get(url) {
    const token ='Bearer '+localStorage.getItem('token');
        try {
            let config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'content-type':'multipart/form-data',
                    'Authorization':token
                },
            };
            const response = await axios.request(config);
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à railway:', error);
        }
}
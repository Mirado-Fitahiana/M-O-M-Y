import { useState } from 'react';
import axios from 'axios';
import './login.css';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import MyUrl from '../MyUrl';

function Login() {
  const navigate = useNavigate();
 
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    mdp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const apiUrl = MyUrl+'auth/login';

    try {
      // const data = axios.toFormData(formData);
      const data = new FormData();
      data.append('username', formData.username); // Assuming username is the email
      data.append('mdp', formData.mdp);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data
      };

      const response = await axios.request(config);

      if (response.data.error) {
        // Check if there's an error in the response
        console.error('Erreur lors de la requête:', response.data.error);
        setError(response.data.error);
        setLoading(false);
      } else {
        console.log('Login successful:', response.data);
        localStorage.setItem('token',response.data.data[1].token);
        navigate("/Acceuil")
        setFormData({
          username: '',
          mdp: '',
        });

      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données à railway:', error);
    }
  }


  return (
    <div className="container">
      <section className="side">
        <img src='./test.png' alt="" />
      </section>
      

      <section className="main">
        <div className="login-container">
          <p className="title">Bienvenue</p>
          <div className="separator"></div>
          <p className="welcome-message">Back-office Repr'Izy</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                name="username"
                value={formData.username}
                className='input'
                placeholder="admin"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="mdp"
                value={formData.mdp}
                className='input'
                placeholder="1234"
                onChange={handleChange}
                required
              />
            </div>
            {loading && <Loader />}

            {error &&  <p style={{ color: 'red' }}>{error}</p>}
            <button className="submit button" type='submit'>Se connecter</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;

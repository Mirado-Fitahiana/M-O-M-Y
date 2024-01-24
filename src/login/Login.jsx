import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
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

    const apiUrl = 'https://repr-izy-production.up.railway.app/api/v1/auth/login';
    
    try {
      const data = axios.toFormData(formData);
      let config={
        method:'post',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers:{
          ...data.getHeaders()
        },
        data:data
      };
      axios.request(config).then((response)=>{
        console.log(response.data);
      })
      // Réinitialiser le formulaire après l'envoi des données
      setFormData({
        username: '',
        mdp: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données à railway:', error);
    }
  };
  
  



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
                placeholder="admin"
                onChange={handleChange}
                required
              />
            </div>

            <button className="submit button" type='submit'>Se connecter</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;

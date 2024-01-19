import { useState } from 'react'
import { Link } from 'react-router-dom'; 
// import Play from '../container/Play';
// import { Link } from 'react-router-dom';
import './login.css'

function Login() {
    const[mail,setMail] = useState('');
    const[pass,setPass] = useState('');
    const[redirection,setRedirection] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {mail,pass};
        try {
            const response = await fetch('http://localhost:8000/blog',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const responseData = await response.json();
            if (responseData.status === "ok") {
                setRedirection(true);
                console.log(responseData.status);
                // return <Redirect to='../container/Play' />;
            }
            console.log(responseData);
        } catch (error) {
            console.error('Erreur:', error);
        }

        
        // console.log(data);
    }
    if (redirection === true) {
       window.location = "/Acceuil";       
    }
  return (
    <div className="container">
    <section className="side">
        <img src='./test.png' alt=""/>
    </section>

    <section className="main">
        <div className="login-container">
            <p className="title">Tongasoa</p>
            <div className="separator"></div>
            <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <input type="email" value={mail} className='input' placeholder="Username" onChange={(e) => setMail(e.target.value)} required/>

                </div>
                <div className="form-control">
                    <input type="password" value={pass}  className='input' placeholder="Password" onChange={(e)=>setPass(e.target.value)} required/>
                   
                </div>


                <button className="submit button" type='button'><Link to='/Acceuil'>Login</Link></button>

            </form>
        </div>
    </section>
    </div>
  )
}

export default Login
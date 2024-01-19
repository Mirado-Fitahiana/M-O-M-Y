// import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect } from 'react';
// import './insertion/form.css'
function Liste_client() {
  const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dummyData = [
      { id: 1,  utilisateur: 'Jean', anonnce: '4', reussi: '7'},
      { id: 2,  utilisateur: 'Mirado', anonnce: '3', reussi: '4'},
      { id: 3,  utilisateur: 'Feno', anonnce: '2', reussi: '7'},
      { id: 4,  utilisateur: 'Rado', anonnce: '0', reussi: '4'},
      { id: 5,  utilisateur: 'Sandra', anonnce: '5', reussi: '7'},
      { id: 6,  utilisateur: 'Tiana', anonnce: '4', reussi: '4'},
      { id: 7,  utilisateur: 'Rija', anonnce: '3', reussi: '7'},
      { id: 8,  utilisateur: 'Lanto', anonnce: '0', reussi: '4'},
      { id: 9,  utilisateur: 'Tina', anonnce: '2', reussi: '7'},
      { id: 10,  utilisateur: 'Rakoto', anonnce: '5', reussi: '4'},
      { id: 11,  utilisateur: 'Lova', anonnce: '4', reussi: '7'},
      { id: 12,  utilisateur: 'Mamisoa', anonnce: '3', reussi: '4'},
      { id: 13,  utilisateur: 'Haja', anonnce: '0', reussi: '7'},
      { id: 14,  utilisateur: 'Nirina', anonnce: '2', reussi: '4'},
      { id: 15,  utilisateur: 'Mialy', anonnce: '5', reussi: '7'},
      { id: 16,  utilisateur: 'Tahina', anonnce: '4', reussi: '4'},
      { id: 17,  utilisateur: 'Rasoa', anonnce: '3', reussi: '7'},
      { id: 18,  utilisateur: 'Fidisoa', anonnce: '0', reussi: '4'},
      { id: 19,  utilisateur: 'Mandresy', anonnce: '2', reussi: '7'},
      { id: 20,  utilisateur: 'Mamy', anonnce: '5', reussi: '4'},
  ];

  useEffect(() => {
      // Simulating an asynchronous data fetch
      setLoading(true);
      setTimeout(() => {
          setCustomers(dummyData);
          setLoading(false);
      }, 1000); // Simulating a 1-second delay
  }, []);

  const nom = (rowData) =>{
    return rowData.utilisateur;
  }
  const annonce = (rowData) => {
    return rowData.annonce;
  }
  const reussi = (rowData) => {
    return rowData.reussi;
  }

  return (
    <main className='main-container'>
            <div className="second-container">
                <h4>Liste Client</h4>
                <div className="input-card">
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Nom Categorie</label>
                    </div>

                    <button className="button">
                        <span className="box">
                            Enregistrer
                        </span>
                    </button>
                </div>
            </div>
        </main>
  )
}

export default Liste_client
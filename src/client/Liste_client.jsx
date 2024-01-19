import React from 'react'
// import './insertion/form.css'
function Liste_client() {
  return (
    <main className='main-container'>
            <div className="second-container">
                <h4>Liste Users</h4>
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
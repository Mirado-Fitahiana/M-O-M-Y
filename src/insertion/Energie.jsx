import React from 'react'

function Energie() {
    return (
    <main className='main-container'>
        <div className="second-container">
            <div className="input-card">
            <h1>Insertion Energie</h1>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Name" required="" />
                    <label htmlFor="name" className="form__label">Nom </label>
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

export default Energie
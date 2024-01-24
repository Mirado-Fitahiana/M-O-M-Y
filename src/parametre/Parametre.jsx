import React from 'react'

function Parametre() {
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                <h4>Parametrage de la commission</h4>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Prix Minimal" required="" />
                        <label htmlFor="name" className="form__label">Prix Minimal</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Prix maximal" required="" />
                        <label htmlFor="name" className="form__label">Prix Maximal</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="% de la commision" required="" />
                        <label htmlFor="name" className="form__label">% de la commision</label>
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

export default Parametre
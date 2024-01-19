import React from 'react'
import './form.css'
function Categrie_marque() {
    return (
        <main className='main-container'>
            <div className="second-container">
                <h4>Categorie de la marque</h4>
                <div className="input-card">

                    <div className="form__group field">
                        <label htmlFor="name" className="form__label">Marque</label>
                        <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>

                    <div className="checkbox-input">
                        <div className="radio-button-container">
                            <div className="radio-button">
                                <input type="radio" className="radio-button__input" id="radio1" name="radio-group"/>
                                    <label className="radio-button__label" htmlFor="radio1">
                                        <span className="radio-button__custom"></span>
                                        React
                                    </label>
                            </div>
                            <div className="radio-button">
                                <input type="radio" className="radio-button__input" id="radio2" name="radio-group"/>
                                    <label className="radio-button__label" htmlFor="radio2">
                                        <span className="radio-button__custom"></span>
                                        Angular
                                    </label>
                            </div>
                            <div className="radio-button">
                                <input type="radio" className="radio-button__input" id="radio3" name="radio-group"/>
                                    <label className="radio-button__label" htmlFor="radio3">
                                        <span className="radio-button__custom"></span>
                                        Vue
                                    </label>
                            </div>
                        </div>
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

export default Categrie_marque
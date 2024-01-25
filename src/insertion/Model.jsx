import './form.css'
function Model() {
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                <h1>Insertion nouveau modele</h1>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Nom</label>
                    </div>
                    <div className="form__group field">

                        <label htmlFor="name" className="form__label">Marque</label>
                        <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
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

export default Model
// import './form.css';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
function Categorie() {
    // const [sideBarOpen,setSideBarOpen] = useState(false);
    return (
        <main className='main-container'>
            <div className="second-container">
                <h4>Insertion Categorie</h4>
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

export default Categorie
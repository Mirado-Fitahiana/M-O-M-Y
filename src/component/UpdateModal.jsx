import React from 'react';
import './modal.css';
import '../insertion/form.css';
import { IoCloseCircleOutline } from "react-icons/io5";



function UpdateModal({handleSubmit, handleInput, handleClose, isOpen, rowData, nomColonne }) {
    console.log('UpdateModal - isOpen:', isOpen);
    if (!isOpen) {
        return null;
    }
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <div className="modal-content"><button type='submit' className="button" onClick={handleClose} style={{ marginLeft: '155px' }}>
                    <IoCloseCircleOutline />
                </button>
                    <h2>Modification</h2>
                    <br />
                    <input onChange={handleInput} name={nomColonne} type="input" defaultValue={rowData.nom} className="form__field" required="" />
                    <br />
                    {/* Add other fields you want to update */}
                    <button type='submit' className="button">
                        <span className="box">
                            Enregistrer
                        </span>
                    </button>

                </div>
            </form>
        </div>
    );
};
export default UpdateModal;
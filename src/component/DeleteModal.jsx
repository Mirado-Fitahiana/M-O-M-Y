import React from 'react';
import './modal.css';
import '../insertion/form.css';
import { IoCloseCircleOutline } from "react-icons/io5";



function DeleteModal({handleClose, isOpen, rowData, submitModal }) {
    console.log('DeleteModal - isOpen:', isOpen);
    if (!isOpen) {
        return null;
    }
    return (
        <div className="modal">
            <form onSubmit={submitModal}>
                <div className="modal-content"><button type='button' className="button" onClick={handleClose} style={{ float: 'left', color: 'red' }}>
                    <IoCloseCircleOutline />
                </button>
                    <h3>Voulez vous vraiment supprimer: </h3>
                    <h2 style={{alignItems: 'center'}}>{rowData.nom}</h2>
                    <br />
                    <button type='submit' className="button" onClick={submitModal}>
                        <span className="box">
                            Oui
                        </span>
                    </button>
                    <button type='button' className="button" onClick={handleClose}>
                        <span className="box">
                            Non
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default DeleteModal;
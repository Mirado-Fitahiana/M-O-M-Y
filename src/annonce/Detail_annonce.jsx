import { useState, useEffect, useRef } from 'react';
import { Slide } from 'react-slideshow-image'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import './details.css'
import { Image } from 'primereact/image';
import { get, put } from '../axios_utils';
import { useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import BeatLoader from 'react-spinners';
import { Toast } from 'primereact/toast';
function Detail_annonce() {
    const [donnee, setData] = useState([]);
    const [temp, setTemp] = useState([]);
    const { id_annonce } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loader,setLoader] = useState(false);
    const toast = useRef();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detail] = await Promise.all([
                    get('https://repr-izy-production.up.railway.app/api/v1/Annonces/' + id_annonce),
                ]);
                setData(detail.data.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    const validate=async () =>{
        setLoader(true);
        put('https://repr-izy-production.up.railway.app/api/v1/Annonces/validate/' + donnee.id);
    }
    return (
        <main className='main-container'>
            <div className="second-container">
                {isLoading ? <DotLoader color="#36d7b7" /> :
                    <div className="input-card car_card">
                        <div className="prop">
                            <div className="name">
                                <h2>{donnee.libelle}</h2>
                                <div className="caract">
                                    <span className='desc'>{donnee.type && donnee.cat ? donnee.type.nom+" "+donnee.cat.nom : "Inconnu"}</span>
                                </div>
                            </div>
                            <div className="price"><h2>{donnee.prix}Ar</h2></div>
                        </div>
                        <div className="bottom">
                            <div className="slider">
                                <Fade>
                                    {donnee.images.map((image, index) => (
                                        <div className="each-slide" key={index}>
                                            <div>
                                                <Image className='sary' src={image} alt={`Image ${index + 1}`} preview height='200px' width="200px" />
                                            </div>
                                        </div>
                                    ))}
                                </Fade>
                                <div className="infouser">
                                <p className='dateenvoi'><strong><i>{donnee.date ? new Date(donnee.date).toUTCString() : "Inconnu"}</i></strong></p>
                                    <p className='descri'>{donnee.description}</p>
                                    <p className="author">
                                        <strong>{donnee.user.prenom+" "+donnee.user.nom}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="third-container">
                                <div className="carte ambony">
                                    <span className="titre"><p className='key'>Marque</p><p className='value'>{donnee.marque?donnee.marque.nom:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Gamme</p><p className='value'>{donnee.modele?donnee.modele.nom:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Type</p><p className='value'>{donnee.type?donnee.type.nom:"Inconnu"}</p></span>
                                </div>
                                <div className="carte ambany">
                                    <span className="titre"><p className='key'>Place</p><p className='value'>{donnee.place>0?donnee.place:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Annee</p><p className='value'>{donnee.annee>1900?donnee.annee:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Kilometrique</p><p className='value'>{donnee.kilometrique}km</p></span>
                                    <span className="titre"><p className='key'>Transmission</p><p className='value'>{donnee.transmission?donnee.transmission.nom:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Energie</p><p className='value'>{donnee.energie?donnee.energie.nom:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Cylindree</p><p className='value'>{donnee.cylindre>0?donnee.cylindre:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Puissance</p><p className='value'>{donnee.puissance>0?donnee.puissance+"ch":"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Nbr Cylindre</p><p className='value'>{donnee.nbrCylindre>0?donnee.nbrCylindre:"Inconnu"}</p></span>
                                    <span className="titre"><p className='key'>Motricite</p><p className='value'>{donnee.moticite>0?donnee.moticite+"roues":"Inconnu"}</p></span>
                                </div>
                                <div className="carte action">
                                    <button className='suppr' type='button'>X</button>
                                    {donnee.etatAnnonce == 0 ? <button className='valider' onClick={validate} type='button'>Valider</button> : <button className='valider' type='button' disabled>Valide</button> } 
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}

export default Detail_annonce
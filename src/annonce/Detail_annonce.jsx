import React from 'react'
import { Slide } from 'react-slideshow-image'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import './details.css'
import { Image } from 'primereact/image';

function Detail_annonce() {
    const images = [
        "fiara.jpg",
        "fiara2.jpg",
        "fiara.jpg",
    ];
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card car_card">
                    <div className="prop">
                        <div className="name">
                            <h2>Porsche Cayenne</h2>
                            <div className="caract">
                                <span className='desc'>SUV de luxe</span>
                            </div>
                        </div>
                        <div className="price"><h2>90000000Ar</h2></div>
                    </div>
                    <div className="bottom">
                        <div className="slider">
                            <Fade>
                                <div className="each-slide">
                                    <div>
                                        <Image className='sary' src={images[0]} alt="Image" preview height='100%' width="100%"></Image>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div>
                                        <Image className='sary' src={images[1]} alt="Image" preview height='100%' width="100%"></Image>
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div>
                                        <Image className='sary' src={images[0]} alt="Image" preview height='100%' width="100%"></Image>
                                    </div>
                                </div>
                            </Fade>
                            <div className="infouser">

                                <p className='dateenvoi'><strong><i>22/10/2023</i></strong></p>
                                <p className='descri'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                                    Ipsa culpa corporis ex repudiandae soluta aperiam architecto! 
                                    Soluta quas officiis ipsa labore ex consectetur? Quas eveniet, ipsa,
                                    velit laborum repellat ex accusamus non alias accusantium soluta, 
                                    doloremque animi maxime. Culpa dignissimos iusto, libero, dolores exercitationem totam quo, 
                                    maxime quidem quasi iure quas porro accusantium quaerat ipsa. Architecto repellendus,
                                    rerum velit blanditiis aperiam cumque perspiciatis quis repellat voluptate culpa beatae quam doloremque.
                                </p>
                                <p className="author">
                                    <strong>Yohan Rabe</strong>
                                </p>

                            </div>
                        </div>
                        <div className="third-container">
                            <div className="carte ambony">
                                <span className="titre"><p className='key'>Marque</p><p className='value'>Porsche</p></span>
                                <span className="titre"><p className='key'>Gamme</p><p className='value'>Cayenne</p></span>
                                <span className="titre"><p className='key'>Type</p><p className='value'>SUV de luxe</p></span>
                            </div>
                            <div className="carte ambany">
                                <span className="titre"><p className='key'>Place</p><p className='value'>5</p></span>
                                <span className="titre"><p className='key'>Annee</p><p className='value'>2018</p></span>
                                <span className="titre"><p className='key'>Kilometrique</p><p className='value'>360km</p></span>
                                <span className="titre"><p className='key'>Transmission</p><p className='value'>Manuelle</p></span>
                                <span className="titre"><p className='key'>Energie</p><p className='value'>Essence</p></span>
                                <span className="titre"><p className='key'>Cylindree</p><p className='value'>2000</p></span>
                                <span className="titre"><p className='key'>Puissance</p><p className='value'>220ch</p></span>
                                <span className="titre"><p className='key'>Nbr Cylindre</p><p className='value'>12</p></span>
                                <span className="titre"><p className='key'>Motricite</p><p className='value'>4 roues</p></span>
                            </div>
                           <div className="carte action">

                                <button className='suppr' type='button'>X</button>
                                <button className='valider' type='button'>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Detail_annonce
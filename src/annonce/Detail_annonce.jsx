import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'


function Detail_annonce() {
    const images = [
        "fiara.jpg",
        "fiara.jpg",
        "fiara.jpg",
    ];
    return (
        <main className='main-container'>
            <div className="second-container">
                <div className="input-card">
                    <h4>Detail Annonce</h4>
                    <div className="slider">
                        <Slide>
                            <div className="each-slide-effect">
                                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                                </div>
                            </div>
                            <div className="each-slide-effect">
                                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                                </div>
                            </div>
                            <div className="each-slide-effect">
                                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                                </div>
                            </div>
                        </Slide>
                        </div>
                    <div className="third-container">
                       

                        <div className="left">
                            <p className='titre-descri'>Marque: <span className='text-descri'>Mercedes</span> </p>
                            <p className='titre-descri'>Gamme: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Type: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Place: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Annee: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Kilometrique: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Description: <span className='text-descri'>Mercedes</span></p>
                            <p className='titre-descri'>Prix: <span className='text-descri'>Mercedes</span></p>
                        </div>
                        <div className="right">
                            <p className='titre-descri'>Transmission: <span className='text-descri'></span>  </p>
                            <p className='titre-descri'>Energie: <span className='text-descri'></span>  </p>
                            <p className='titre-descri'>Cylindree: <span className='text-descri'></span>  </p>
                            <p className='titre-descri'>Puissance: <span className='text-descri'></span>  </p>
                            <p className='titre-descri'>Nombre Cylindre: <span className='text-descri'></span>  </p>
                            <p className='titre-descri'>Motricite: <span className='text-descri'></span>  </p>
                        </div>
                    </div>
                    <button className="button">
                        <span className="box">
                            Enregistrer
                        </span>
                    </button>
                    <br />
                    <br />
                </div>
            </div>
        </main>
    )
}

export default Detail_annonce
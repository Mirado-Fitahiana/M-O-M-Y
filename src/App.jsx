import { useState } from 'react'

import Play from './container/Play';
import { Routes, Route } from 'react-router-dom';
import Categories from './insertion/Categorie';
import Login from './login/Login';
import Home from './container/Home';
import Nouveau_type from './insertion/Nouveau_type';
import Transmission from './insertion/Transmission';
import Marque from './insertion/Marque';
import Model from './insertion/Model';
import Categrie_marque from './insertion/Categrie_marque';
import Pays from './insertion/Pays';
import Energie from './insertion/Energie';
import Etat_vehicule from './insertion/Etat_vehicule';
import Annonce from './annonce/Annonce';
import Detail_annonce from './annonce/Detail_annonce';
import Liste_client from './client/Liste_client';
import Detail_Client from './client/Detail_Client';
import Vente from './vente/Vente';
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Acceuil' element={<><Play Component={<Home/>}/></>}/>
      <Route path='/Categorie' element={<><Play Component={<Categories/>}/></>}/>
      <Route path='/Type' element={<><Play Component={<Nouveau_type/>}/></>}/>
      <Route path='/Transmission' element={<><Play Component={<Transmission/>}/></>}/>
      <Route path='/Marque' element={<><Play Component={<Marque/>}/></>}/>
      <Route path='/Model' element={<><Play Component={<Model/>}/></>}/>
      <Route path='/Categorie_marque' element={<><Play Component={<Categrie_marque/>}/></>}/>
      <Route path='/Pays' element={<><Play Component={<Pays/>}/></>}/>
      <Route path='/Energie' element={<><Play Component={<Energie/>}/></>}/>
      <Route path='/Etat_vehicule' element={<><Play Component={<Etat_vehicule/>}/></>}/>
      <Route path='/Annonce' element={<><Play Component={<Annonce/>}/></>}/>
      <Route path='/Detail_annonce/:id_annonce' element={<><Play Component={<Detail_annonce/>}/></>}/>
      <Route path='/Client' element={<><Play Component={<Liste_client/>}/></>}/>
      <Route path='/Detail_client' element={<><Play Component={<Detail_Client/>}/></>}/>
      <Route path='/Vente' element={<><Play Component={<Vente/>}/></>}/>
    
    </Routes>
    </>
  )
}

export default App

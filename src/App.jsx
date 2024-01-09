import { useState } from 'react'
import './App.css'
import Header from './Header';
import SideBar  from './SideBar';
import Home from './Home';

function App() {
  

  return (
    <div className='grid-container'>
      <Header />
      <SideBar />
      <Home />
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Header from './Header';
import SideBar  from './SideBar';
import Home from './Home';

function App() {
  const [sideBarOpen,setSideBarOpen] = useState(false);

  return (
    <div className='grid-container'>
      <Header setSideBarOpen={setSideBarOpen} />
      <SideBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen}/>
      <Home />
    </div>
  )
}

export default App

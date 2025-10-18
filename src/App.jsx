import { useState } from 'react'

import './App.css'
import Header from "./components/Header"
import MainContainer from './components/MainContainer'

function App() {


  return (
    <div className='flex flex-col'>
    <Header />
    <MainContainer />

    </div>
  )
}

export default App

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import React from 'react'
import EpisodeDetails from './pages/EpisodeDetails'

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorite-episodes' element={<Favorites />} />
          <Route path='/details/:id' element={<EpisodeDetails />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App

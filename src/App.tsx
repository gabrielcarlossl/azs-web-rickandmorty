import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import React from 'react'
import EpisodeDetails from './pages/EpisodeDetails'
import { Box } from '@mui/material'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Box pt='82px'>
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/' element={<Home />} />
            <Route path='/favorite-episodes' element={<Favorites />} />
            <Route path='/details/:id' element={<EpisodeDetails />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App

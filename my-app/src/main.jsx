import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar  } from '/public/Navbar.jsx';
import { About } from '/public/About';
import { TripEvent } from '/public/trip_event'; 
import { Search } from '/public/search';
import { ThemeProvider } from '/public/themeprovider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <Navbar/>

        <Routes>
          <Route path="/" element={ <App /> } />
          <Route path="trip_event" element={<TripEvent />} />
          <Route path="about" element={<About />} />
          <Route path="search" element={<Search />} />

        </Routes>
      
        </BrowserRouter>
        </ThemeProvider>
  </StrictMode>,
)

 import React, { useState } from 'react';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import { Navbar } from '../public/Navbar';
 import { Home } from '../public/Home';
import { About } from '../public/about';
import { TripEvent } from '../public/trip_event'; 
import { Search } from '../public/search';

const App = () => {
  return (
      <div>
        <Home/>
      </div>
  );
};

export default App;

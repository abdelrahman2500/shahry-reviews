
import './App.scss';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context/ContextApi';
import Navbar from './components/navbar/Navbar';
import AllReviews from './components/all-reviews/AllReviews';

function App() {
  
  return (
    <div className="App text-capitalize ">
      <Navbar />
      <AllReviews />
    </div>
  );
}

export default App;

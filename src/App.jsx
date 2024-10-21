import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import ImgGenerator from './ImgGenerator';
import './App.css'; 
import Welcome from './Welcome';

function App() {
  return (
    <Router>
      <div className="app">
        

        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path='/imggenerator' element={<ImgGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

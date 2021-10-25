import React from 'react';
import './App.css';
import cryptoDemo from './components/cryptoDemo';
import { Route } from 'react-router';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Diablo Trading App</header>
      <Route path='/' component={cryptoDemo} />
    </div>
  );
}

export default App;

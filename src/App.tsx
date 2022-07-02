import React from 'react';
import './App.css';
import cryptoDashboard from './binance-module/components/crypto-dashboard';
import { Route } from 'react-router';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Diablo Trading App</header>
      <Route path='/' component={cryptoDashboard} />
    </div>
  );
}

export default App;

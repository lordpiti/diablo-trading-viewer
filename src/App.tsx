import './App.css';
import { CryptoDashboard } from './binance-module/components/crypto-dashboard';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>Diablo Trading App</header>
      <Routes>
        <Route path='/' element={<CryptoDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

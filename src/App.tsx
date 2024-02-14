import './App.css';
import { CryptoDashboard } from './binance-module/components/crypto-dashboard';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>Diablo Trading App</header>
      <CryptoDashboard />
    </div>
  );
}

export default App;

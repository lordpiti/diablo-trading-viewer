import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CryptoDashboard } from "@/components/crypto-dashboard";
import "@/App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Diablo Trading App</header>
      <QueryClientProvider client={queryClient}>
        <CryptoDashboard />
      </QueryClientProvider>
    </div>
  );
};

export default App;

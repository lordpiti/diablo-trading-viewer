import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// Needed to start the app on localhost in the url on nodejs older than 17, otherwise it will start on 127.0.0.1
// import dns from 'dns';
// https://vitejs.dev/config/server-options.html#server-host
// dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    open: true,
    port: 3000,
  }
});

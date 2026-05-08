import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import { App } from './App.js';
import { RelayEnvironment } from './RelayEnvironment.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<p>Loading…</p>}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>,
);

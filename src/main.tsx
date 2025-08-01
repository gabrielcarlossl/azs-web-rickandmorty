import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/configureStore.ts'
import { PersistGate } from 'redux-persist/integration/react'
import ScrollToTopButton from './components/button/ScrollToTopButton.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ScrollToTopButton />
      </PersistGate>
    </Provider>
  </StrictMode>,
)

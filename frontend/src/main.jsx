import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Stripe public test key
const stripePromise = loadStripe('pk_test_51RaFSdQXeq3v4A6JCEZvI9TTWhSyTMNExwXr9qgUv8QVqTT1gbNjWwYr9DPjRbP3XqaSracIC91Nis1o5FBDj0uM00qmbPthuY')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </StrictMode>
)

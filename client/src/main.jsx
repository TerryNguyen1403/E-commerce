import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductContextProvider from './Context/ProductContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'

import "bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById('root')).render(
  <ProductContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </ProductContextProvider>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import components
import NavbarWrapper from './Components/NavbarComponent/NavbarWrapper'
import Footer from './Components/Footer'

// Import pages
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Product from './Pages/Product'
import DisplayProduct from './Pages/DisplayProduct'
import ScrollToTop from './Components/ScrollToTop'
import CartDetail from './Pages/CartDetail'

function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

        {/* Product routes */}
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />}/>
        </Route>
        <Route path='/new-products' element={<DisplayProduct endpoint='new-products'/>}/>
        <Route path='/hot-products' element={<DisplayProduct endpoint='hot-products'/>}/>
        <Route path='/windows' element={<DisplayProduct endpoint='windows'/>}/>
        <Route path='/playstation' element={<DisplayProduct endpoint='playstation'/>}/>
        <Route path='/nintendo' element={<DisplayProduct endpoint='nintendo'/>}/>
        <Route path='/cart' element={<CartDetail />}/>
      </Routes>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Admin from '../pages/admin/Admin'
import Basket from '../pages/basket/Basket'
import Not from '../pages/not/Not'
import ProductDetails from '../pages/details/ProductDetails'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Not />} />
                <Route path="/details/:id" element={<ProductDetails/>} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/basket' element={<Basket />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router

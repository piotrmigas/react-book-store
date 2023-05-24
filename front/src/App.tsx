import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './pages/Book';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='book/:bookId' element={<Book />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';


const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const FullPizza = lazy(() => import('./pages/FullPizza'));


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={<div>Завантаження...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Завантаження...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Завантаження...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

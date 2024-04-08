import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Recipes } from './recipes/recipes';
import { Reviews } from './reviews/reviews';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark'>
            <div className='navbar-brand'>
              ProNutriLog<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>Login</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='recipes'>Recipes</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='reviews'>Reviews</NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='bg-dark text-white-50'>
          <div className='container-fluid'>
            <span className='text-reset'>Carter Gividen</span>
            <a className='text-reset' href='https://github.com/CarterG2099/startup'>
              Source
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
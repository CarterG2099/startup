import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Recipes } from './recipes/recipes';
import { Reviews } from './reviews/reviews';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/js/dist/modal';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const http = require('http');
  const { peerProxy } = require('../service/peerProxy.js');

  // Create an HTTP server
  const server = http.createServer((req, res) => {
    // Your HTTP request handling logic here
    res.end('Hello World!');
  });

  // Set up the WebSocket server using the HTTP server
  peerProxy(server);

  // Start listening on a port
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

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
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='recipes'>Recipes</NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='reviews'>Reviews</NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route 
            path='/' 
            element={
              <Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            } 
            exact 
          />
          <Route path='/recipes' element={<Recipes userName={userName}/>} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='reveiws.html' element={<Reviews />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='bg-dark text-white-50'>
          <div className='container-fluid'>
            <span className='text-reset'>Carter Gividen</span>
            <a className='text-reset' href='https://github.com/CarterG2099/startup'>
              GitHub
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

export default App;
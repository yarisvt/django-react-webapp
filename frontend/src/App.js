import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { IsMobileProvider } from './context/IsMobileContext';
import Home from './pages/home/Home';
import Games from './pages/games/Games';
import Game from './pages/game/Game';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <IsMobileProvider>
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/games' element={<Games gameType='moreorless' />} />
            <Route
              path='/more-or-less'
              element={<Games gameType='moreorless' />}
            />
            <Route path='/quiz' element={<Games gameType='quiz' />} />
            <Route path='/games/:id' element={<Game />} />
            <Route
              path='*'
              element={
                <div style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </div>
              }
            />
          </Routes>
        </IsMobileProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

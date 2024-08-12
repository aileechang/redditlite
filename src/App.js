import React from 'react';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <aside className='subreddits'>
            <Subreddits />
        </aside>
        <div className='posts'>
            <Home />
        </div>
      </main>
    </div>
  );
}

export default App;
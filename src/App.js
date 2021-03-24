import { React } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header.js';
import Home from './pages/Home.js';

function App() {
    return (
        <>
            <Header />

            <Route path="/" component={Home} />
        </>
    );
}

export default App;

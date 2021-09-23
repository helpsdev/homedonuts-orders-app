import React, { useState } from 'react';
import AvailableDonutsState from './AvailableDonutsState';
import Orders from './Orders';
import Home from './Home';


const App = () => {
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <AvailableDonutsState>
      { isHomePage ? <Home toggleView={setIsHomePage} /> : <Orders toggleView={setIsHomePage} /> }
    </AvailableDonutsState>
  );
}

export default App;
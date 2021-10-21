import React from 'react';
import { NativeRouter, Route } from "react-router-native";
import AvailableDonutsState from './AvailableDonutsState';
import Orders from './Orders';
import Home from './Home';


const App = () => {
  return (
    <NativeRouter>
      <AvailableDonutsState>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </AvailableDonutsState>
    </NativeRouter>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/Store';
import './App.css';
import CRUD from './components/Crud';
import Recipes from './components/Recipes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <CRUD/>
          <Recipes/>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;

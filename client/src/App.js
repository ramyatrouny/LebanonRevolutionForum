import React from 'react';
import './App.css';
import Navbar from './Layouts/Navbar/Navbar';
import AddForm from './Layouts/AddForm/AddForm';
import Posts from './Layouts/Posts/Posts';
import Footer from './Layouts/Footer/Footer';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <div className="mainContainer">
        <Navbar />
        <AddForm />
        <Posts />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;

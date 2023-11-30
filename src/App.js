import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



function App() {
  
  const professorNames = {}



  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default App;

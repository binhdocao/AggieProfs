import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SearchBar() {
  // note: the id field is mandatory
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/professors')
      .then(response => response.json())
      .then(data => setItems(data.map((prof, index) => ({
        ...prof, 
        id: prof._id, // Use MongoDB's _id as the id
        name: prof.name 
      }))))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);
  
  

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    // if (results.length > 0) {
    //   navigate(`/professors/${results[0].id}`);
    // }
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    navigate(`/professors/${item.id}`); 
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>Professor: {item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar-container">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            placeholder="Find a professor..."
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar
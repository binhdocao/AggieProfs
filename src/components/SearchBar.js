import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useEffect, useState } from 'react';
import '../App.css';

function SearchBar() {
  // note: the id field is mandatory
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/professors')
      .then(response => response.json())
      .then(data => setItems(data.map((prof, index) => ({ ...prof, id: index }))))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
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
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar
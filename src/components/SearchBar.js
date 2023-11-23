import React from 'react';

function SearchBar() {
  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <input type="text" placeholder="Search for professors..." style={{ padding: '10px', borderRadius: '5px', width: '300px', border: '2px solid #500000' }} />
      <button style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#700000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

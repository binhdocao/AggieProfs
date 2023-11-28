import React from 'react';
import Papa from 'papaparse';

function SearchBar() {
  // Search for a direct line like for query: Daniel Swei = https://directory.tamu.edu/?branch=people&cn=daniel+swei
  const handleSearch = () => {
    const query_name = document.getElementById('professorSearch').value;
    const url = `https://directory.tamu.edu/?branch=people&cn=${encodeURIComponent(query_name)}`;
    window.location.href = url;
  };
  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <input type="text" placeholder="Search for professors..." id="professorSearch" style={{ padding: '10px', borderRadius: '5px', width: '300px', border: '2px solid #500000' }} />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#700000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;

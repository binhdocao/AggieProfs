import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function SearchBar() {


  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProfessors = async () => {
        try {
            const response = await axios.get(`/api/professors`);
            return response.data;
        } catch (error) {
            console.error('Error fetching professors:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`/api/courses`);
            return response.data;
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const loadData = async () => {
      try {
          const professorsPromise = fetchProfessors();
          const coursesPromise = fetchCourses();
  
          const [professorsData, coursesData] = await Promise.all([professorsPromise, coursesPromise]);
  
          // Check if data is available before mapping
          const formattedProfessors = professorsData ? professorsData.map(prof => ({
              ...prof,
              name: prof.name,
              type: 'professor'
          })) : [];
  
          const formattedCourses = coursesData ? coursesData.map(course => ({
              ...course,
              name: course.Course,
              type: 'course'
          })) : [];
  
          setItems([...formattedProfessors, ...formattedCourses]);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  

    loadData();
}, [apiUrl]);

const handleOnSelect = (item) => {
    if (item.type === 'professor') {
        navigate(`/professors/${item._id}`);
    } else if (item.type === 'course') {
        navigate(`/courses/${item.name}`); // Adjust the route as needed
    }
};
  
  
  

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

  
  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.type === 'professor' ? `Professor: ${item.name}` : `Course: ${item.name}`}
        </span>
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
            placeholder="Find a professor/course..."
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar
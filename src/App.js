import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfessorPage from './components/Professor'; // Import your ProfessorDetail component
import Papa from 'papaparse'; // Import papaparse for CSV parsing
import CourseRecommendationForm from './components/CourseRecommender';
import ReactDOM from 'react-dom';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // Replace 'data/tamu_grade_reports.csv' with the actual path to your CSV file
    const csvFilePath = './data/tamu_grade_reports.csv';

    Papa.parse(csvFilePath, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        // 'result.data' contains the parsed CSV data as an array of objects
        setCsvData(result.data);
      },
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SearchBar />
                <CourseRecommendationForm csvData={csvData} />
              </div>
            }
          />
          <Route path="/professors/:id" element={<ProfessorPage />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

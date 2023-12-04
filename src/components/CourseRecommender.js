import React, { useState } from 'react';

function CourseRecommendationForm({ onRecommend, csvData }) {
  const [courseNumber, setCourseNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [gradesLink, setGradesLink] = useState('');
  const [recommendedProfessor, setRecommendedProfessor] = useState('');

  const calculateRecommendedProfessor = () => {
    if (csvData && csvData.length > 0) {
      let maxAs = 0;
      let recommendedProf = '';

      // Filter CSV data based on user input
      const filteredData = csvData.filter(entry => entry.Dept === department && entry.Course_Num === courseNumber);

      // Iterate through filtered data to find the best professor
      for (const entry of filteredData) {
        let numAs = entry['Grade_A']; // Assuming Grade_A column exists
        if (numAs > maxAs) {
          maxAs = numAs;
          recommendedProf = entry.Instructor;
        }
      }

      setRecommendedProfessor(recommendedProf); // Set the state
    }
  };

  const handleRecommendation = () => {
    if (courseNumber && department) {
      setCalculating(true);
      setGradesLink(`https://anex.us/grades/?dept=${department}&number=${courseNumber}`);
      calculateRecommendedProfessor();
      setCalculating(false);
    } else {
      // Handle validation error
    }
  };


  return (
    <div>
      <h2>Course Recommendation</h2>
      <label>
        Course Number (4 letters):
        <input
          type="text"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
        />
      </label>
      <label>
        Identifier (3 digits):
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </label>
      <button onClick={() => handleRecommendation()}>Recommend Professor</button>
      {gradesLink && (
        <p><a href={gradesLink} target="_blank" rel="noopener noreferrer">View Grades</a></p>
      )}
      {calculating && <p>Calculating...</p>} {/* Display loading message while calculating */}
      {recommendedProfessor && !calculating && (
        <p>Recommended Professor: {recommendedProfessor}</p>
      )}
    </div>
  );
}

export default CourseRecommendationForm;

// Importing necessary dependencies and components
import React, { useState } from "react";
import "./Home.css"; // Importing custom CSS for styling
import quizBanner from "../assets/Quiz2.svg"; // Importing quiz banner image
import TextField from "@mui/material/TextField"; // Material UI TextField component
import { Button, MenuItem } from "@mui/material"; // Button and MenuItem from Material UI
import Categories from "../Data/Categories"; // Importing quiz categories
import { useNavigate } from "react-router-dom"; // Hook for navigation
import ErrorMessage from "../Components/Errormessage"; // Custom error message component

// Home component receives props: name, setName, and fetchQuestions
function Home({ name, setName, fetchQuestions }) {
  // State to manage selected category
  const [category, setCategory] = useState("");
  // State to manage selected difficulty level
  const [Difficulty, setDifficulty] = useState("");
  // State to manage error message display
  const [error, setError] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to handle the form submission
  const handleSubmit = () => {
    // If any field is empty, show error
    if (!category || !Difficulty || !name) {
      setError(true);
      return;
    } else {
      // Clear error and proceed to fetch quiz questions
      setError(false);
      fetchQuestions(category, Difficulty);
      // Navigate to the quiz page
      navigate("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        {/* Heading */}
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings__select">
          {/* Show error message if validation fails */}
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}

          {/* Name input field */}
          <TextField
            label="Enter Your Name"
            variant="outlined"
            value={name}
            style={{ marginBottom: 25 }}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Category select field */}
          <TextField
            select
            label="Select Category"
            variant="outlined"
            value={category}
            style={{ marginBottom: 25 }}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Mapping categories to MenuItems */}
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          {/* Difficulty select field */}
          <TextField
            select
            label="Select Difficulty"
            value={Difficulty}
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>

      {/* Displaying quiz banner image */}
      <img src={quizBanner} className="banner" alt="Quiz Image" />
    </div>
  );
}

// Exporting Home component for use in other parts of the app
export default Home;
    
// Importing necessary dependencies and components
import { useState } from "react";
import axios from "axios"
import "./App.css"; // Importing global CSS
import Header from "./Components/Header"; // Header component
import { BrowserRouter, Route, Routes } from "react-router-dom"; // React Router for routing
import Footer from "./Components/Footer"; // Footer component
import Home from "./Pages/Home"; // Home page
import Quiz from "./Pages/Quiz"; // Quiz page
import Result from "./Pages/Result"; // Result page

function App() {
  // State to store the user's name
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState("");
  const [Score, setScore] = useState(0);

  // Function to fetch questions (currently empty — to be implemented later)
   const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
   
  };

  return (
    // Wrapping the app with BrowserRouter to enable routing
    <BrowserRouter>
      {/* Main container with background image */}
      <div className="App" style={{ backgroundImage: "url('/ques1.png')" }}>
        {/* Top navigation header */}
        <Header />

        {/* Defining routes for different pages */}
        <Routes>
          {/* Home route - passing props to Home component */}
          <Route
            path="/"
            element={
              <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
            }
          />
          {/* Quiz page route */}
          <Route path="/Quiz" element={<Quiz 
          name={name}
          questions={questions}
          setQuestions={setQuestions}
          Score={Score}
          setScore={setScore}
          />} />
          {/* Result page route */}
          <Route path="/Result" element={<Result name={name} score={Score} />} />
        </Routes>
      </div>

      {/* Bottom footer component */}
      <Footer />
    </BrowserRouter>
  );
}

// Exporting the App component as default
export default App;

import "./styles.css";
import LandingPage from "./LandingPage";
import Quiz from "./Quiz";
import { useState } from "react";
import SummaryComponent from "./SummaryComponent";

export default function App() {
  const [nextPage, setNextPage] = useState(0);
  const [score, setScore] = useState(0);
  const [summary, setSummary] = useState({ correct: [], incorrect: [] });

  return (
    <div className="App">
      {nextPage === 1 ? (
        <Quiz
          setNextPage={setNextPage}
          setScore={setScore}
          score={score}
          setSummary={setSummary}
          summary={summary}
        />
      ) : nextPage === 2 ? (
        <SummaryComponent
          score={score}
          setNextPage={setNextPage}
          summary={summary}
          setScore={setScore}
        />
      ) : (
        <LandingPage setNextPage={setNextPage} />
      )}
    </div>
  );
}

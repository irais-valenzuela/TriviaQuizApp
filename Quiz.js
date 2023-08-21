import axios from "axios";
import { useEffect, useState } from "react";

const Quiz = ({ setNextPage, setScore, score, setSummaryArr, summaryArr }) => {
  const [quizContent, setQuizContent] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [idx, setIdx] = useState(0);

  const checkAnswer = (response) => {
    if (response === quizContent[idx].correct_answer) {
      setScore(score + 1);
      setFeedback("Good job!");
      const array = response.split("");
      console.log("array =>>>", array);
      // setSummaryArr([...summaryArr[0].correct, ...array]);
    } else {
      setFeedback(`Incorrect!`);
      // setSummaryArr([summaryArr[1].incorrect, ...response]);
    }
  };

  console.log("sum", summaryArr);

  const handleNext = () => {
    if (idx === 9) {
      setNextPage(2);
    } else {
      setFeedback("");
      setIdx(idx + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"
        );

        setQuizContent(data.results);
      } catch (error) {
        console.error("Oops, something went wrong. Try again later.", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {
        <div>
          <h1 className="quiz-question">
            {quizContent.length && quizContent[idx].question
              ? `Question ${idx + 1}: ${quizContent[idx].question}`
              : ""}
          </h1>
          <h3
            className="quiz-feedback"
            style={{ color: feedback === "Good job!" ? "green" : "red" }}
          >
            {feedback.length ? feedback : ""}
          </h3>
          {quizContent.length
            ? quizContent[idx].incorrect_answers.map((incorrectAnswer, idx) => {
                return (
                  <div key={idx} className="quiz-flex">
                    <button onClick={() => checkAnswer(incorrectAnswer)}>
                      {incorrectAnswer}
                    </button>
                  </div>
                );
              })
            : ""}
          <button
            className="correct-answer"
            onClick={() => checkAnswer(quizContent[idx].correct_answer)}
          >
            {quizContent.length ? quizContent[idx].correct_answer : ""}
          </button>
          <p className="score">Score: {score}</p>
          <div className="next-button">
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Quiz;

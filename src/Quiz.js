import axios from "axios";
import { useEffect, useState } from "react";

const Quiz = ({ setNextPage, setScore, score, setSummary, summary }) => {
  const [quizContent, setQuizContent] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [idx, setIdx] = useState(0);
  const [disable, setDisable] = useState(false);

  const checkAnswer = (response) => {
    if (response === quizContent[idx].correct_answer) {
      setScore(score + 1);
      setFeedback("Good job!");
      setSummary({
        ...summary,
        correct: [...summary.correct, response],
        incorrect: [...summary.incorrect]
      });
    } else {
      setFeedback(`Incorrect!`);
      setSummary({
        ...summary,
        correct: [...summary.correct],
        incorrect: [...summary.incorrect, response]
      });
    }
    setDisable(true);
  };

  const handleNext = () => {
    if (idx === 9) {
      setNextPage(2);
    } else {
      setFeedback("");
      setIdx(idx + 1);
    }
  };

  useEffect(() => {
    setDisable(false);
  }, [idx]);

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
                    <button
                      disabled={disable}
                      className={disable ? "disabled" : "incorrect-button"}
                      onClick={() => checkAnswer(incorrectAnswer)}
                    >
                      {incorrectAnswer}
                    </button>
                  </div>
                );
              })
            : ""}
          <div className="correct-answer-div">
            <button
              disabled={disable}
              className={disable ? "disabled" : "correct-answer"}
              onClick={() => checkAnswer(quizContent[idx].correct_answer)}
            >
              {quizContent.length && quizContent[idx].correct_answer}
            </button>
          </div>
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

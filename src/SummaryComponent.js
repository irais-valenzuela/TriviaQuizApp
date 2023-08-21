const SummaryComponent = ({ score, setNextPage, summary, setScore }) => {
  console.log("summary", summary);
  const handleReset = () => {
    setNextPage(0);
    setScore(0);
  };
  return (
    <div className="summary-div">
      <h1>{`You got ${score} correct!`}</h1>

      <p className="correct-answers">Correct answers: </p>
      {summary.correct.length &&
        summary.correct.map((answer) => {
          return <p>{answer}</p>;
        })}

      <p className="incorrect-answers">Incorrect answers: </p>
      {summary.incorrect.length &&
        summary.incorrect.map((answer) => {
          return <p>{answer}</p>;
        })}

      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SummaryComponent;

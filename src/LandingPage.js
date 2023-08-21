const LandingPage = ({ setNextPage }) => {
  const handleGetStarted = () => {
    setNextPage(1);
  };
  return (
    <div className="landing-page">
      <h1>Test your music knowledge with this Trivia Game!</h1>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default LandingPage;

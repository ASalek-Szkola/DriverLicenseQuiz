import React from 'react';

const QuizResults = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="text-center py-4">
      <h2 className="mb-4">Quiz Completed!</h2>
      <div className="display-4 mb-4">
        {score} / {totalQuestions}
      </div>
      <p className="lead mb-4">
        {score === totalQuestions ? "Perfect score! You're ready for the road!" : "Good effort! Keep practicing."}
      </p>
      <button className="btn btn-outline-primary btn-lg" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
};

export default QuizResults;

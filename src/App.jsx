import { useState, useEffect } from 'react'
import './App.css'
import { QUIZ_QUESTIONS } from './data/questions';
import Question from './components/Question';
import QuizResults from './components/QuizResults';
import QuizHeader from './components/QuizHeader';

function App() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions([...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 3));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleCheckAnswers();
    }
  }, [timeLeft, isFinished]);

  const handleOptionChange = (questionId, optionIndex) => {
    if (isFinished) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleCheckAnswers = () => {
    let currentScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
    setIsFinished(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(60);
    setIsFinished(false);
    setQuestions([...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 3));
  };

  const progress = (Object.keys(selectedAnswers).length / questions.length) * 100;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            {!isFinished ? (
              <>
                <QuizHeader title="Driver License Quiz" progress={progress} timeLeft={timeLeft} />
                <div className="card-body p-4">
                  {questions.map((q, index) => (
                    <Question
                      key={q.id}
                      question={q}
                      index={index}
                      selectedAnswer={selectedAnswers[q.id]}
                      onOptionChange={handleOptionChange}
                      isFinished={isFinished}
                    />
                  ))}
                  <div className="d-grid mt-4">
                    <button 
                      className="btn btn-primary btn-lg" 
                      onClick={handleCheckAnswers}
                      disabled={Object.keys(selectedAnswers).length < questions.length}
                    >
                      Check Answers
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-body p-4 text-center">
                <QuizResults score={score} totalQuestions={questions.length} onRestart={handleRestart} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

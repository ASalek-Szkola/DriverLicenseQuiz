import React from 'react';

const QuizHeader = ({ title, progress, timeLeft }) => {
  return (
    <>
      <div className="card-header bg-primary text-white p-4">
        <h1 className="h3 mb-0">{title}</h1>
      </div>
      <div className="px-4 pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="flex-grow-1 me-3">
            <div className="progress" style={{ height: '10px' }}>
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" 
                style={{ width: `${progress}%` }}
                aria-valuenow={progress} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className={`badge ${timeLeft < 10 ? 'bg-danger' : 'bg-info'} fs-6`}>
            Time Left: {timeLeft}s
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizHeader;

import React from 'react';

const Question = ({ question, index, selectedAnswer, onOptionChange, isFinished }) => {
  return (
    <div className="mb-5">
      <h2 className="h5 mb-3">{index + 1}. {question.question}</h2>
      {question.image && (
        <div className="mb-3 text-center">
          <img src={question.image} alt="Road Sign" className="img-fluid" style={{ maxHeight: '100px' }} />
        </div>
      )}
      <div className="list-group">
        {question.options.map((option, optIdx) => (
          <label 
            key={optIdx} 
            className={`list-group-item list-group-item-action ${selectedAnswer === optIdx ? 'active' : ''}`}
            style={{ cursor: isFinished ? 'default' : 'pointer' }}
          >
            <input
              className="form-check-input me-3"
              type="radio"
              name={`question-${question.id}`}
              value={optIdx}
              checked={selectedAnswer === optIdx}
              onChange={() => onOptionChange(question.id, optIdx)}
              disabled={isFinished}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;

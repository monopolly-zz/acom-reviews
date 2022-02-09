import React from 'react';


const FeedbackAdditionalQuestions = ({
    additionalFeedbackTitle,
    additionalFeedbackQuestions,
    selectAdditionalQuestion
}) => {
    return (
        <>
            <div
                data-testid="hlx-additional-question-title"
                className="hlx-additional-questions-title"
            >
                {additionalFeedbackTitle}
            </div>
            <div className="hlx-additional-questions-parent">
                {additionalFeedbackQuestions.map((item) => (
                    <div className="hlx-additional-questions-item">
                        <input
                            onClick={selectAdditionalQuestion}
                            type="checkbox"
                            className="ajs-hlx-additional-question-chckbox"
                            value={item}
                        />
                        <label className="ajs-hlx-additional-question-label">
                            {item}
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FeedbackAdditionalQuestions;
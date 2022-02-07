import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Review from '../Review';

const ACTIVE_CLASS = 'is-Active';
const COMMENT_FIELD_CLASS = 'hlx-Review-commentFields';
const COMMENT_FIELD_CLASS_TITLE = 'ajs-hlx-review-commentsTitle';
const HLX_SUBTITLE = 'hlx-subTitle';
const HLX_REVIEW_TITLE = 'hlx-reviewTitle';

test('sets is-Active class on current ratings and below the clicked rating', () => {
    render(<Review />);
    const ratingFields = document.getElementsByClassName('hlx-Review-ratingFields')[0];
    userEvent.click(ratingFields.childNodes[3]);
    expect(ratingFields.childNodes[5]).not.toHaveClass(ACTIVE_CLASS);
    expect(ratingFields.childNodes[4]).not.toHaveClass(ACTIVE_CLASS);
    expect(ratingFields.childNodes[3]).toHaveClass(ACTIVE_CLASS);
    expect(ratingFields.childNodes[2]).toHaveClass(ACTIVE_CLASS);
    expect(ratingFields.childNodes[1]).toHaveClass(ACTIVE_CLASS);
});

test('Shows comment field when rated below comment threshold', () => {
    const getRatingFields = () =>
        document.getElementsByClassName('hlx-Review-ratingFields')[0];
    const clickOpt = { clientX: 99, clientY: 99 };

    render(<Review commentThreshold={2} />);
    let ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[3], clickOpt);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(0);
    cleanup();

    render(<Review commentThreshold={2} />);
    ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[1], clickOpt);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(1);
    cleanup();

    render(<Review commentThreshold={2} />);
    ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[5], clickOpt);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(0);
    cleanup();

    render(<Review commentThreshold={2} />);
    ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[2], clickOpt);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(1);
});

test('sets subTitle if helixRatingsConfig has subtitle', () => {
    const helixRatingsConfig = {
        subTitle: 'Please rate your experience with the new viewer.',
    };
    render(<Review helixRatingsConfig={helixRatingsConfig} />);
    const subTitle = document.getElementsByClassName(HLX_SUBTITLE);
    expect(subTitle).toHaveLength(1);
});

test('sets comments section by default when defaultCommentProperty is enabled and sets the comments title', () => {
    const helixRatingsConfig = {
        defaultCommentEnabled: true,
        commentsTitle: 'Any comments or recommendations?',
        hideTitle: true,
    };
    render(<Review helixRatingsConfig={helixRatingsConfig} />);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS)).toHaveLength(1);
    expect(document.getElementsByClassName(COMMENT_FIELD_CLASS_TITLE)).toHaveLength(1);
});

test('reviewTitle is not rendered if hideTitle is true', () => {
    const helixRatingsConfig = {
        defaultCommentEnabled: true,
        commentsTitle: 'Any comments or recommendations?',
        hideTitle: true,
    };
    render(<Review helixRatingsConfig={helixRatingsConfig} />);
    expect(document.getElementsByClassName(HLX_REVIEW_TITLE)).toHaveLength(0);
});

test('reviewTitle is rendered by default', () => {
    render(<Review />);
    expect(document.getElementsByClassName(HLX_REVIEW_TITLE)).toHaveLength(1);
});

test('primary and secondary buttons are rendered if helixRatingsConfig has buttonGroupProps', () => {
    const helixRatingsConfig = {
        subTitle: 'Please rate your experience with the new viewer.',
        buttonGroupProps: {
            primary: {
                btnStyle: 'spectrum-Button spectrum-Button--cta',
                labelStyle: 'spectrum-Button-label',
                btnText: 'Submit',
                btnCallBack: () => {},
            },
            secondary: {
                btnStyle: 'spectrum-Button spectrum-Button--secondary',
                labelStyle: 'spectrum-Button-label',
                btnText: 'Skip',
                btnCallBack: () => {},
            },
        },
    };
    render(<Review helixRatingsConfig={helixRatingsConfig} />);
    const primaryBtn = document.getElementsByClassName(
        helixRatingsConfig.buttonGroupProps.primary.btnStyle
    );
    const secondaryBtn = document.getElementsByClassName(
        helixRatingsConfig.buttonGroupProps.secondary.btnStyle
    );
    expect(primaryBtn).toHaveLength(1);
    expect(secondaryBtn).toHaveLength(1);
});

test('toggle switch buttons is rendered only when rated below comment threshold', () => {
    const helixRatingsConfig = {
        subTitle: 'Please rate your experience with the new viewer.',
        buttonGroupProps: {
            switch: {
                switchParentStyle: 'spectrum-ToggleSwitch',
                inputStyle: 'spectrum-ToggleSwitch-input',
                switchStyle: 'spectrum-ToggleSwitch-switch',
                labelStyle: 'spectrum-ToggleSwitch-label',
                btnText: 'Use Classic Viewer',
                btnCallBack: () => {},
            },
        },
    };
    const getRatingFields = () =>
        document.getElementsByClassName('hlx-Review-ratingFields')[0];
    const clickOpt = { clientX: 99, clientY: 99 };

    render(<Review commentThreshold={2} helixRatingsConfig={helixRatingsConfig} />);
    const ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[1], clickOpt);
    expect(
        document.getElementsByClassName(
            helixRatingsConfig.buttonGroupProps.switch.switchParentStyle
        )
    ).toHaveLength(1);
});

test('toggle switch buttons are not rendered if helixRatingsConfig does not hold the property when rated below comment threshold', () => {
    const helixRatingsConfig = {};
    const getRatingFields = () =>
        document.getElementsByClassName('hlx-Review-ratingFields')[0];
    const clickOpt = { clientX: 99, clientY: 99 };

    render(<Review commentThreshold={2} helixRatingsConfig={helixRatingsConfig} />);
    const ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[1], clickOpt);
    expect(document.getElementsByClassName('spectrum-ToggleSwitch')).toHaveLength(0);
});

test('additional questions are rendered by default if displayAdditionalQuestionsEnabled is true', () => {
    const helixRatingsConfig = {
        additionalFeedbackTitle:
            "We're sorry that your experience is not great. Please let us know why your experience has been poor",
        additionalFeedbackQuestions: [
            "Can't find what I'm looking for",
            'Too slow',
            'Hard to use',
            'Missing features',
            'Other',
        ],
        displayAdditionalQuestionsEnabled: true,
    };

    render(<Review commentThreshold={2} helixRatingsConfig={helixRatingsConfig} />);
    expect(
        document.getElementsByClassName('hlx-additional-questions-parent')
    ).toHaveLength(1);
    expect(document.getElementsByClassName('hlx-additional-questions-item')).toHaveLength(
        5
    );
    expect(screen.getByTestId('hlx-additional-question-title')).toHaveTextContent(
        helixRatingsConfig.additionalFeedbackTitle
    );
});

test('additional questions are rendered only when rated below comment threshold if displayAdditionalQuestionsEnabled is false', () => {
    const helixRatingsConfig = {
        additionalFeedbackTitle:
            "We're sorry that your experience is not great. Please let us know why your experience has been poor",
        additionalFeedbackQuestions: ["Can't find what I'm looking for", 'Too slow'],
        displayAdditionalQuestionsEnabled: false,
    };

    render(<Review helixRatingsConfig={helixRatingsConfig} />);
    expect(
        document.getElementsByClassName('hlx-additional-questions-parent')
    ).toHaveLength(0);
    expect(document.getElementsByClassName('hlx-additional-questions-item')).toHaveLength(
        0
    );
    const getRatingFields = () =>
        document.getElementsByClassName('hlx-Review-ratingFields')[0];
    const clickOpt = { clientX: 99, clientY: 99 };

    render(<Review commentThreshold={2} helixRatingsConfig={helixRatingsConfig} />);
    const ratingFields = getRatingFields();
    userEvent.click(ratingFields.childNodes[1], clickOpt);
    expect(
        document.getElementsByClassName('hlx-additional-questions-parent')
    ).toHaveLength(1);
    expect(document.getElementsByClassName('hlx-additional-questions-item')).toHaveLength(
        2
    );
    expect(screen.getByTestId('hlx-additional-question-title')).toHaveTextContent(
        helixRatingsConfig.additionalFeedbackTitle
    );
});
import React from 'react';

const HelixButtonGroup = ({ buttonGroupProps, displayToggleSwitch, handleSubmit, toggleClassicViewer }) => {
    const {
        primary: { btnStyle, labelStyle, btnText } = {},
        secondary: {
            btnStyle: btnStyleSecondary,
            labelStyle: labelStyleSecondary,
            btnText: btnTextSecondary,
            btnCallBack: btnCallBackSecondary,
        } = {},
    } = buttonGroupProps;
    const {
        switch: {
            switchParentStyle,
            inputStyle,
            switchStyle,
            labelStyle: switchLabelStyle,
            btnText: switchText,
        } = {},
    } = buttonGroupProps;
    return (
        <div className="ajs-hlx-btn-container">
            { displayToggleSwitch ? (
                <label className={switchParentStyle}>
                    <input
                        type="checkbox"
                        className={inputStyle}
                        role="switch"
                        value=""
                        onChange={toggleClassicViewer}
                    />
                    <span className={switchStyle} />
                    <span className={switchLabelStyle}>{switchText}</span>
                </label>
            ) : null}
            { btnTextSecondary ? (
                <button
                    type="button"
                    onClick={btnCallBackSecondary()}
                    className={`hlx-review-btn ${btnStyleSecondary}`}
                >
                    <span className={labelStyleSecondary}>{btnTextSecondary}</span>
                </button>
            ) : null}
            { btnText ? (
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`hlx-review-btn ${btnStyle}`}
                >
                    <span className={labelStyle}>{btnText}</span>
                </button>
            ) : null}
        </div>
    );
};

export default HelixButtonGroup;
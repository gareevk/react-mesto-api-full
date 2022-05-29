import React from 'react';

function PopupWithForm( {name, title, isOpen, onClose, buttonMessage, onSubmit, children} ) {

    return (
        <div className={`popup popup__${name} ${isOpen && 'popup_opened'}`}>
            <form className="popup__container" name={name} onSubmit={onSubmit}>
                <h2 className="popup__heading">{title}</h2>
                {children}
                <div className="popup__save-button-container">
                    <button id={`${name}-submit-button`} className="popup__save-button" type="submit">{buttonMessage}</button>
                    <span id ="profile-loading-placeholder" className="popup__loading-placeholder">Сохранение...</span>
                </div>
                <button className="popup__close-button" onClick={onClose} type="reset"></button>
            </form>
        </div>
    );
}

export default PopupWithForm;
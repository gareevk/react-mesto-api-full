import React from 'react';

function ImagePopup( {card, onClose}) {

    return (
        <section className={`popup ${card ? 'popup_opened' : ''}`} id="card-popup">
            <div className="popup__card-container">
                <img className="popup__card-fullscreen" src={card?.link} alt="Карточка с изображением места"/>
                <button id="card-close" onClick={onClose} className="popup__close-button" type="reset"></button>
                <p className="popup__description">{card?.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;
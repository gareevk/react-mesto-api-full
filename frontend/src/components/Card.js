import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card( {card, onCardClick, onCardLike, onCardDelete} ) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__thrash-can ${isOwn ? 'elements__thrash-can_visible' : 'elements__thrash-can_disabled'}`
    );
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__item-like ${isLiked ? 'elements__item-like_active' : ''}`
    );
    
    function handleClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card._id);
    }

    return (
        <li className="elements__item">
            <button onClick={handleClick} className="elements__item-button"><img className="elements__item-image" src={card.link} alt="Карточка с изображением места"/></button>
            <div className="elements__item-subheading">
                <h2 className="elements__item-name">{card.name}</h2>
                <div className="elements__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="reset"></button>
        </li>
    )
}

export default Card;
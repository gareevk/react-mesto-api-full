import React from 'react';
import avatarEditIconPath from '../images/avatar-edit.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main( { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete } ) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-container">
                        <button className="profile__edit-avatar-button" onClick={onEditProfile} type="button"><img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>{currentUser.avatar && (<img className="profile__edit-avatar-icon" src ={avatarEditIconPath} alt="кнопка редактирования аватара"/>)}</button>
                    </div>    
                <div className="profile__bio">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" onClick={onEditAvatar} type="button"></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>   
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__gallery">
                    {cards.map( (card) => {
                        return (<Card 
                                    onCardLike={onCardLike} 
                                    onCardDelete={onCardDelete} 
                                    card={card} 
                                    key={card._id} 
                                    onCardClick={onCardClick}
                                />
                                );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;
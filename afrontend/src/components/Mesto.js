import React from 'react';
import Main from './Main';
import Footer from './Footer';

function Mesto( {onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete} ) {
    return (
        <>
            <Main 
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onEditAvatar={onEditAvatar}
                onCardClick={onCardClick}
                cards={cards}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
            />
            <Footer />
        </>
        
    );
}

export default Mesto;
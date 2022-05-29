import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup( {isOpen, onClose, onAddPlace, submitButtonMessage} ) {
    const [cardName, setCardName] = React.useState('');
    const [cardUrl, setCardUrl] = React.useState('');
    //const initialFormValues = {cardName: "", cardUrl: ""};
    //const [formValues, setFormValues] = React.useState(initialFormValues);

    /*
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, cardName: value} );
        console.log(formValues);
    }
    */

    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }

    function handleCardUrlChange(e) {
        setCardUrl(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: cardName,
            link: cardUrl
        });
        setCardName('');
        setCardUrl('');
    }
    
    return (
        <PopupWithForm
            name="addCardPopup"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonMessage={submitButtonMessage}
            onSubmit={handleSubmit}
        >
            <input
                id="card-name" 
                className="popup__input" 
                type="text" 
                name="name" 
                required 
                minLength="2" 
                maxLength="30" 
                placeholder="Название" 
                value={cardName} 
                onChange={handleCardNameChange}
            />
            <span id="card-name-error" className="popup__input-error"></span>
            <input
                id="card-link" 
                className="popup__input" 
                type="url" 
                name="link" 
                required 
                minLength="2" 
                placeholder="Ссылка на картинку" 
                value={cardUrl} 
                onChange={handleCardUrlChange}
            />
            <span id="card-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
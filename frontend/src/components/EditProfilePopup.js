import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ( {isOpen, onClose, onUpdateUser, submitButtonMessage} ) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description);
    }

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser.name, currentUser.about, isOpen]);
    

    return (
        <PopupWithForm 
            name="profilePopup" 
            title="Редактировать профиль" 
            isOpen={isOpen} 
            onClose={onClose}
            buttonMessage={submitButtonMessage}
            onSubmit={handleSubmit}
            >
            <input id="name-input" className="popup__input" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleNameChange}/>
            <span id="name-input-error" className="popup__input-error"></span>
            <input id="bio-input" className="popup__input" type="text" name="about" placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange}/>
            <span id="bio-input-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
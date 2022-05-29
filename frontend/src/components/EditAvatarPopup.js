import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitButtonMessage }) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar( inputRef.current.value );
    }

    React.useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="editAvatarPopup"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonMessage={submitButtonMessage}
            onSubmit={handleSubmit}
        >
            <input ref={inputRef} id="avatar-link" className="popup__input" type="url" name="link" required minLength="2" placeholder="Ссылка на картинку"/>
            <span id="avatar-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
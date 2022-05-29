const apiConfig = {
  userToken: '29b7c506-9f8b-4a60-9054-462b94d7dbca'
}

//const popupProfile = document.querySelector('.popup__profilePopup');

//const popupAddCard = document.querySelector('.popup__addCardPopup');

const profileAvatarPopup = document.querySelector('.popup__editAvatarPopup');

const profilePopupSubmitButton = document.querySelector('#profilePopup-submit-button');
const avatarPopupSubmitButton = document.querySelector('#editAvatarPopup-submit-button');
const addCardPopupSubmitButton = document.querySelector('#addCardPopup-submit-button');

export {
  apiConfig,
  profileAvatarPopup,
  profilePopupSubmitButton,
  avatarPopupSubmitButton,
  addCardPopupSubmitButton
};
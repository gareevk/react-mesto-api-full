import {
    profilePopupSubmitButton,
    avatarPopupSubmitButton,
    addCardPopupSubmitButton,
} from './constants';

class Api {
    constructor( apiConfig ) {
        this._userToken = apiConfig.userToken;

        this._baseUrl = 'https://api.avocado.nomoreparties.sbs/';
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    deleteCard(cardId) {
        return fetch(
            this._baseUrl + `cards/${cardId}`,
            {
                method:  'DELETE',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                }
            } 
        )
        .then( this._checkResponse)
    }

    likeCard(isLiked, cardId) {
        if (isLiked) {
            return fetch(this._baseUrl + `cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                }                
            })
            .then( this._checkResponse)
        } else {
            return fetch(this._baseUrl + `cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                }
            })
            .then( this._checkResponse)
        }
    }

    setProfileInfo(name, info) {
        return fetch(
            this._baseUrl + 'users/me',
            {
                method: 'PATCH',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    name: name,
                    about: info
                })
            } 
        )
        .then( this._checkResponse)
    }

    getInitialCards() {
        return fetch(
            this._baseUrl + 'cards', 
            {
                method: 'GET',
                headers: { authorization: this._userToken }
            })
            .then( this._checkResponse)

    }

    addCard(formInput) {
        console.log(formInput);
        return fetch(
            this._baseUrl + 'cards',
            {
                method: 'POST',
                headers: {authorization: this._userToken,
                'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formInput.name,
                    link: formInput.link
                  })
            }
        )
        .then( this._checkResponse)
    }

    setAvatar(avatarLink) {
        return fetch( this._baseUrl + 'users/me/avatar',
        {
            method: 'PATCH',
            headers: { authorization: this._userToken, 'Content-Type': 'application/json'},
            body: JSON.stringify({ avatar: avatarLink})
        })
        .then( this._checkResponse)
    }

    getUserInfo() {
        return fetch(
            this._baseUrl + 'users/me',
            {
            method: 'GET',
            headers: {
              authorization: this._userToken, 'Content-Type': 'application/json'
            },
            }
        )
        .then( this._checkResponse)
    } 
}

const api = new Api( {userToken: '29b7c506-9f8b-4a60-9054-462b94d7dbca'} );

export default api;
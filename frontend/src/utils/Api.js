import {
    profilePopupSubmitButton,
    avatarPopupSubmitButton,
    addCardPopupSubmitButton,
} from './constants';
import React from 'react';

class Api {
    constructor( apiConfig ) {
        this._userToken = apiConfig.userToken;

        //this._baseUrl = 'https://api.avocado.nomoreparties.sbs/';
        this._baseUrl = 'http://localhost:3000/'
    }

    _checkResponse = (res) => {
        console.log(res);
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
                headers: { authorization: this._userToken },
            })
            .then( this._checkResponse)

    }

    addCard(formInput) {
        console.log(formInput);
        return fetch(
            this._baseUrl + 'cards',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    authorization: this._userToken,
                    'Content-Type': 'application/json', },
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
            //method: 'GET',
            headers: {
                //Accept: 'application/json',
                authorization: this._userToken,
                'Content-Type': 'application/json',
            },
            }
        )
        .then( this._checkResponse)
    } 
}

const token = localStorage.getItem('jwt');
console.log(`токен: ${token}`);
const api = new Api( { userToken: token } );

export default api;
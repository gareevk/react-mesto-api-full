import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth.js';
import Mesto from './Mesto';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState( false );
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState( false );
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState( false );
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [submitButtonMessage, setSubmitButtonMessage] = React.useState('Сохранить');
    const [currentUser, setCurrentUser] = React.useState( {} );
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState( false );
    const [email, setEmail] = React.useState('');
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState( false );
    const [successSubmitStatus, setSuccessSubmitStatus] = React.useState( false );
    const [tooltipMessage, setTooltipMessage] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        handleTokenCheck();
    }, [handleTokenCheck, loggedIn]);

    React.useEffect( () => {
        if (loggedIn) {
            getUserInfo();
            getInitialCards();
            const closeByEscape = (e) => {
            if (e.key === 'Escape') {
              closeAllPopups();
            }
            }
            document.addEventListener('keydown', closeByEscape);
            return () => document.removeEventListener('keydown', closeByEscape);
        }
        
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.likeCard(!isLiked, card._id)
        .then((newCard) => {
            const item = newCard.data;
            setCards(
                (state) => {
                    const cardsArray = state.map((c) => 
                        c._id === card._id ? item : c
                    );
                    return cardsArray;
                }
            );
            
        })
        .catch( err => console.log('Ошибка в загрузке лайков:' + err));
    }

    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
        .then( () => {
            setCards( () => {
                const newCards = cards.filter( (element) => {
                    if (element._id !== cardId) {
                        return element;
                    }
                });
                return newCards;
            });
        })
        .catch( err => console.log('Удаление карточки не удалось: ' + err));
    }

    function getInitialCards() {
        return api.getInitialCards()
                .then( (res) => {
                    setCards(res.data);
                })
                .catch( (err) => console.log('Ошибка, загрузка информации не удалась: '+ err) );
    }
    
    function getUserInfo() {
        api.getUserInfo()
        .then( user => {
            console.log(user);
            setCurrentUser( user.data);
        } )
        .catch( (err) => console.log('Ошибка, загрузка профиля не удалась: '+ err) );
    }
    
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen( true );
    }

    function handleEditProfileClick () {
        setIsEditProfilePopupOpen( true );
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen( true );
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }
    
    function handleUpdateUser(name, description) {
        setSubmitButtonMessage('Сохранение...');
        api.setProfileInfo(name, description)
        .then( (user) => {
            setCurrentUser(user.data);
            closeAllPopups();
        })
        .catch( err => console.log('Обновление данных пользователя не удалось: ' + err))
        .finally( () => setSubmitButtonMessage('Сохранить'));
    }
    

    function handleUpdateAvatar(url) {
        setSubmitButtonMessage('Сохранение...');
        api.setAvatar(url)
        .then( user => {
            setCurrentUser(user.data);
            closeAllPopups();
        } )
        .catch( err => console.log('Обновление аватара не удалось: ' + err))
        .finally( () => setSubmitButtonMessage('Сохранить'));
    }
    

    function handleAddPlaceSubmit(url) {
        setSubmitButtonMessage('Сохранение...');
        api.addCard(url)
        .then( card => {
            setCards([card.data, ...cards]);
            closeAllPopups();
        })
        .catch( err => console.log('Загрузка карточки не удалась: ' + err))
        .finally( () => setSubmitButtonMessage('Сохранить'));
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt)
            .then( data => {
                if (data) {
                    console.log(data);
                    setLoggedIn(true);
                    setEmail(data.data.email);
                    history.push('/');
                };
            })
            .catch( err => console.log(err));
        }
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    function handleSignIn(userEmail, userPassword) {
        auth.authorize(userEmail.value, userPassword.value)
        .then( data => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
        .then( res => {
            console.log(res);
            if (res.token) {
                setLoggedIn(true);
                handleTokenCheck();
                history.push('/');
            } else {

                setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setSuccessSubmitStatus(false);
                setIsInfoTooltipOpen(true);
            }
            
        })
        .catch(err => {
            console.log(err);
            setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
            setSuccessSubmitStatus(false);
            setIsInfoTooltipOpen(true);
            return err;
        });
    }

    function handleSignUp(userEmail, userPassword) {
        console.log(userEmail.value);
        auth.register(userEmail.value, userPassword.value)
        .then( data => {
            return data; 
        })
        .then( res => {
            console.log(res);
            if (res) {
                setSuccessSubmitStatus(true);
                setTooltipMessage('Вы успешно зарегистрировались!');
                setIsInfoTooltipOpen(true);
                history.push('/sign-in');
            } else if (res === undefined) {
                setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setSuccessSubmitStatus(false);
                setIsInfoTooltipOpen(true);
            }
        })
        .catch( err => {
            return err;
        } );
    }
    

    function closeInfoTooltip() {
        setIsInfoTooltipOpen(false);
        setSuccessSubmitStatus(false);
        setTooltipMessage('');
    }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
        
        <div className="page">
            <div className="content">
                <Header 
                    onSignOutClick={handleSignOut}
                    email={email}
                />
                <Switch>
                    

                    <ProtectedRoute 
                        exact path="/"
                        loggedIn={loggedIn}
                        onEditProfile={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        component={Mesto}
                        
                    />

                    <Route path="/sign-up">
                        <Register
                            name="sign-up" 
                            onSubmit={handleSignUp}
                        />
                    </Route>

                    <Route path="/sign-in">
                        <Login
                            name="sign-in"
                            onSubmit={handleSignIn}
                        />
                    </Route>

                    <Route exact path="">
                        { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
                    </Route>
                </Switch>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} submitButtonMessage={submitButtonMessage}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} submitButtonMessage={submitButtonMessage}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} submitButtonMessage={submitButtonMessage}/>

                <PopupWithForm
                    name="deleteCard"
                    title="Вы уверены?"
                    buttonMessage="Да"
                />

                <ImagePopup 
                    card={selectedCard}
                    onClose={closeAllPopups} 
                />

                <InfoTooltip 
                    isOpen={isInfoTooltipOpen}
                    onClose={closeInfoTooltip}
                    submitStatus={successSubmitStatus}
                    tooltipMessage={tooltipMessage}
                />


            </div>
        </div>
        
    </CurrentUserContext.Provider>
  );
}

export default App;
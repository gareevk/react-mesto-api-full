import React from 'react';
import logoPath from '../images/logo.svg';
import {Route, Link, Switch} from "react-router-dom";

function Header( {onSignOutClick, email } ) {

    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип Место Россия"/>
            <div className='header__container'>
                <Switch>
                    <Route exact path="/">
                        <p className='header__email'>{email}</p>
                        <Link to="/sign-in" className='header__button header__button_sign-out' onClick={onSignOutClick}>Выйти</Link>
                    </Route>

                    <Route path="/sign-in">
                        <Link to="/sign-up" className='header__button'>Регистрация</Link>
                    </Route>

                    <Route path="/sign-up">
                        <Link to="sign-in" className='header__button'>Войти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;
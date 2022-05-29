import React from 'react';
import Form from './Form';
import './styles/register.css';
import {Link} from 'react-router-dom';

function Register( {name, onSubmit }) {

    return (
        <div className='register'>
            <Form 
                name={name}
                onSubmit={onSubmit}
                heading="Регистрация"
                buttonMessage="Зарегистрироваться"
                formMessage="Уже зарегистрированы? "
                link={(<Link to="/sign-in" className='form__message'>Войти</Link>)}
            />
        </div>
    );
}

export default Register;
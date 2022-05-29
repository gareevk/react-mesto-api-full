import React from 'react';
import Form from './Form';
import './styles/login.css';

function Login( {name, onSubmit} ) {
    const formMessage = '';

    return (
        <div className='login'>
            <Form 
                name={name}
                heading="Вход"
                buttonMessage="Войти"
                formMessage={formMessage}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Login;
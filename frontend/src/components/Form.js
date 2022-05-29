import React from 'react';
import './styles/form.css';

function Form( {name, heading, buttonMessage, formMessage, emailValue, passwordValue, link, onSubmit} ) {
    const [formValues, setFormValues] = React.useState( {
        email: '',
        password: ''
    });

    function handleChange(e) {
        setFormValues( { ...formValues, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        
        e.preventDefault();
        const {email, password} = e.target;
        console.log(email.value);
        onSubmit(email, password);
    }
    
    return (
        <div>
            <form className='form' name={`${name}-form`} onSubmit={handleSubmit}>
                <h2 className='form__heading'>{heading}</h2>
                <input className='form__input' id="email" placeholder='Email' value={emailValue} name="email" onChange={handleChange}></input>
                <input className='form__input' id="password" placeholder='Пароль' value={passwordValue} name="password" onChange={handleChange}></input>
                <button className='form__submit-button' type="submit">{buttonMessage}</button>
                <p className='form__message'>{formMessage}{link}</p>
            </form>
            
            
        </div>
    )
}

export default Form;
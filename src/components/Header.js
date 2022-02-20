import React from 'react';
import logo from '../assets/logo.svg'
import profile from '../assets/profile.png'
import './Header.css'

export default ({black}) => {

    return (

        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href="/">
                    <img src={logo} alt="Netflix"></img>
                </a>
            </div>

            <div className='header--profile'>
                <a href="/">
                    <img src={profile} alt="Usuário"></img>
                </a>
            </div>

        </header>

    );
}
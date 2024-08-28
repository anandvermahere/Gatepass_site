import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='header'>
            <img src="/Verni_logo.png" alt="Company Logo" className='company-logo'/>
            <button className='menu-button' onClick={toggleMenu}>
                &#9776;
            </button>
            <div className={`navbar ${isOpen ? 'open' : ''}`}>
                <NavLink 
                    to='/' 
                    className={({ isActive }) => isActive ? 'navop active' : 'navop'}
                    onClick={() => setIsOpen(false)}
                >
                    Home
                </NavLink>
                <NavLink 
                    to='/inward' 
                    className={({ isActive }) => isActive ? 'navop active' : 'navop'}
                    onClick={() => setIsOpen(false)}
                >
                    Inward
                </NavLink>
                <NavLink 
                    to='/outward' 
                    className={({ isActive }) => isActive ? 'navop active' : 'navop'}
                    onClick={() => setIsOpen(false)}
                >
                    Outward
                </NavLink>
                <NavLink 
                    to='/vehicle-voucher' 
                    className={({ isActive }) => isActive ? 'navop active' : 'navop'}
                    onClick={() => setIsOpen(false)}
                >
                    Vehicle Voucher
                </NavLink>
                <NavLink 
                    to='/history' 
                    className={({ isActive }) => isActive ? 'navop active' : 'navop'}
                    onClick={() => setIsOpen(false)}
                >
                    History
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import redditliteLogo from '../../assets/redditlite-logo.png';
import { FaSearch, FaHome } from "react-icons/fa";
import './Header.css';

const Header = () => {
    return (
        <>
            <header>
                <div className='logo'>
                    <img src={redditliteLogo} alt="RedditLite Logo" className='logoIcon'/>
                    <p>reddit<span>Lite</span></p>
                </div>
                <form className='search' >
                    <input
                        type='text'
                        placeholder='Search Reddit'
                    />
                    <FaSearch alt="Search" className="searchIcon" />
                </form>
                <div className='.home'>
                    <a href="/" className="home-link">
                        <FaHome alt="Home" className="homeIcon" />
                    </a>
                </div>
            </header>
        </>
    );
};

export default Header;
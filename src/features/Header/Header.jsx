import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/redditSlice';
import redditliteLogo from '../../assets/redditlite-logo.png';
import { FaSearch, FaHome } from "react-icons/fa";
import './Header.css';

const Header = () => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const onSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(localSearchTerm));
    };

    return (
        <>
            <header>
                <div className='logo'>
                    <img src={redditliteLogo} alt="RedditLite Logo" className='logoIcon'/>
                    <p>reddit<span>Lite</span></p>
                </div>
                <form className='search' onSubmit={onSearchSubmit}>
                    <input
                        type='text'
                        placeholder='Search Reddit'
                        value={localSearchTerm}
                        onChange={onSearchChange}
                        aria-label='Search reddit posts'
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
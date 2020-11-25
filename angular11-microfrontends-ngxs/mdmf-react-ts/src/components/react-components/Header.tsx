import * as React from 'react';
import './Header.css';
import ReactLogo from './ReactLogo.svg';


export const Header = () => {
    return (
        <div>
            <div className="toolbar" role="banner">
                <img src={ReactLogo} alt="React Logo" />
                <span> Welcome React App</span>
            </div>
            <div className="content" role="main">
                <div className="card highlight-card card-small">
                    <img src={ReactLogo} alt="React Logo" />
                    <span> React app is running !</span>                        
                </div>
            </div>
        </div>
    );
}
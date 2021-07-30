import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';

const Header = () => {
    const context = useContext(GlobalState);
    return (
        <header>
            <div className="menu">
                <i className="fas fa-bars" width="30"></i>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">LinhKH Shop</Link>
                </h1>
            </div>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login | Register</Link></li>
                <li>
                    <i className="fas fa-times" width="30" className="menu"></i>
                </li>
            </ul>
            <div className="cart-icon">
                <span>0</span>
                <Link to="/cart">
                    <i className="fas fa-cart-plus" width="30"></i>
                </Link>
            </div>
        </header>
    )
}

export default Header

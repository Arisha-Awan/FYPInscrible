import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ childern }) => {

    const Menu = [
        {
            path: '/inscrible',
            element: 'Home',
            icon: <span className="material-symbols-outlined">home</span>
        },
        {
            path: '/explore',
            element: 'Explore',
            icon: <span className="material-symbols-outlined">explore</span>
        },
        {
            path: '/reels',
            element: 'Reels',
            icon: <span className="material-symbols-outlined">movie</span>
        },
        {
            path: '/create',
            element: 'Create',
            icon: <span className="material-symbols-outlined">add_circle</span>
        },
        {
            path: 'message',
            element: 'Message',
            icon: <span className="material-symbols-outlined">sms</span>
        },
        {
            path: '/profile',
            element: 'Profile',
            icon: <span className="material-symbols-outlined">account_circle</span>
        }
    ];

    const secondMenu = [
        {
            path: '/inscrible',
            element: 'Home',
            icon: <span className="material-symbols-outlined">home</span>
        },
        {
            path: '/explore',
            element: 'Explore',
            icon: <span className="material-symbols-outlined">explore</span>
        },
        {
            path: '/reels',
            element: 'Reels',
            icon: <span className="material-symbols-outlined">movie</span>
        },
        {
            path: '/search',
            element: 'Search',
            icon: <span className="material-symbols-outlined">search</span>
        },
        {
            path: '/create',
            element: 'Create',
            icon: <span className="material-symbols-outlined">add_circle</span>
        },
        {
            path: 'message',
            element: 'Message',
            icon: <span className="material-symbols-outlined">sms</span>
        },
        {
            path: '/profile',
            element: 'Profile',
            icon: <span className="material-symbols-outlined">account_circle</span>
        }
    ];

    return (
        <>
            {/* MOBILE MENU */}
            <div className='navbar-mobile'>
                <div className="navbar-mobile-header">
                    <h1>Inscrible</h1>
                </div>

                <div className="navbar-mobile-search-field">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" className='navbar-mobile-search-field_input' placeholder='Search'></input>
                </div>
            </div>

            <div className="navbar-mobile-menu">
                <ul className='navbar-mobile-menu_list'>
                    {
                        Menu.map((item, i) => (
                            <li className='navbar-mobile-menu_list-item' key={i}>
                                <NavLink to={item.path} className='navbar-mobile-menu_list-item-link' activeclassname='active-b'>
                                    {item.icon}

                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>


            {/* DESKTOP MENU */}

            <div className="navbar-desktop">
                <div className="navbar-desktop-header">
                    <h1>Inscrible</h1>
                </div>
                <hr />

                <div className="navbar-desktop-menu">
                    <ul className='navbar-desktop-menu_list'>
                        {
                            secondMenu.map((item, i) => (
                                <li className="navbar-desktop-menu_list-item" key={i}>
                                    <NavLink to={item.path} className="navbar-desktop-menu_list-item_link" activeclassname='active'>
                                        {item.icon}
                                        {item.element}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>

            {/* TABLET MENU */}

            <div className="navbar-tablet">
                <div className="navbar-desktop-header">
                    {/* <h1>Inscrible</h1> */}
                </div>
                <hr />

                <div className="navbar-desktop-menu">
                    <ul className='navbar-desktop-menu_list'>
                        {
                            secondMenu.map((item, i) => (
                                <li className="navbar-desktop-menu_list-item" key={i}>
                                    <NavLink to={item.path} className="navbar-desktop-menu_list-item_link" activeclassname='active-b'>
                                        {item.icon}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>


            <main>{childern}</main>

        </>

    );
};

export default Navbar;
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import './SideNav.css';
import profile from '../../image/avatar.png';

import API from '../../api';
import { getCookie, removeCookie } from '../../cookie';
import SessionContext from '../session/SessionContext';

export default function SideNav() {

    const name = getCookie('email');

    const {
        state: { user: { email, token } },
        actions: { updateSession }
    } = useContext(SessionContext);

    const handleLogout = async () => {

        updateSession({ user: {} })
        removeCookie('email');
        removeCookie('token');

        try {
            await API.post('logout', { Email: name });
        } catch (e) {
            console.log(e);
        }
    }

    const getToggle = () => {
        const showMenu = (headerToggle, navbarId) => {
            const toggleBtn = document.getElementById(headerToggle),
                nav = document.getElementById(navbarId)
            if (headerToggle && navbarId) {
                toggleBtn.addEventListener('click', () => {
                    nav.classList.toggle('show-menu')
                    toggleBtn.classList.toggle('bx-x')
                })
            }
        }
        showMenu('header-toggle', 'navbar')
        const linkColor = document.querySelectorAll('.nav__link')
        function colorLink() {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
        linkColor.forEach(l => l.addEventListener('click', colorLink))
    }

    useEffect(() => {
        getToggle();
    }, []);

    return (
        <>
            <header class="header">
                <div class="header__container">
                    <img src={profile} alt="" class="header__img" />

                    <a href="#" class="header__logo">Learning Hub</a>

                    <div class="header__search">

                        Wlecome Admin
                    </div>

                    <div class="header__toggle">
                        <i class='bx bx-menu' id="header-toggle"></i>
                    </div>
                </div>
            </header>


            <div class="nav" id="navbar">
                <nav class="nav__container">
                    <div>
                        <a href="#" class="nav__link nav__logo">
                            <i class='bx bxs-disc nav__icon' ></i>
                            <span class="nav__logo-name">LearningHub</span>
                        </a>

                        <div class="nav__list">
                            <div class="nav__items">
                                <h3 class="nav__subtitle">Profile</h3>

                                <Link to="/HomePage" class="nav__link active">
                                    <i class='bx bx-home nav__icon' ></i>
                                    <span class="nav__name">Home</span>
                                </Link>

                                <div class="nav__dropdown">
                                    <Link to="/adminpage" class="nav__link">
                                        <i class='bx bx-user nav__icon' ></i>
                                        <span class="nav__name">Admin</span>
                                    </Link>


                                </div>

                                <Link to="/StudentPage" class="nav__link">
                                    <i class='bx bx-id-card nav__icon'></i>
                                    <span class="nav__name">Student</span>
                                </Link>
                            </div>

                            <div class="nav__items">
                                <h3 class="nav__subtitle">Menu</h3>

                                <div class="nav__dropdown">
                                    <a href="#" class="nav__link">
                                        <i class='bx bx-book-alt nav__icon'></i>
                                        <span class="nav__name">Manage classes</span>
                                        <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </a>

                                    <div class="nav__dropdown-collapse">
                                        <div class="nav__dropdown-content">
                                            <Link to="/classpage" class="nav__dropdown-item">Class</Link>
                                            <Link to="/sectionpage" class="nav__dropdown-item">Section</Link>

                                        </div>
                                    </div>



                                </div>

                                <div class="nav__dropdown">
                                    <a href="#" class="nav__link">
                                        <i class='bx bx-task nav__icon '></i>
                                        <span class="nav__name">Attendance</span>
                                        <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </a>

                                    <div class="nav__dropdown-collapse">
                                        <div class="nav__dropdown-content">
                                            <Link to="/attendance" class="nav__dropdown-item">Take</Link>
                                            <Link to="/attendanceview" class="nav__dropdown-item">View</Link>

                                        </div>
                                    </div>



                                </div>
                                <Link to="/about" class="nav__link">
                                    <i class='bx bx-book-reader nav__icon'></i>
                                    <span class="nav__name">About</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link to="" onClick={handleLogout} class="nav__link nav__logout">
                        <i class='bx bx-log-out bx-tada nav__icon'></i>
                        <span class="nav__name">Log Out</span>
                    </Link>
                </nav>
            </div>



        </>
    );
}
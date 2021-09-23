import React from 'react'

function Header() {
    return (
        <div className='header bg-transparent'>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark p-0">
                    <div className="container-fluid">
                        <a href="https://www.tarento.com">
                            <div className="brandLogo">
                                <img
                                src='./img/logo.png' alt="logo"
                                className="navbar-brand logo"
                                width="125px"
                                height="auto"
                                />
                            </div>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-md-0 mb-lg-0 ms-auto justify-content-end text-uppercase">
                                <li className="nav-item">
                                    <a href='https://kronos.tarento.com/login' className="nav-link link-light" aria-current="page">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href='https://www.tarento.com/about' className="nav-link link-secondary">About</a>
                                </li>
                                <li className="nav-item">
                                    <a href='https://www.tarento.com/services' className="nav-link link-secondary">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a href='https://www.tarento.com/careers' className="nav-link link-secondary">Careers</a>
                                </li>
                                <li className="nav-item">
                                    <a href='https://www.tarento.com/contact' className="nav-link link-secondary">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom'


export const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand" href="#">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/xml'>XML</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to='/stuff'>Stuff</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to='/delfi'>Delfi</Link>
                    </li>
                </ul>
                
            </div>
        </nav>
    )
}
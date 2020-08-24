import React from 'react'
import { Link } from 'react-router-dom'


class Nav extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            collapsed: true,
        }
    }

    toggleNavbar = () => {
        this.setState({collapsed: !this.state.collapsed})
    }
    
    render() {
        const collapsed = this.state.collapsed
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="#">Home</a>
                <button className={`${classTwo}`} onClick={this.toggleNavbar} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${classOne}`} onClick={this.toggleNavbar} id="navbarSupportedContent">
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
}

export default Nav
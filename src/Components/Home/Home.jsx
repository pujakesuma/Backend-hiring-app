import React, { Component } from 'react';
import {Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../Home/Home.css';
import ark from '../../Picture/ark.png'

export class Home extends Component {
    constructor(){
        super()
        this.state = {
            token: ''
        }
    }

    logout = e => {
        localStorage.removeItem('token :')
        this.props.history.push('/login');
    }

    componentDidMount(){
        let token = localStorage.getItem('token :')
        if (!token){
            this.props.history.push('/login')
        }
    }
    render() {
        return (
        <div className='container-home'>
        <Navbar className='navbar-style'>
            <Navbar.Brand>
                <img src={ark} alt="logo"/>
            </Navbar.Brand>
            <input className='navbar-search' type="text" name="search" placeholder="Search.."></input>
            <Link to = '/home'>
                <Navbar.Text id='nav-text'>
                Home
                </Navbar.Text>
            </Link>
            <NavDropdown id="nav-dropdown">
                <NavDropdown.Item >Edit Profile</NavDropdown.Item>
                <NavDropdown.Item>Help and Support</NavDropdown.Item>
            <NavDropdown.Divider/>
                <NavDropdown.Item onClick={e => {this.logout(e)
                    }}>Logout
                </NavDropdown.Item>
            </NavDropdown>
            
                <div className='border-vertical'>
                </div>
        </Navbar>
        </div>
        );
    }
}

export default Home

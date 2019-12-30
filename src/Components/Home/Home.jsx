import { Navbar, Nav, Col } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUserCircle, faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Search from './components/Search'
import React, { Component } from 'react'

export default class Header extends Component {
    getData = (data) =>{
        this.props.getDataFromSearch(data)
    }
    signOut = () =>{
        localStorage.clear();
    }
    render() {
        return (
            <>
            <Navbar bg="light" expand="lg" style={{ borderBottom: '3px solid #DADADA' }}>
                <Navbar.Brand className="mr-2 ml-3" href="/"><img src="/img/arkademy.png" alt="Logo" height="50" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="ml-2" id="basic-navbar-nav">
                        <Col md="7">
                            {
                                (this.props.searchBar==='true') ?
                                <Search getDataFromSearch={this.getData} onChange={this.getData}/> : null
                            }
                        </Col>
                        <Col>
                            <Nav className="ml-auto">
                            <Nav.Link className="mr-3 ml-2 mt-2" href="/">Home</Nav.Link>
                        <Nav.Link className="ml-5 mr-3 mt-2" href={`/profile/${localStorage.getItem('id')}`}><FontAwesomeIcon icon={faUserCircle} size="lg" /> {this.props.user}</Nav.Link> 
                            <hr style={{ border:'none', borderLeft: '1px solid hsla(200, 10%, 50%,100', height:'4vh', width:'1px' }} />
                            <Nav.Link className="ml-3 mt-2" href="/"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
                            <Nav.Link className="ml-3 mt-2" onClick={() => this.signOut()} href='/login'><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Nav.Link>
                        </Nav></Col>
                    </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
}

export default Home
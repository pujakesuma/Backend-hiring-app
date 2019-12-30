import React, { Component } from 'react'
import axios from 'axios'
import Home from '../Home/Home.jsx'
import { Button, Row, ButtonToolbar, DropdownButton, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export class Card extends Component {
    constructor(){
        super()
        this.state={
            card:[],
            base_url: '',
            isLoading: false,
            isError: false,
            next: '',
            page: '',
            previous: '',
            user: ''
        }
    }

    componentDidMount(){
        this.getAll('http://localhost:5000/api/engineers/?page=1')
        this.getName('http://localhost:5000/api/engineers/' + localStorage.getItem('id'))
    }

    getAll = (url) => {
        console.log(url)
        this.setState({ isLoading: true })
        axios.get(url)
            .then(res => {
                this.setState({
                    card: res.data.result.data,
                    next: res.data.nextPage,
                    previous: res.data.prevPage,
                    base_url: url,
                    page: res.data.page,
                    isLoading: false,
                    isError: false
                })
            })
            .catch(err => {
                this.setState({ isLoading: false, isError: true})
            })
    }
    getName = (url) => {
        axios.get(url)
        .then(res=>{
            this.setState({
            user:res.data.result[0].name
            })
        })
        .catch(err => {
            this.setState({
                user:''
            })
        })
    }
    getData = (data) => {
        axios.get(`http://localhost:5000/api/engineers/?page=1&name=${data}`)
        .then(res => {
            this.setState({ 
                card: res.data.result.data,
                next: res.data.nextPage,
                previous: res.data.prevPage,
                page: res.data.page,
                isLoading: false, isError: false})
        })
        .catch(err => {
            this.setState({ isLoading: false, isError: true })
        })
    }
    render() {
        const {card, next, page, previous, user} = this.state
        return (
        <>
        { (!localStorage.getItem('token')) ? <Redirect push to="/login" /> :
        <Home getDataFromSearch={this.getData} searchBar='true' user={this.state.user}/> }
        <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
        <Row>
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Per Page'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=5')}> 5</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=10')}> 10</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=15')}> 15</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=20')}> 20</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>&nbsp;
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Sort By'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=name&order=asc')}>Name (A-Z)</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=name&order=desc')}>Name (Z-A)</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar></Row>
        { // conditional rendering show loading and error
        isLoading ?
        <Row className="justify-content-center">
        <p>Loading..</p></Row> : 
        isError ? (
            <Row className="justify-content-center">
            <Button variant="outline-primary" onClick={() => this.getAll('http://localhost:5000/api/engineers/page=1')}> Try Again</Button>
            </Row>
        ) : 
        
        <CardList list={card} />
            }

            <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
            (!previous) ? <Button variant="outline-primary" disabled> Previous </Button> : <Button variant="outline-primary" onClick={() => this.getAll(previous)}> Previous </Button>
            }
            &nbsp;<Button variant="outline-primary" disabled> {page} </Button>&nbsp;
            {(!next) ? <Button variant="outline-primary" disabled> Next </Button> : <Button variant="outline-primary" onClick={() => this.getAll(next)}> Next </Button>}</Row>
            </Container>
            </>
        )
    }
}

export default Card

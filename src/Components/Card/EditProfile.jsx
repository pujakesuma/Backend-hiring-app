import React, { Component } from 'react'
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import Header from '../Header'
import Axios from 'axios'

export default class EditProfile extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            photo: null,
            description:'',
            skill:'',
            location:'',
            date_of_birth:'',
            expected_salary:'',
            email:'',
            phone:'',
            showcase:'',
            message: '',
            user:''
        }
    }
    componentDidMount(){
        this.getData(process.env.REACT_APP_BASE_URL+`api/v1/engineers/`+this.props.match.params.id)
        this.getName(process.env.REACT_APP_BASE_URL+'api/v1/engineers/' + localStorage.getItem('id'))
    }
    getData = (url) =>{
        Axios.get(url)
        .then(res=>{
            let date = new Date(res.data.result[0].date_of_birth)
            let dob = (date.getUTCMonth()+1) > 9 ?  date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate() :
            date.getUTCFullYear()+'-0'+(date.getUTCMonth()+1)+'-0'+date.getUTCDate()
            this.setState({
                name:res.data.result[0].name,
                photo:res.data.result[0].photo,
                description:res.data.result[0].description,
                skill:res.data.result[0].skill,
                location:res.data.result[0].location,
                date_of_birth:dob,
                expected_salary:res.data.result[0].expected_salary,
                email:res.data.result[0].email,
                phone:res.data.result[0].phone,
                showcase:res.data.result[0].showcase
            })
        })
    }

    Update = e =>{
        e.preventDefault();
        let formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('date_of_birth', this.state.date_of_birth)
        formData.append('location', this.state.location)
        formData.append('phone', this.state.phone)
        formData.append('description', this.state.description)
        formData.append('email', this.state.email)
        formData.append('expected_salary', this.state.expected_salary)
        formData.append('skill', this.state.skill)
        formData.append('showcase', this.state.showcase)
        formData.append('photo', this.state.photo)

        const config =(
            { headers: { 'Content-type':'multipart/form-data', 
            Authorization:'Bearer '+localStorage.getItem('token'), 
            email: localStorage.getItem('email') }}
        )

        Axios.put(process.env.REACT_APP_BASE_URL+`api/v1/engineers/${localStorage.getItem('id')}`, formData, config)
        .then( res=>{
            this.setState({
                message: 'Update Success!'
            })
            // this.props.history.push(`/profile/${localStorage.getItem('id')}`)
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                message: 'Update Failed!'
            })
        })
    }
    getName = (url) => {
        Axios.get(url)
        .then(res=>{
          this.setState({
            user:res.data.result[0].name
          })
        })
        .catch(err=>{
          this.setState({
            user:''
          })
        })
      }
      onFileChange = e =>{
          this.setState({
              photo: e.target.files[0]
          })
      }
    render() {
        console.log('photo: '+this.state.photo)
        return (
            <>
            <Header user={this.state.user}/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
            <Row className='justify-content-center'>
            <Col md='3'>
            <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(`+process.env.REACT_APP_BASE_URL+`uploads/engineers/${this.state.photo})`, backgroundSize: 'cover' }}>
            <Card.Body style={{ height: '200px'}}>
            </Card.Body>
            </Card></Col>
            <Col>
            { (this.state.message==='Update Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : (this.state.message==='Update Success!') ? ( ['success'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : null
                }
            <Form onSubmit={ (e) => this.Update(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ name: e.target.value })} name="name" type="text" value={this.state.name} placeholder="Enter name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Photo</Form.Label>
                    <Form.Control onChange={ this.onFileChange } name="photo" type="file" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ date_of_birth: e.target.value })} name="date_of_birth" type="date" value={this.state.date_of_birth} placeholder="Enter Date Of Birth" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ location: e.target.value })} name="location" type="text" value={this.state.location} placeholder="Enter Location" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ phone: e.target.value })} name="phone" type="text" value={this.state.phone} placeholder="Enter phone number" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ description: e.target.value })} name="description" type="text" value={this.state.description} placeholder="Enter description" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ email: e.target.value })} name="email" type="email" value={this.state.email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Expected Salary</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ expected_salary: e.target.value })} name="expected_salary" type="text" value={this.state.expected_salary} placeholder="Enter Expected Salary (IDR)" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={ (e) => this.setState({ skill: e.target.value })} name="skill" type="text" value={this.state.skill} placeholder="Enter skill" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Showcase</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ showcase: e.target.value })} name="showcase" type="text" value={this.state.showcase} placeholder="Enter showcase link" />
                </Form.Group>
                <Button variant="outline-warning" type="button" href={`/profile/${localStorage.getItem('id')}`} >Cancel</Button>&nbsp;
                <Button variant="outline-primary" type="submit">Save</Button>
            </Form>
            </Col>
            </Row>
            </Container>
            </>
        )
    }
}

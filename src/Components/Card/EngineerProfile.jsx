import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class Profile extends Component {
    constructor(){
        super()
        this.state={
            id: '',
            name:'',
            photo:'',
            description:'',
            skill:'',
            location:'',
            dateOfBirth:'',
            expectedSalary:'',
            email:'',
            phone:'',
            showcase:'',
            isDeleted: false,
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
                id:res.data.result[0].id,
                photo:res.data.result[0].photo,
                description:res.data.result[0].description,
                skill:res.data.result[0].skill,
                location:res.data.result[0].location,
                dateOfBirth:dob,
                expectedSalary:res.data.result[0].expected_salary,
                email:res.data.result[0].email,
                phone:res.data.result[0].phone,
                showcase:res.data.result[0].showcase
            })
        })
    }
    deleteData = (url)=>{
        console.log(url)
        Axios.delete(url)
        .then(res=>{
            this.setState({
                id:true
            });
        })
    }
    getName = (url) => {
        Axios.get(url)
        .then(res=>{
          console.log(url)
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
    render() {
        // console.log(this.state.id)
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
                <Table striped bordered hover>
                <tbody>
                    <tr>
                    <td width='30%'>Name</td>
                    <td> {this.state.name}</td>
                    </tr>
                    <tr>
                    <td>Date Of Birth</td>
                    <td>{this.state.dateOfBirth}</td>
                    </tr>
                    <tr>
                    <td>Location</td>
                    <td>{this.state.location}</td>
                    </tr>
                    <tr>
                    <td>Phone</td>
                    <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                    <td>Description</td>
                    <td>{this.state.description}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                    </tr>
                    <tr>
                    <td>Expected Salary</td>
                    <td>{this.state.expectedSalary}</td>
                    </tr>
                    <tr>
                    <td>Skill</td>
                    <td>{this.state.skill}</td>
                    </tr>
                    <tr>
                    <td>Showcase</td>
                    <td>{this.state.showcase}</td>
                    </tr>
                </tbody>
                </Table>
                <ButtonToolbar>
                <Link to={`/`}><Button variant="outline-primary"><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Back</Button></Link>&nbsp;
                </ButtonToolbar></Col>
                </Row>
            </Container>
        </>
        )
    }
}

import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
            isDeleted: false
        }
    }
    componentDidMount(){
        this.getData(process.env.REACT_APP_BASE_URL+`api/v1/engineers/`+this.props.match.params.id)
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
                dateOfBirth: dob,
                expectedSalary:res.data.result[0].expected_salary,
                email:res.data.result[0].email,
                phone:res.data.result[0].phone,
                showcase:res.data.result[0].showcase
            })
        })
    }
    deleteData = (url)=>{
        console.log(url)
        const config =(
            { headers: { 
                Authorization:'Bearer '+localStorage.getItem('token'), 
                email: localStorage.getItem('email')
            }})
        Axios.delete(url, config)
        .then(res=>{
            this.setState({
                isDeleted:true
            });
            localStorage.clear()
        })
    }
    render() {
        console.log(this.state.id)
        return (
            <>
            <Header user={this.state.name}/>
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
                    <td>{(!this.state.location===null)? this.state.location : ''}</td>
                    </tr>
                    <tr>
                    <td>Phone</td>
                    <td>{(!this.state.phone===null)? this.state.phone : ''}</td>
                    </tr>
                    <tr>
                    <td>Description</td>
                    <td>{(!this.state.description===null)? this.state.description : ''}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                    </tr>
                    <tr>
                    <td>Expected Salary</td>
                    <td>{(!this.state.expectedSalary===0)? this.state.expectedSalary : ''}</td>
                    </tr>
                    <tr>
                    <td>Skill</td>
                    <td>{(!this.state.skill===null)? this.state.skill : ''}</td>
                    </tr>
                    <tr>
                    <td>Showcase</td>
                    <td>{(!this.state.showcase===null)? this.state.showcase : ''}</td>
                    </tr>
                </tbody>
                </Table>
                <ButtonToolbar>
                <Link to={`/edit/${this.state.id}`}><Button variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt}/> Edit</Button></Link>&nbsp;
                <Button variant="outline-danger" onClick={() => this.deleteData(`http://localhost:5000/api/engineers/${this.state.id}`) } ><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                </ButtonToolbar></Col>
                </Row>
                { (this.state.isDeleted) ? <Redirect to='/' /> : null }
            </Container>
        </>
        )
    }
}

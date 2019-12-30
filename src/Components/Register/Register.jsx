import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import '../Register/Register.css';
import pict1 from '../../Picture/output-onlinepngtools.png'
import pict2 from '../../Picture/arkademy1.png';
import axios from 'axios';

class Register extends Component {
    constructor(){
        super()
        this.state={
            name: '',
            email: '',
            password: '',
            role: ''
        }
    }
    register = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
        }

        axios.post('http://localhost:5000/userAuth/register', data)
        .then( res=>{
            console.log(res)
            if(res.status === 200){
                this.setState({
                message: 'Register Success'
            })
            console.log(this.state)
            alert('Register Success')
            }
            else if (res.status === 'error'){
                this.setState({
                message: 'Register Failed'
            })
            console.log(this.state)
            alert('Register Failed')
            }
        })
        .catch(err=>{
            console.log(this.state)
            this.setState({
                message: 'Register Failed!'
            })
        })
    }
    componentDidUpdate = () => {
        if(this.state.message === "Register Success"){
            this.props.history.push ('/login')
        }
    };

    render() {// const {username, password, role, name} = this.state
        return (
        <Grid container>
            <Grid item xs={12} sm={7}>
            <div className='left'>
                <img className="arkademy1" src={pict2} alt="arkademy"/>
                <img className="piclogin" src={pict1} alt="picture1"/>
                <div className="description">
                    <p className="description-header">
                    Hire expert freelancers for any job, online
                    </p>
                    <p className="description-footer">
                    Millions of small businesses use Freelancer to turn their ideas into reality.
                    </p>
                </div>
            </div>
            </Grid>
    
            <Grid item xs={12} sm={5}>
            <div className='right'>
                <p className='textregister'>
                    Register
                </p>
                <div className='form'>
                    <Form>
                    <Form.Group>
                        <Form.Label className='label-username'>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Name"
                        onChange={ (e) => {this.setState({name:e.target.value})
                                            console.log(e.target.value)}}/>
                            <br/>
                        <Form.Label className='label-username'>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Email"
                        onChange={ (e) => {this.setState({email:e.target.value})
                                            console.log(e.target.value)}}/>
                            <br/>
                        <Form.Label className='label-password'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"
                        onChange={ (e) => {this.setState({password:e.target.value})
                                            console.log(e.target.value)}}/>
                            <br/>
                        <Form.Label className='label-role'>Role</Form.Label>
                        <Form.Control as="select" 
                        onChange={ (e) => {this.setState({role:e.target.value})
                                        console.log(e.target.value)}}>
                            <option></option>
                            <option>engineer</option>
                            <option>company</option>
                        </Form.Control>
    
                    </Form.Group> 
                    <br/>
                    <button className='button-register' size="lg" type='button'
                    onClick={ e=> {
                        this.register(e)}}>
                        Create an Account
                    </button>
                    <br/>
                    <Link to = '/login'>
                    <p className="already">Already Have an Account ?</p>
                    </Link>
                    </Form>
                </div>
            </div>
            </Grid>
        </Grid>
        );
    }
}

export default Register;
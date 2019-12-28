import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import '../Login/Login.css';
import pict1 from '../../Picture/output-onlinepngtools.png';
import pict2 from '../../Picture/arkademy1.png';
import axios from 'axios'

export class Login extends Component {
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            role: '',
            token: ''
        }
    }
    login = e => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        axios.post('http://localhost:5000/userAuth/login', data)
        .then( res=>{
            console.log(res)
            if(res.status === 200){
                this.setState({
                message: 'Login success',
                token: res.data.token
            })
            console.log(this.state)
            alert('Login success')
            }
            else if (res.status === 'error'){
                this.setState({
                message: 'Login Failed'
            })
            console.log(this.state)
            alert('Login Failed')
            }
        })
        .catch(err=>{
            console.log(this.state)
            this.setState({
                message: 'Login Failed!'
            })
        })
    }
    componentDidUpdate = () => {
        if(this.state.message === "Login success"){
            localStorage.setItem('username :', this.state.username);
            localStorage.setItem('token :', this.state.token);
            localStorage.setItem('role :', this.state.role)
                this.props.history.push ('/home')
        }
    };

    render() {
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
                <p className='textlogin'>
                    Login
                </p>
                    <div className='form'>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label className='inputUsername'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                        onChange={ (e) => {this.setState({username:e.target.value})
                        console.log(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label className='inputPassword'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" 
                        onChange={ (e) => {this.setState({password:e.target.value})
                        console.log(e.target.value)}}/>
                        </Form.Group> 
                        <Form.Group>
                        <Form.Label className='label-role'>Role</Form.Label>
                        <Form.Control as="select"
                        onChange={ (e) => {this.setState({role:e.target.value})
                        console.log(e.target.value)}}>
                            <option></option>
                            <option>engineer</option>
                            <option>company</option>
                        </Form.Control>
                        </Form.Group> 
                        <p className="forget">
                            Forgot Password ?
                        </p>
                        <button className='button-login' size="lg" 
                        onClick={ e=> {
                            this.login(e)}}>
                        Login
                        </button>
                        <button className='button-register-form-login' size="lg" ><Link to = '/register'>
                        Register
                        </Link>
                        </button>
                    </Form>
                    </div>
                </div>
            </Grid>
            </Grid>
            );
        }
}

export default Login

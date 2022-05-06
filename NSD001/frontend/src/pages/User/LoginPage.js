import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import TitleComponent from "../title";

export default class LoginPage extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        location: {},
    };

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'http://localhost:8000/api/login/';
        const name = this.state.name;
        const password = this.state.password;
        let bodyFormData = new FormData();
        bodyFormData.set('username', name);
        bodyFormData.set('password', password);

        axios.post(url, bodyFormData)
            .then(result => {
                if (result.status === 200) {
                    localStorage.setItem('token', result.data.access);
                    this.setState({redirect: true, isLoading: false});
                    localStorage.setItem('isLoggedIn', true);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    componentDidMount() {
        const url = 'https://freegeoip.app/json/';
        axios.get(url)
            .then(response => {
                const location = response.data;
                this.setState({ location });
            }) 
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <TitleComponent title="React CRUD Login "></TitleComponent>
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header"  > Login Form</div>
                   
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                <input id="inputName" className="form-control" type="text" placeholder="username"  name="username" onChange={this.handleNameChange} required/>
                                    <label htmlFor="inputName">Username</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid username.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/>Remember Password
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                           
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
                            <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}



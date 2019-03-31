import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../redux/actions/AuthActions'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const {authError, auth} = this.props;
        if (auth.uid) return <Redirect to='/' />;
        return (
            <div className='container-fluid col-md-4'>
                <div className='text-center'>
                    <i class="fas fa-dumpster fa-7x"></i>
                    <br />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Enter Email Address</label>
                        <input type='email' class='form-control' id='email' onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Enter Password</label>
                        <input type='password' class='form-control' id='password' onChange={this.handleChange} />
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-info text-center'>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Root State -> Auth -> authError
        // store/reducers/AuthReducer
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
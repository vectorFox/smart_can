import React from 'react'
//import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../redux/actions/AuthActions'
import {NavItem, Nav, NavLink, Button } from 'reactstrap'

const SignedInLinks = (props) => {
    return (
        <div>
             <Nav>
                <NavItem><NavLink className="wText"  href="/profile"> Profile </NavLink></NavItem>
                <NavItem><NavLink className="wText"  href="/scan"> Scan </NavLink></NavItem>
                <NavItem><NavLink className="wText" onClick={props.signOut}  href="#"> Log Out </NavLink></NavItem>
            </Nav>
        </div>
    )
}

const mapDispatchFromProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchFromProps)(SignedInLinks)
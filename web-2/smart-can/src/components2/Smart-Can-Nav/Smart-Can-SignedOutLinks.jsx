import React from 'react'
//import {NavLink} from 'react-router-dom'
import {NavItem, Nav, NavLink} from 'reactstrap'

const SignedOutLinks = () => {
    return (
        <div>
            <Nav>
                <NavItem><NavLink className="wText" href="/login"> Login </NavLink></NavItem>
                <NavItem><NavLink className="wText" href="/about"> About </NavLink></NavItem>
            </Nav>  
        </div>
    )
}

export default SignedOutLinks
import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import SignedOutLinks from './Smart-Can-SignedOutLinks';
import './navbar.css'

const Nav = (props) => {
    return (
        <div>
            <Navbar className="transparent" color="faded">
            <NavbarBrand className="wText" href="/"> 
            <i class="fas fa-dumpster-fire white"></i>
              <b> Smart Can </b>
            </NavbarBrand>
            <SignedOutLinks></SignedOutLinks>
          </Navbar>
        </div>
    )
}


export default Nav
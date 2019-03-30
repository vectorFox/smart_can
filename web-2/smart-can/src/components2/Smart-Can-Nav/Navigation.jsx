import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import SignedOutLinks from './Smart-Can-SignedOutLinks';

const Nav = (props) => {
    return (
        <div>
            <Navbar className="nsbe-menu" color="light" opacity="0.2">
            <NavbarBrand className="wText" href="/"> 
            <i class="fas fa-dumpster-fire"></i>
              <b> Smart Can </b>
            </NavbarBrand>
            <SignedOutLinks></SignedOutLinks>
          </Navbar>
        </div>
    )
}


export default Nav
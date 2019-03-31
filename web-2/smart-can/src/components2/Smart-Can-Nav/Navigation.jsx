import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import SignedOutLinks from './Smart-Can-SignedOutLinks';
import SignedInLinks from './Smart-Can-SignedInLinks';
import { connect } from 'react-redux'
import './navbar.css'

const Nav = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks />;
    return (
        <div>
            <Navbar className="transparent" color="faded">
            <NavbarBrand className="wText" href="/"> 
            <i class="fas fa-dumpster-fire white"></i>
              <b> Smart Can </b>
            </NavbarBrand>
            { links }
          </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Nav)

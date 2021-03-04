import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Meteor} from 'meteor/meteor';

const Navigation = () => {
    const logout = () => Meteor.logout()
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">ListShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Lists</Nav.Link>
            <Nav.Link href="/notebooks">Notebooks</Nav.Link>
          </Nav>
          <Nav>
        
            <Nav.Link onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
}

export default Navigation

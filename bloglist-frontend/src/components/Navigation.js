import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = ({ padding, handleLogout, user }) => {
    return (
        <div>
            <Navbar
                collapseOnSelect
                expand='lg'
                bg='primary'
                variant='dark'
                style={{ width: '100%' }}
            >
                <Navbar.Brand variant='primary'>Bloglist App</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responseive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='#' as='span'>
                            <Link style={padding} to='/'>
                                home
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link style={padding} to='/users'>
                                users
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link style={padding} to='/blogs'>
                                blogs
                            </Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            {user.name} is logged in{' '}
                            <Button variant='secondary' onClick={handleLogout} size='sm'>
                                Logout
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation

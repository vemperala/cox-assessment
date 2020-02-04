import React from 'react';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
    
    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    };
    `;

    export const NavigationBar = () => (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">COX ASSESSMENT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link href="/">Stores List
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/create"> Create a store
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </Styles>
    )
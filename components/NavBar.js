/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Nav>
          <Image src="/logo.png" alt="latiphinics" className=" logo" style={{ height: '40px', width: '40px', backgroundColor: 'transparent' }} />
          <Link passHref href="/">
            <Navbar.Brand>LatiPhonics</Navbar.Brand>
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/sounds">
              <Nav.Link>Sounds</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>My List</Nav.Link>
            </Link>

          </Nav>
          <Nav style={{ alignContent: 'flex-end' }}>
            <Image
              src={user.photo}
              alt="latiphinics"
              className=" logo"
              style={{
                height: '40px', width: '40px', backgroundColor: 'transparent', borderRadius: '20px',
              }}
            />

            <Link passHref href="/profile">
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

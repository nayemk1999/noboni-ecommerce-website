import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { UserContext } from "../../../App";
import ProfilePopper from '../../ProfilePaper/ProfilePopper'
import "./NavBar.css";

const NavBar = () => {
  // const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isSticky, setSticky] = useState(false);
  const [isCollapsed, setCollapsed] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  return (
    <Navbar
      expand="lg"
      className={
        isSticky || isCollapsed
          ? "slide in py-2 show shadow navbar navbar-expand-sm bg-light navbar-light fixed-top"
          : "slide out show navbar-expand-sm navbar-light py-2 fixed-top "
      }
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            className=""
            style={{ height: "33px", width: "43px" }}
            src="https://www.graphicsprings.com/filestorage/stencils/0b9e79b37796b4f9200d26edfa127d19.png?width=500&height=500"
          />
          <strong class="colornav">TOPRAK</strong>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setCollapsed(!isCollapsed ? "show" : null)}
          aria-controls="basic-navbar-nav"
          style={{ background: "rgb(199 199 199 / 75%)", marginRight: "7px" }}
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className="mr-2 h5  nav-link">
              <strong class="colornav">Home</strong>
            </Nav.Link>
            <Nav.Link href="#buy" className="mr-2 h5 nav-link">
              <strong class="colornav">Buy</strong>
            </Nav.Link>
            <Nav.Link href="#rent" className="mr-2 h5 nav-link">
              <strong class="colornav">Rent</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/sold" className="mr-2 h5 nav-link">
              <strong class="colornav">Sold</strong>
            </Nav.Link>
            <Nav.Link
              as={Link}
              // style={{ marginRight: "30px" }}
              to="/dashboard/profile"
              className="h5 nav-link"
            >
              <strong class="colornav">Dashboard</strong>
            </Nav.Link>
          </Nav>
          <div>
            
              <ProfilePopper />
              
              {/* <Nav.Link style={{ marginLeft: "20px" }} className='h5 colornav' as={Link} to="/login" >
                Login
              </Nav.Link> */}
           
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

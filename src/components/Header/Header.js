
import { AccountCircle } from '@material-ui/icons';
import { useContext } from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import logo from "../../images/logo.png";
import './Header.css'




const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = () => {
        setLoggedInUser({});
    }
    return (
        <div className='header'>
            <img src={logo} alt="" />

            <Navbar className="navber-menu" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navber-item">
                        <Link to="/shop">Shop</Link>
                        <Link to="/order-reviews">Order-Review</Link>
                        <Link to="/manage-inventory">Manage-Inventory</Link>
                        <NavDropdown title={loggedInUser.email ? <img className='profile' src={loggedInUser.photo} alt="" /> : <AccountCircle />} id="basic-nav-dropdown">  
                            {
                               loggedInUser.email && <Link to="/login" style={{ color: 'black' }} onClick={signOut}>Sign Out</Link>
                            }
                            <NavDropdown.Divider />
                            {
                                !loggedInUser.email && <Link to="/login" style={{ color: 'black' }} >Login</Link>
                            }
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;



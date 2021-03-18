import { useContext } from 'react';
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
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/order-reviews">Order-Review</Link>
                <Link to="/manage-inventory">Manage-Inventory</Link>
                <Link to="" onClick ={signOut}>Sign Out</Link>
            </nav>
           
        </div>
    );
};

export default Header;
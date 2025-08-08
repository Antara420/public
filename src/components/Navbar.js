import './navbar.css';
import logo6 from '../slike/ikona/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import Adresa from './Adresa';
import Pocetna from './Pocetna';
import Prijava from './Prijava';
import Registracija from './Registracija';
import { useCart } from './CartContext';

const Navbar = () => {
  const {kosarica}=useCart();
    const { user, logout } = useAuth();

    return (
    <div className='nav'>
      <div className='nav-logo'>
        <Link to="/"><img src={logo6} className='logo' alt="Logo" /></Link>
      </div>

      <div>
        <ul className='nav-menu'>
          <li><Link to="/">Shop</Link></li>
          <li><Link to="/adresa">Adresa</Link></li>
          <li><Link to="/kosarica">Košarica({kosarica.length})</Link></li>

          {user ? (
            <>
              <li className='nav-user'>Pozdrav, {user.displayName || user.email}</li>
              <li><button className='logout-button' onClick={logout}>Odjavi se</button></li>
            </>
          ) : (
            <li className='nav-contact'><Link to="/Prijava">Prijava</Link></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
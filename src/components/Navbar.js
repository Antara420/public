import './navbar.css';
import logo6 from '../slike/ikona/logo.png';
import { Link } from 'react-router-dom';
import Adresa from './Adresa.js';
import Kontakt from './Kontakt.js';
import Pocetna from './Pocetna.js';

const Navbar = () => {
    return(
        <div className='nav'>
            <div className='nav-logo'>
                <Link to="/"><img src={logo6} className='logo' alt="Logo" /></Link>
</div>
            
           <div>
             <ul className='nav-menu'>
                 <li><Link to="/">Shop</Link></li>
                 <li><Link to="/Adresa">Adresa</Link></li>
                 <li className='nav-contact'><Link to="/Kontakt">Kontakt</Link></li>
            </ul>
           </div>
        </div>
    );
}
export default Navbar;
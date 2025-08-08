import './proizvod.css';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

function Prijava() {
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ PRIJAVA
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, lozinka);
      navigate('/'); // nakon uspješne prijave 
    } catch (err) {
      setError('Neuspješna prijava. Provjerite podatke.');
      console.error('Greška pri prijavi:', err.message);
    }
  };

  // ✅ RESET LOZINKE
  const handleResetLozinke = async () => {
    if (!email) {
      alert("Unesite svoj email kako bismo vam mogli poslati link za resetiranje.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email za resetiranje lozinke je poslan!");
    } catch (err) {
      console.error("Greška kod resetiranja lozinke:", err);
      alert("Greška kod slanja e-maila. Provjerite jeste li unijeli ispravan email.");
    }
  };

  return (
    <div className='page-layout'>
      <h1 style={{ color: 'white' }}>Pronađite nas</h1>

      <div className='cigla-wrap'>
        <div className='cigla'>
          <div className='levi'>
            <h2>Prijavi se</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor='email'><strong>Email:</strong></label><br />
              <input
                placeholder='Vaš e-mail'
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />

              <label htmlFor='lozinka'><strong>Lozinka:</strong></label><br />
              <input
                placeholder='*******'
                type='password'
                id='lozinka'
                name='lozinka'
                value={lozinka}
                onChange={(e) => setLozinka(e.target.value)}
                required/>
              <br />

              <button className='slatkis' type='submit'>Prijava</button>
              <button type="button" onClick={handleResetLozinke} className="slatkis">Zaboravljena lozinka?</button>

              {error && <p className="error">{error}</p>}
            </form>
          </div>

          <div className='desni'>
            <h2>Nemaš račun?</h2>
            <h3>Registriraj se</h3>
            <Link to="/registracija" >
              <button style={{ marginLeft: '225px' }} className='slatkis'>Registracija</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='site-footer'>
        &copy; 2025. Sva prava pridržana.
      </div>
    </div>
  );
}

export default Prijava;

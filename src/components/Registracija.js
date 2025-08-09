import './proizvod.css';
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Registracija() {
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdaLozinke, setPotvrdaLozinke] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegistracija = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (lozinka !== potvrdaLozinke) {
      setError('Lozinke se ne podudaraju.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, lozinka);
      await updateProfile(userCredential.user, { displayName: ime });
      setSuccess('Registracija uspješna!');
      setIme('');
      setEmail('');
      setLozinka('');
      setPotvrdaLozinke('');
      setTimeout(()=>{
        navigate('/');
      },1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='page-layout'>
      <h1 style={{color:'white'}}>Pronađite nas</h1>

      <div className='cigla-wrap'>
        <div className='cigla'>
          
          <div style={{alignItems:'space-around', display:'block'}}>
            <h2 >Registracija</h2><br/><br/>
            <form onSubmit={handleRegistracija}>
              <label htmlFor='ime'><strong>Ime:</strong></label><br/>
              <input
                placeholder='Vaše ime'
                type='text'
                id='ime'
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
              /><br/>
              <label htmlFor='email'><strong>Email:</strong></label><br/>
              <input
                placeholder='Vaš e-mail'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /><br/>
              <label htmlFor='lozinka'><strong>Lozinka:</strong></label><br/>
              <input
                placeholder='*****'
                type='password'
                id='lozinka'
                value={lozinka}
                onChange={(e) => setLozinka(e.target.value)}
                required
              /><br/>
              <label htmlFor='potvrdaLozinke'><strong>Potvrdi lozinku:</strong></label><br/>
              <input
                placeholder='*****'
                type='password'
                id='potvrdaLozinke'
                value={potvrdaLozinke}
                onChange={(e) => setPotvrdaLozinke(e.target.value)}
                required
              /><br/>
              <button className='slatkis' type='submit'>Registriraj se</button>
              {error && <p className='error'>{error}</p>}
              {success && <p className='success'>{success}</p>}
            </form>
          </div>
        </div>
      </div>

      <div className='site-footer'>
        &copy; 2025. Sva prava pridržana.
      </div>
    </div>
  );
}

export default Registracija;

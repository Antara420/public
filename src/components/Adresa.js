import './kosara.css';

function Adresa(){
    return(
       <div class="cigla-wrap">
        <h1>Pronađite nas</h1>
           <div className='main-content'>
                
           
               <div className='cigla-wrap'>
                
                   <div className='kosara'>
                     
                     <div class="ciglica">
                         <div style={{ height: '550px', width: '350px', padding: '20px', gap: '50px', fontSize: '20px' }}>
                                        <h2 style={{color:'black'}}>Adresa</h2>
                                             <p>Pronađite nas nas adresi <br/> Rimska 15, 44000 Sisak <br/> Radno vrijeme: Pon - Pet <br/> 08:15 - 16:00 </p>
                               </div>
                               <div style={{ height: '550px', width: '350px', padding: '20px', float:'right', marginLeft:'480px', fontSize:'20px' }}>
                                             <h2 style={{color:'black'}}>Kontakt</h2>
                                             <p>Tel: 044 420 420</p>
                                             <p>scooterino@biznis.com</p>
                               </div>
                     </div>
                   </div>
               </div>
            <div className='site-footer'>
                &copy; 2025. Sva prava pridržana.
            </div>
           
           </div>
       </div>
    )
}
export default Adresa;
import './proizvod.css';

function Adresa(){
    return(
       <div className='page-layout'>
            <h1>Pronađite nas</h1>
            

           <div className='cigla-wrap'>
               <div className='cigla'>
                 <div className='levi'>
                <h2>Adresa</h2>
                <p>Pronađite nas nas adresi <br/> Rimska 15, 44000 Sisak <br/> Radno vrijeme: Pon - Pet <br/> 08:15 - 16:00 </p>
                       </div>
               
               
                       <div className='desni'>
                <h2>Kontakt</h2>
                <p>Tel: 044 420 420</p>
                <p>scooterino@biznis.com</p>
                       </div>
               </div>
           </div>


        <div className='footer'>
            &copy; 2025. Sva prava pridržana.
        </div>

        
       </div>
    )
}
export default Adresa;
import {Container, Navbar, Text, Button} from '@nextui-org/react';

export default function Footer() {
  return (
    <div className='footerContainer'>
      <div className="row footerMain">
        <div className='col-8 alignCenter'>
          <h2>Ecommerce</h2>
          <div className='footerContactDetailsHeader'>
            <span>Contact Us:</span>
            </div>
            <div className='footerContactDetails'>
            <span>Telephone: <a className='footerLinks' href="tel:15906430926">+49 15906430926</a></span>
            </div>
            <div className='footerContactDetailsEmail'>
            <span>Email to: <a className='footerLinks' href = "mailto: pranavjayanayak@gmail.com">pranavjayanayak@gmail.com</a></span>
            </div>
        </div>
        <div className='col-4 alignCenter'>
          <p> <br/>Address: <br/>Besselstraße 5-7,  Mannheim  68219,<br/> baden württemberg, Germany 69123</p>
        </div>
      </div>
    </div>
  )
}

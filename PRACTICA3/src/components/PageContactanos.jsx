import React from 'react';
import '../styles/Contactanos.css';
import emailjs from '@emailjs/browser';

function PageContactanos() {
  
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm("service_dc8wd2j", "template_wi74xoh", event.target, "HzbKWKbh_CgF2RBKC")
    .then(Response=> console.log(Response))
    .catch(error => console.log(error))
  }
  return ( 

    <div className='body-contactanos'>
      <h1 className='title-form'>Contact Us</h1>
      <form className='form-mail' onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name='user_name' />
        <hr />

        <label>Email</label>
        <input type="email" name='user_email' />
        <hr />

        <label>Message</label>
        <textarea name="user_message" id="" cols="30" rows="10"></textarea>
        <hr />
        <button>Send</button>
      </form>
    </div>
  )
}

export default PageContactanos;


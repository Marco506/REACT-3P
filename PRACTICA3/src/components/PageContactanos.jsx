import React, { useState } from 'react';
import '../styles/Contactanos.css';

function PageContactanos() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del formulario, por ejemplo, con una API
    alert('Mensaje enviado!');
    // Resetear el formulario después del envío
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contactanos-container" id="contactanos-container">
      <h1 id="contactanos-title">Contáctanos</h1>
      <form onSubmit={handleSubmit} className="contactanos-form" id="contactanos-form">
        <div className="form-group" id="form-group-name">
          <label htmlFor="name" id="name-label">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group" id="form-group-email">
          <label htmlFor="email" id="email-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group" id="form-group-message">
          <label htmlFor="message" id="message-label">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="submit-button" id="submit-button">Enviar</button>
      </form>
    </div>
  );
}

export default PageContactanos;


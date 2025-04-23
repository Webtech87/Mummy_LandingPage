import React, { useState } from 'react';
import '../../styles/components/contact-form.css';

interface FormValues {
  name: string;
  subject: string;
  phone: string;
  email: string;
  message: string;
  privacyPolicy: boolean;
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    subject: '',
    phone: '',
    email: '',
    message: '',
    privacyPolicy: false
  });
  
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormValues]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Clear error when user checks the box
    if (formErrors[name as keyof FormValues]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormValues> = {};
    
    if (!formValues.name.trim()) {
      errors.name = true;
    }
    
    if (!formValues.subject) {
      errors.subject = true;
    }
    
    if (!formValues.phone.trim()) {
      errors.phone = true;
    }
    
    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = true;
    }
    
    if (!formValues.privacyPolicy) {
      errors.privacyPolicy = true;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form submission logic here
      console.log('Form submitted:', formValues);
      
      // Reset form after submission
      setFormValues({
        name: '',
        subject: '',
        phone: '',
        email: '',
        message: '',
        privacyPolicy: false
      });
      
      // Show success message or redirect
      alert('Mensagem enviada com sucesso!');
    }
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <h2 className="contact-form-title">Fale Conosco</h2>
        <p className="contact-form-description">
          Por favor, preencha o formulário abaixo para entrar
          em contacto com a nossa equipa.
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className={formErrors.name ? 'error' : ''}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Assunto</label>
            <select
              id="subject"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              className={formErrors.subject ? 'error' : ''}
              required
            >
              <option value="" disabled>Assunto</option>
              <option value="informacao">Informação</option>
              <option value="agendamento">Agendamento</option>
              <option value="precos">Preços</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Telefone*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="+351 000-000-000"
                className={formErrors.phone ? 'error' : ''}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Seu email"
                className={formErrors.email ? 'error' : ''}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows={6}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className={`checkbox-container ${formErrors.privacyPolicy ? 'checkbox-error' : ''}`}>
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formValues.privacyPolicy}
                onChange={handleCheckboxChange}
                required
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">
                Li e aceito a <a href="/politica-privacidade">Política de Privacidade</a>
              </span>
            </label>
          </div>
          
          <button type="submit" className="submit-button">ENVIAR</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
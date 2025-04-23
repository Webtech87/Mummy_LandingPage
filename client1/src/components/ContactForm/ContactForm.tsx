import React, { useState } from 'react';
import '../../styles/components/contact-form.css';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    privacyPolicy: false
  });
  
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof FormValues]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target as HTMLInputElement;
    setFormValues(prev => ({
      ...prev,
      [name]: checked
    }));
    
    if (formErrors[name as keyof FormValues]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    
    if (!formValues.name.trim()) {
      errors.name = 'O campo nome é obrigatório.';
    }
    
    if (!formValues.phone.trim()) {
      errors.phone = 'O campo telefone é obrigatório.';
    }
    
    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Por favor, insira um email válido.';
    }
    
    if (!formValues.subject) {
      errors.subject = 'O campo assunto é obrigatório.';
    }
    
    if (!formValues.privacyPolicy) {
      errors.privacyPolicy = 'Você deve aceitar a Política de Privacidade.' as string;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formValues);
        
        // Reset form after submission
        setFormValues({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          privacyPolicy: false
        });
        
        // Show success message
        alert('Mensagem enviada com sucesso!');
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
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
        
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nome*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className={formErrors.name ? 'error' : ''}
              required
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
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
                placeholder="+351 000 000 000"
                className={formErrors.phone ? 'error' : ''}
                required
              />
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={formErrors.email ? 'error' : ''}
                required
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Assunto*</label>
            <select
              id="subject"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              className={formErrors.subject ? 'error' : ''}
              required
            >
              <option value="" disabled>Selecione um assunto</option>
              <option value="informacao">Informação</option>
              <option value="agendamento">Agendamento</option>
              <option value="precos">Preços</option>
              <option value="outro">Outro</option>
            </select>
            {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows={5}
              placeholder="Escreva sua mensagem aqui..."
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
                Li e aceito a <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>*
              </span>
            </label>
            {formErrors.privacyPolicy && <span className="error-message">{formErrors.privacyPolicy}</span>}
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-loader"></span>
            ) : (
              'ENVIAR MENSAGEM'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
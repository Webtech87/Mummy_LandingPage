import React, { useState, useEffect } from 'react';
import '../../styles/components/contact-form.css';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
}

interface FormField {
  type: string;
  label: string;
  required: boolean;
  choices?: Array<{value: string; label: string}>;
  max_length?: number;
  initial?: any;
  placeholder?: string;
  rows?: number;
}

interface FormStructure {
  fields: {
    full_name: FormField;
    email: FormField;
    phone: FormField;
    objective: FormField;
    question_text: FormField;
    accept: FormField;
  }
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
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formStructure, setFormStructure] = useState<FormStructure | null>(null);

  // Fetch form structure from the backend
  useEffect(() => {
    const fetchFormStructure = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/');
        if (response.ok) {
          const data = await response.json();
          setFormStructure(data.form_structure);
          console.log("Form structure from server:", data.form_structure);
        }
      } catch (error) {
        console.error('Error fetching form structure:', error);
      }
    };
    
    fetchFormStructure();
  }, []);

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
      setFormStatus('idle');
      
      try {
        // Get valid objective values from form structure if available
        let objectiveValue = formValues.subject;
        
        // If we have form structure from the server, try to match the objective value
        if (formStructure && formStructure.fields.objective.choices) {
          const validChoices = formStructure.fields.objective.choices.map(choice => choice.value);
          console.log("Valid objective choices:", validChoices);
          
          // If the current value isn't valid, try to find a close match
          if (!validChoices.includes(objectiveValue)) {
            if (objectiveValue === 'preco' && validChoices.includes('precos')) {
              objectiveValue = 'precos';
            } else if (objectiveValue === 'precos' && validChoices.includes('preco')) {
              objectiveValue = 'preco';
            } else if (objectiveValue === 'agendamento' && validChoices.includes('procedimentos')) {
              objectiveValue = 'procedimentos';
            } else if (validChoices.length > 0) {
              // Fall back to the first valid choice if no match
              objectiveValue = validChoices[0];
            }
          }
        }
        
        console.log("Sending form with objective value:", objectiveValue);
        
        // Send data to your Django backend
        const response = await fetch('http://localhost:8000/api/v1/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            objective: objectiveValue,
            question_text: formValues.message,
            accept: formValues.privacyPolicy
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Form submitted successfully:', data);
          
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
          setFormStatus('success');
          alert('Mensagem enviada com sucesso!');
        } else {
          console.error('Submission failed:', await response.text());
          setFormStatus('error');
          alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setFormStatus('error');
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get the valid objective choices from the backend if available
  const getSelectOptions = () => {
    if (formStructure && formStructure.fields.objective.choices) {
      return formStructure.fields.objective.choices.map(choice => (
        <option key={choice.value} value={choice.value}>
          {choice.label}
        </option>
      ));
    }
    
    // Fallback options if server data isn't available
    return (
      <>
        <option value="informacao">Informação</option>
        <option value="procedimentos">Procedimentos</option>
        <option value="precos">Preços</option>
        <option value="outro">Outro</option>
      </>
    );
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <h2 className="contact-form-title">Fale Conosco</h2>
        <p className="contact-form-description">
          Por favor, preencha o formulário abaixo para entrar
          em contacto com a nossa equipa.
        </p>
        
        {formStatus === 'success' && (
          <div className="form-success-message">
            Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.
          </div>
        )}
        
        {formStatus === 'error' && (
          <div className="form-error-message">
            Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
          </div>
        )}
        
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
              {getSelectOptions()}
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
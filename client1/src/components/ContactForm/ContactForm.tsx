import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/contact-form.css';
import { useTranslation} from "react-i18next";

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
  
  // Refs para as mensagens de sucesso e erro
  const successMessageRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<HTMLDivElement>(null);

  // Efeito para rolar até a mensagem quando o status do formulário muda
  useEffect(() => {
    if (formStatus === 'success' && successMessageRef.current) {
      // Rolagem suave até a mensagem de sucesso
      successMessageRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
    
    if (formStatus === 'error' && errorMessageRef.current) {
      // Rolagem suave até a mensagem de erro
      errorMessageRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [formStatus]);

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
      errors.name = t("empty_fields.name");
    }

    if (!formValues.phone.trim()) {
      errors.phone = t("empty_fields.phone");
    }

    if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = t("empty_fields.email");
    }

    if (!formValues.subject) {
      errors.subject = t("empty_fields.subject");
    }

    if (!formValues.privacyPolicy) {
      errors.privacyPolicy = t("empty_fields.acepted");
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
        } else {
          console.error('Submission failed:', await response.text());
          setFormStatus('error');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setFormStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const {t} = useTranslation();
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
        <option value="informacao">{t("contact_form.fields.subject.options.1")}</option>
        <option value="procedimentos">{t("contact_form.fields.subject.options.2")}</option>
        <option value="precos">{t("contact_form.fields.subject.options.3")}</option>
        <option value="outro">{t("contact_form.fields.subject.options.4")}</option>
      </>
    );
  };
  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <h2 className="contact-form-title">{t("contact_form.title")}</h2>
        <p className="contact-form-description">
          {t("contact_form.p")}
        </p>

        {formStatus === 'success' && (
          <div className="form-success-message" ref={successMessageRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="success-icon"
            >
              <path
                fillRule="evenodd"
                d="M22.65 12.53l-7.5 7.5a1.5 1.5 0 01-2.12 0l-7.5-7.5a1.5 1.5 0 012.12-2.12l6.4 6.4 6.4-6.4a1.5 1.5 0 012.12 2.12z"
                clipRule="evenodd"
              />
            </svg>
            {t("contact_form.msg.success")}
          </div>
        )}

        {formStatus === 'error' && (
          <div className="form-error-message" ref={errorMessageRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="error-icon"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.077-2 5.232 0l6.25 10.875c1.155 2-0.118 4.5-2.616 4.5H6.767c-2.498 0-3.771-2.5-2.616-4.5l6.25-10.875zM12 6.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-3.75zM12 15a.75.75 0 10-1.5 0v-1.5a.75.75 0 001.5 0v1.5z"
                clipRule="evenodd"
              />
            </svg>
            {t("contact_form.msg.error")}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">{t("contact_form.fields.name.title")}*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder={t("contact_form.fields.name.ph")}
              className={formErrors.name ? 'error' : ''}
              required
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">{t("contact_form.fields.phone")}*</label>
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
            <label htmlFor="subject">{t("contact_form.fields.subject.title")}*</label>
            <select
              id="subject"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              className={formErrors.subject ? 'error' : ''}
              required
            >
              <option value="" disabled>{t("contact_form.fields.subject.options.0")}</option>
              {getSelectOptions()}
            </select>
            {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">{t("contact_form.fields.msg.title")}</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows={5}
              placeholder={t("contact_form.fields.msg.ph")}
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
                {t("contact_form.fields.acept_p_t.0")} <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">{t("contact_form.fields.acept_p_t.1")}</a>*
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
                t("contact_form.sbm_button")
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
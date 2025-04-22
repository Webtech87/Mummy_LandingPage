// src/components/ContactForm/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  FormContainer, 
  FormTitle, 
  FormDescription,
  StyledForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  SubmitButton 
} from './ContactForm.styles';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Send form data to your backend here
  };
  
  return (
    <FormContainer id="contact">
      <div className="container">
        <FormTitle>Contact Us</FormTitle>
        <FormDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </FormDescription>
        
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" {...register('phone')} />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" rows={5} {...register('message')} />
            {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit">Send Message</SubmitButton>
        </StyledForm>
      </div>
    </FormContainer>
  );
};

export default ContactForm;
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewsletterForm } from './NewsletterForm';
import '@testing-library/jest-dom';

describe('NewsletterForm', () => {
  it('renders email input and subscribe button', () => {
    render(<NewsletterForm />);
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe to newsletter/i })).toBeInTheDocument();
  });

  it('displays error message for invalid email', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('displays error message for empty email', async () => {
    render(<NewsletterForm />);
    
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /subscribing/i })).toBeInTheDocument();
    });
  });

  it('shows success message after successful submission', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('resets form after successful submission', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    }, { timeout: 2000 });
  });

  it('clears error when user types', () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    // Trigger error
    fireEvent.click(button);
    
    // Type to clear error
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
  });

  it('displays privacy notice with link', () => {
    render(<NewsletterForm />);
    
    expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    // Tab to input
    input.focus();
    expect(input).toHaveFocus();
    
    // Tab to button
    button.focus();
    expect(button).toHaveFocus();
  });

  it('validates email format correctly', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    // Test valid email
    fireEvent.change(input, { target: { value: 'valid@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    render(<NewsletterForm />);
    
    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: /subscribe to newsletter/i });
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });
});

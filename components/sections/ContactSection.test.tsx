import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from './ContactSection';
import { CONTACT_INFO } from '@/lib/constants';

// Mock the FadeIn component to avoid animation complexity in tests
jest.mock('@/components/animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ContactSection', () => {
  it('renders the section heading', () => {
    render(<ContactSection />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('displays section description', () => {
    render(<ContactSection />);
    expect(
      screen.getByText(/Ready to create an unforgettable event/i)
    ).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });

  it('displays contact form with all fields', () => {
    render(<ContactSection />);
    expect(screen.getByText('Send Us a Message')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('has submit button that is disabled when form is invalid', () => {
    render(<ContactSection />);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('displays contact information heading', () => {
    render(<ContactSection />);
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  it('displays email information with link', () => {
    render(<ContactSection />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    const emailLink = screen.getByText(CONTACT_INFO.email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_INFO.email}`);
  });

  it('displays phone information with link', () => {
    render(<ContactSection />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    const phoneLink = screen.getByText(CONTACT_INFO.phone);
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute(
      'href',
      `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`
    );
  });

  it('displays address information', () => {
    render(<ContactSection />);
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(CONTACT_INFO.address)).toBeInTheDocument();
  });

  it('uses responsive layout classes', () => {
    const { container } = render(<ContactSection />);
    const gridContainer = container.querySelector('.grid-cols-1.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  it('displays contact icons with correct styling', () => {
    const { container } = render(<ContactSection />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(3); // Email, Phone, Address icons
  });

  describe('Form Submission Flow', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('shows loading state during form submission', async () => {
      const user = userEvent.setup({ delay: null });
      render(<ContactSection />);

      // Fill in the form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), '+1234567890');
      await user.selectOptions(screen.getByLabelText(/event type/i), 'wedding');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('displays success message after valid submission', async () => {
      const user = userEvent.setup({ delay: null });
      render(<ContactSection />);

      // Fill in the form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), '+1234567890');
      await user.selectOptions(screen.getByLabelText(/event type/i), 'wedding');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      });
    });

    it('resets form after 3 seconds', async () => {
      const user = userEvent.setup({ delay: null });
      render(<ContactSection />);

      // Fill in the form
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      await user.type(nameInput, 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), '+1234567890');
      await user.selectOptions(screen.getByLabelText(/event type/i), 'wedding');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      });

      // Fast-forward 3 seconds
      jest.advanceTimersByTime(3000);

      // Check that form is reset
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument();
      });
    });
  });
});

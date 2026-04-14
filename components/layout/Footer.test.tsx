import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { COMPANY_INFO, CONTACT_INFO } from '@/lib/constants';

describe('Footer', () => {
  it('renders company name', () => {
    render(<Footer />);
    const companyName = COMPANY_INFO.name.split(' ')[0];
    expect(screen.getByText(companyName)).toBeInTheDocument();
  });

  it('renders company tagline', () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY_INFO.tagline)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(CONTACT_INFO.email)).toBeInTheDocument();
    expect(screen.getByText(CONTACT_INFO.phone)).toBeInTheDocument();
    expect(screen.getByText(CONTACT_INFO.address)).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY_INFO.copyright)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Follow us on Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Facebook')).toBeInTheDocument();
  });

  it('has correct email link', () => {
    render(<Footer />);
    const emailLink = screen.getByLabelText(`Email us at ${CONTACT_INFO.email}`);
    expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT_INFO.email}`);
  });

  it('has correct phone link', () => {
    render(<Footer />);
    const phoneLink = screen.getByLabelText(`Call us at ${CONTACT_INFO.phone}`);
    expect(phoneLink).toHaveAttribute('href', `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`);
  });

  it('social media links open in new tab', () => {
    render(<Footer />);
    const instagramLink = screen.getByLabelText('Follow us on Instagram');
    const linkedinLink = screen.getByLabelText('Follow us on LinkedIn');
    const facebookLink = screen.getByLabelText('Follow us on Facebook');

    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom-class" />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('custom-class');
  });

  it('has proper semantic structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('Footer')).toHaveClass('sr-only');
  });
});

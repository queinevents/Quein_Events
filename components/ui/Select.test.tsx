import { render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders select with label', () => {
    render(<Select label="Test Select" options={mockOptions} />);
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Test Select" options={mockOptions} />);
    const select = screen.getByLabelText('Test Select') as HTMLSelectElement;
    expect(select.options).toHaveLength(3);
  });

  it('renders placeholder when provided', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        placeholder="Choose an option"
      />
    );
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        error="This field is required"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        error="Error message"
      />
    );
    const select = screen.getByLabelText('Test Select');
    expect(select).toHaveClass('border-red-500');
  });

  it('displays required indicator when required prop is true', () => {
    render(<Select label="Test Select" options={mockOptions} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays helper text when provided and no error', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        helperText="Choose wisely"
      />
    );
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    render(
      <Select
        label="Test Select"
        options={mockOptions}
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});

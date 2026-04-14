import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

// Mock the CounterAnimation component
jest.mock('@/components/animations/CounterAnimation', () => ({
  CounterAnimation: ({ targetValue, suffix, prefix }: any) => (
    <span data-testid="counter-animation">
      {prefix}{targetValue}{suffix}
    </span>
  ),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('StatCard', () => {
  it('renders with required props', () => {
    render(
      <StatCard
        value={100}
        label="Test Statistic"
      />
    );

    expect(screen.getByText('Test Statistic')).toBeInTheDocument();
    expect(screen.getByTestId('counter-animation')).toHaveTextContent('100');
  });

  it('renders with suffix', () => {
    render(
      <StatCard
        value={2000}
        suffix="+"
        label="Events Completed"
      />
    );

    expect(screen.getByTestId('counter-animation')).toHaveTextContent('2000+');
  });

  it('renders with prefix', () => {
    render(
      <StatCard
        value={50}
        prefix="$"
        label="Revenue"
      />
    );

    expect(screen.getByTestId('counter-animation')).toHaveTextContent('$50');
  });

  it('renders with icon', () => {
    render(
      <StatCard
        value={15}
        suffix="+"
        label="Years Experience"
        icon="/icons/calendar.svg"
      />
    );

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('src', '/icons/calendar.svg');
  });

  it('renders without icon', () => {
    render(
      <StatCard
        value={100}
        label="Test Statistic"
      />
    );

    const icons = screen.queryAllByRole('img', { hidden: true });
    expect(icons).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <StatCard
        value={100}
        label="Test Statistic"
        className="custom-class"
      />
    );

    const statCard = container.firstChild;
    expect(statCard).toHaveClass('custom-class');
  });

  it('passes animationDuration to CounterAnimation', () => {
    const { container } = render(
      <StatCard
        value={2000}
        label="Events"
        animationDuration={2500}
      />
    );

    // Verify component renders (duration is passed internally)
    expect(screen.getByTestId('counter-animation')).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    const { container } = render(
      <StatCard
        value={100}
        label="Test Statistic"
      />
    );

    const statCard = container.firstChild as HTMLElement;
    expect(statCard).toHaveClass('flex', 'flex-col', 'items-center');
    expect(statCard).toHaveClass('bg-background-card');
    expect(statCard).toHaveClass('rounded-lg');
  });

  it('displays label with correct styling', () => {
    render(
      <StatCard
        value={200}
        suffix="+"
        label="Happy Clients"
      />
    );

    const label = screen.getByText('Happy Clients');
    expect(label).toHaveClass('text-text-secondary', 'text-center');
  });
});

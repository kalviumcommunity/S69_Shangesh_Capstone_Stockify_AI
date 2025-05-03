import React from 'react';
import { render, screen } from '@testing-library/react';
import MainSection from '../../../components/Home/MainSection';

// Mocking the react-router-dom's Link component
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

describe('MainSection Component', () => {
  const renderMainSection = () => {
    return render(<MainSection />);
  };

  test('renders the main heading', () => {
    renderMainSection();
    
    expect(screen.getByText('One place for all your')).toBeInTheDocument();
    expect(screen.getByText('investment')).toBeInTheDocument();
  });

  test('renders the subheading text', () => {
    renderMainSection();
    
    const subheading = screen.getByText('Invest in 1000+ equities for real-time Insights and reporting');
    expect(subheading).toBeInTheDocument();
  });

  test('renders the Get Started button with correct link', () => {
    renderMainSection();
    
    const getStartedButton = screen.getByText('Get Started');
    expect(getStartedButton).toBeInTheDocument();
    
    // Check if the button is wrapped in a Link component that points to dashboard
    const linkElement = getStartedButton.closest('a');
    expect(linkElement).toHaveAttribute('href', '/dashboard');
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';

// Mocking the react-router-dom's Link component
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(<Navbar />);
  };

  test('renders Navbar with logo', () => {
    renderNavbar();
    const logoElement = screen.getByText('Stockify');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders desktop navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  test('renders sign-in button', () => {
    renderNavbar();
    const signInButton = screen.getByText('Sign-in');
    expect(signInButton).toBeInTheDocument();
  });

  test('toggles mobile menu when menu button is clicked', () => {
    renderNavbar();
    
    // Check if the mobile menu is initially not displayed in the document
    const mobileMenuInitial = screen.queryByTestId('mobile-menu');
    expect(mobileMenuInitial).toBeNull();
    
    // Click the mobile menu button
    const menuButton = screen.getByText('☰');
    fireEvent.click(menuButton);
    
    // After click, the mobile menu element should be visible
    const mobileNavs = screen.getAllByRole('navigation');
    expect(mobileNavs.length).toBeGreaterThan(1); // At least two nav elements (desktop + mobile)
    
    // Verify mobile menu is visible by finding elements that should be inside it
    const mobileLinks = screen.getAllByText('Home');
    expect(mobileLinks.length).toBe(2); // Both desktop and mobile links are present
  });
}); 
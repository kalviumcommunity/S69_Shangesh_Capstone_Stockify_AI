import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

// Mock the react-icons
jest.mock('react-icons/fa', () => ({
  FaFacebookF: () => <svg data-testid="facebook-icon" />,
  FaTwitter: () => <svg data-testid="twitter-icon" />,
  FaInstagram: () => <svg data-testid="instagram-icon" />,
  FaGithub: () => <svg data-testid="github-icon" />,
  FaLinkedinIn: () => <svg data-testid="linkedin-icon" />,
}));

describe('Footer Component', () => {
  test('renders the footer with logo text', () => {
    render(<Footer />);
    
    const logoText = screen.getByText('Stockify');
    expect(logoText).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<Footer />);
    
    const copyrightText = screen.getByText('All Rights Reserved © 2025 Stockify™');
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });
}); 
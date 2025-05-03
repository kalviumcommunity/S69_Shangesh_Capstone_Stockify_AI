import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock the child components
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar-component">Navbar Component</div>);
jest.mock('../../components/Home/MainSection', () => () => <div data-testid="main-section-component">MainSection Component</div>);
jest.mock('../../components/Home/Mockup', () => () => <div data-testid="mockup-component">Mockup Component</div>);
jest.mock('../../components/Footer', () => () => <div data-testid="footer-component">Footer Component</div>);
jest.mock('react-ts-tradingview-widgets', () => ({
  TickerTape: () => <div data-testid="ticker-tape-component">TickerTape Component</div>
}));

describe('Home Page', () => {
  test('renders all child components in the correct order', () => {
    render(<Home />);
    
    // Check if all components are rendered
    expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
    expect(screen.getByTestId('ticker-tape-component')).toBeInTheDocument();
    expect(screen.getByTestId('main-section-component')).toBeInTheDocument();
    expect(screen.getByTestId('mockup-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    
    // Check the order of components
    const homeContent = screen.getByTestId('navbar-component').parentElement;
    const children = Array.from(homeContent.children);
    
    expect(children[0]).toBe(screen.getByTestId('navbar-component'));
    expect(children[1]).toBe(screen.getByTestId('ticker-tape-component'));
    expect(children[2]).toBe(screen.getByTestId('main-section-component'));
    expect(children[3]).toBe(screen.getByTestId('mockup-component'));
    expect(children[4]).toBe(screen.getByTestId('footer-component'));
  });
}); 
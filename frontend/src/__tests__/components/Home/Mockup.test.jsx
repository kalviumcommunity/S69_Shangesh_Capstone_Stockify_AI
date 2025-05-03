import React from 'react';
import { render, screen } from '@testing-library/react';
import Mockup from '../../../components/Home/Mockup';

// Mock the image import
jest.mock('../../../assets/Wireframe3.png', () => 'mockup-image-path');

describe('Mockup Component', () => {
  test('renders the mockup image', () => {
    render(<Mockup />);
    
    const mockupImage = screen.getByAltText('mockup');
    expect(mockupImage).toBeInTheDocument();
    expect(mockupImage).toHaveAttribute('src', 'mockup-image-path');
    expect(mockupImage).toHaveClass('w-full');
    expect(mockupImage).toHaveClass('hidden');
    expect(mockupImage).toHaveClass('md:block');
  });
}); 
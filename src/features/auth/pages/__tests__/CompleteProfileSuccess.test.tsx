import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompleteProfileSuccess from '../CompleteProfileSuccess';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CompleteProfileSuccess', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockNavigate.mockClear();
  });

  it('renders the success message and next steps', () => {
    render(
      <BrowserRouter>
        <CompleteProfileSuccess />
      </BrowserRouter>
    );

    // Check for main heading
    expect(screen.getByText('Profile Successfully Completed!')).toBeInTheDocument();
    
    // Check for thank you message
    expect(
      screen.getByText('Thank you for completing your profile with MyBank.')
    ).toBeInTheDocument();
    
    // Check for "What happens next?" section
    expect(screen.getByText('What happens next?')).toBeInTheDocument();
    
    // Check for the three steps
    expect(screen.getByText('Profile Review')).toBeInTheDocument();
    expect(screen.getByText('Account Activation')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText(/Our team will review your profile details/i)).toBeInTheDocument();
    expect(screen.getByText(/Once approved, your account will be activated/i)).toBeInTheDocument();
    expect(screen.getByText(/You can then log in to access your account/i)).toBeInTheDocument();
  });

  it('navigates to login page when "Go to Login" button is clicked', () => {
    render(
      <BrowserRouter>
        <CompleteProfileSuccess />
      </BrowserRouter>
    );
    
    // Find and click the login button
    const loginButton = screen.getByText('Go to Login');
    fireEvent.click(loginButton);
    
    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to home page when "Back to Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <CompleteProfileSuccess />
      </BrowserRouter>
    );
    
    // Find and click the home button
    const homeButton = screen.getByText('Back to Home');
    fireEvent.click(homeButton);
    
    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays the success icon', () => {
    render(
      <BrowserRouter>
        <CompleteProfileSuccess />
      </BrowserRouter>
    );
    
    // Check for the CheckCircleOutlineIcon (this is a bit tricky with MUI icons)
    // We'll check for an SVG element that's likely to be the success icon
    const iconElement = document.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
  });
});

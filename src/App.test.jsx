import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the main app container without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Thoughtful design, mindful construction/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the hero section correctly', () => {
    render(<Hero />);
    expect(screen.getByText(/Transparent pricing/i)).toBeInTheDocument();
  });
});

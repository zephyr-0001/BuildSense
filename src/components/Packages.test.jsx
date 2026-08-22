import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Packages from './Packages';

const mockConfig = {
  packages: [
    {
      id: "bz1_classic_horizon",
      name: "BZ-1 • CLASSIC HORIZON",
      description: "Test description",
      displayStartingRate: 1850,
      features: ["Steel: Test"],
      detailedSections: {}
    }
  ]
};

describe('Packages Component', () => {
  it('renders package cards correctly', () => {
    render(<Packages config={mockConfig} navigateTo={() => {}} />);
    expect(screen.getAllByText(/CLASSIC HORIZON/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
  });
});

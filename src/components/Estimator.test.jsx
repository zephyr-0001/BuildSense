import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Estimator from './Estimator';

const mockConfig = {
  fees: { value: 10 },
  gst: { value: 18 },
  packages: [
    {
      id: "bz1_classic_horizon",
      name: "BZ-1 • CLASSIC HORIZON",
      description: "Test description",
      internalRatePerSqft: 1850,
      displayStartingRate: 1850,
      features: [],
      detailedSections: {}
    },
    {
      id: "bz2_premium_comfort",
      name: "BZ-2 • PREMIUM COMFORT",
      description: "Test description 2",
      internalRatePerSqft: 2050,
      displayStartingRate: 2050,
      features: [],
      detailedSections: {}
    }
  ]
};

describe('Estimator Component', () => {
  it('renders correctly without crashing', () => {
    render(<Estimator config={mockConfig} />);
    expect(screen.getByText(/Quick Estimate/i)).toBeInTheDocument();
  });

  it('calculates cost correctly when area and package are provided without crashing', () => {
    render(<Estimator config={mockConfig} />);
    
    // Select the package
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'bz1_classic_horizon' } });
    
    // Enter area
    const input = screen.getByPlaceholderText('e.g. 2400');
    fireEvent.change(input, { target: { value: '1000' } });

    // The subtotal for 1000 sqft at 1850 is 1,850,000
    // Fees = 10% = 185,000 -> 2,035,000
    // GST = 18% = 366,300 -> Total = 2,401,300
    
    expect(screen.getAllByText('₹24,01,300').length).toBeGreaterThan(0);
  });
});

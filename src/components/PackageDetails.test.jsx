import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PackageDetails from './PackageDetails';

const mockPkg = {
  features: ["Highlight Feature"],
  detailedSections: {
    "Category 1": [
      { title: "Brand", description: "Desc" }
    ]
  }
};

describe('PackageDetails Component', () => {
  it('renders features and expands details', () => {
    render(<PackageDetails pkg={mockPkg} />);
    expect(screen.getByText("Highlight Feature")).toBeInTheDocument();
    
    // Toggle accordion
    const toggle = screen.getByText(/View Full Details/i);
    fireEvent.click(toggle);
    
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });
});

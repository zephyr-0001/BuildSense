import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormattedPackageName from './FormattedPackageName';

describe('FormattedPackageName Component', () => {
  it('formats package names with split colors', () => {
    render(<FormattedPackageName name="BZ-1 • CLASSIC HORIZON" />);
    const parts = screen.getAllByText(/BZ-1|CLASSIC HORIZON/i);
    expect(parts.length).toBeGreaterThan(0);
  });

  it('renders single word names', () => {
    render(<FormattedPackageName name="TestName" />);
    expect(screen.getByText("TestName")).toBeInTheDocument();
  });
});

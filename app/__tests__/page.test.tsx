import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock Next.js dynamic import for the Viewer component
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = () => <div data-testid="mock-viewer">3D Viewer Placeholder</div>;
    return DynamicComponent;
  },
}));

describe('Home Page', () => {
  it('renders the header correctly', () => {
    render(<Home />);

    // Check for title
    expect(screen.getByText('Blockchain CAD/BIM')).toBeInTheDocument();

    // Check for logo 'B'
    expect(screen.getByText('B')).toBeInTheDocument();

    // Check for Connect Wallet button
    expect(screen.getByTestId('connect-button')).toBeInTheDocument();
  });

  it('renders the project explorer section', () => {
    render(<Home />);

    expect(screen.getByText('Project Explorer')).toBeInTheDocument();
    expect(screen.getByText('Cube_A.gltf')).toBeInTheDocument();
    expect(screen.getByText('Structure_Level_1.ifc')).toBeInTheDocument();
  });

  it('renders the asset metadata section', () => {
    render(<Home />);

    expect(screen.getByText('Asset Metadata')).toBeInTheDocument();
    expect(screen.getByText('Hash:')).toBeInTheDocument();
    expect(screen.getByText('0x7f...3a2b')).toBeInTheDocument();
    expect(screen.getByText('Owner:')).toBeInTheDocument();
    expect(screen.getByText('0x12...90AB')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('2.4 MB')).toBeInTheDocument();
  });

  it('renders the register new asset button', () => {
    render(<Home />);

    const button = screen.getByRole('button', { name: /Register New Asset/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the mocked 3D viewer', () => {
    render(<Home />);

    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
  });

  it('renders the footer/status bar', () => {
    render(<Home />);

    expect(screen.getByText('X:')).toBeInTheDocument();
    expect(screen.getByText('Y:')).toBeInTheDocument();
    expect(screen.getByText('Z:')).toBeInTheDocument();
    expect(screen.getByText('Connected to Localhost')).toBeInTheDocument();
  });
});

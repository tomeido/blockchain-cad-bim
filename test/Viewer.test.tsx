import { render, screen } from '@testing-library/react';
import Viewer from '../components/Viewer';

jest.mock('@react-three/fiber', () => ({
  Canvas: () => <div data-testid="canvas" />,
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Stage: () => null,
  Grid: () => null,
}));

test('Viewer renders its mode overlay and 3D canvas', () => {
  render(<Viewer />);
  expect(screen.getByText('Interactive Mode')).toBeInTheDocument();
  expect(screen.getByTestId('canvas')).toBeInTheDocument();
});

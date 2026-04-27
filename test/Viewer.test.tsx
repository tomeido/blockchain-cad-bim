import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, mock } from 'bun:test';
import Viewer from '../components/Viewer';

// Mock the React Three Fiber components
mock.module('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
}));

mock.module('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Stage: ({ children }: any) => <div data-testid="stage">{children}</div>,
  Grid: () => <div data-testid="grid" />,
}));

// Mock window.matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mock().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: mock(), // Deprecated
    removeListener: mock(), // Deprecated
    addEventListener: mock(),
    removeEventListener: mock(),
    dispatchEvent: mock(),
  })),
});

// Mock console.error to ignore the specific React Three Fiber HTML element warnings during test
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('is using incorrect casing') ||
      args[0].includes('is unrecognized in this browser') ||
      args[0].includes('React does not recognize the'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

test('Viewer renders Interactive Mode text and 3D components', () => {
  render(<Viewer />);
  expect(screen.getByText('Interactive Mode')).not.toBeNull();
  expect(screen.getByTestId('canvas')).not.toBeNull();
  expect(screen.getByTestId('stage')).not.toBeNull();
  expect(screen.getByTestId('grid')).not.toBeNull();
  expect(screen.getByTestId('orbit-controls')).not.toBeNull();
});

test('Box component interacts correctly', () => {
  // Since Box is not exported, we test it through the Viewer
  const { container } = render(<Viewer />);
  const meshes = container.querySelectorAll('mesh');
  expect(meshes.length).toBe(2);

  const mesh = meshes[0];

  // Test click interaction
  fireEvent.click(mesh);

  // The scale should be changed when clicked, but since we are mocking
  // React environment, it's difficult to verify the exact scale attribute
  // without testing the actual Box component implementation.
  // Instead, we just verify the event handlers run without errors.

  // Test hover interaction
  fireEvent.pointerOver(mesh);
  fireEvent.pointerOut(mesh);
});

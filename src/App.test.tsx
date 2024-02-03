import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

test('renders example component', () => {
  render(<App />);
  expect(screen.getByText('test')).toBeInTheDocument();
});
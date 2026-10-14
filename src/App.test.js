import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const titleElement = screen.getByText(/cinema/i);
  expect(titleElement).toBeInTheDocument();
});

import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

test('renders checkbox', () => {
  render(<Checkbox />);
  const checkboxElement = screen.getByRole('checkbox');
  expect(checkboxElement).toBeInTheDocument();
});

test('checkbox is unchecked by default', () => {
  render(<Checkbox />);
  const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
  expect(checkboxElement.checked).toBe(false);
});

test('checkbox can be checked', () => {
  render(<Checkbox />);
  const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
  fireEvent.click(checkboxElement);
  expect(checkboxElement.checked).toBe(true);
});

test('checkbox can be unchecked', () => {
  render(<Checkbox defaultChecked />);
  const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
  fireEvent.click(checkboxElement);
  expect(checkboxElement.checked).toBe(false);
});

test('checkbox calls onChange handler', () => {
  const handleChange = jest.fn();
  render(<Checkbox onChange={handleChange} />);
  const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
  fireEvent.click(checkboxElement);
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('checkbox is associated with label', () => {
  render(
    <label htmlFor="test-checkbox">
      Test Checkbox
      <Checkbox id="test-checkbox" />
    </label>
  );
  const labelElement = screen.getByText('Test Checkbox');
  const checkboxElement = screen.getByRole('checkbox');
  expect(labelElement).toBeInTheDocument();
  expect(checkboxElement).toBeInTheDocument();
  expect(labelElement).toHaveAttribute('for', 'test-checkbox');
});

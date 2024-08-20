import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renders input element', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('applies custom styles', () => {
  render(<Input />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveClass('input');
});

test('passes down input attributes', () => {
  const placeholder = 'Enter your name';
  render(<Input placeholder={placeholder} />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('placeholder', placeholder);
});

test('sets the value of the input', () => {
  const value = 'Test value';
  render(<Input defaultValue={value} />);
  const inputElement = screen.getByRole('textbox') as HTMLInputElement;
  expect(inputElement.value).toBe(value);
});

test('calls onChange handler when input value changes', () => {
  const handleChange = jest.fn();
  render(<Input onChange={handleChange} />);
  const inputElement = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'New value' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // Check if the handler is called with an event object
});

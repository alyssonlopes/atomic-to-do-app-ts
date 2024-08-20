import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('button click triggers onClick', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const buttonElement = screen.getByText(/click me/i);
  fireEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('renders button with different text', () => {
  render(<Button>Submit</Button>);
  const buttonElement = screen.getByText(/submit/i);
  expect(buttonElement).toBeInTheDocument();
});

test('button click triggers different onClick handler', () => {
  const handleClick1 = jest.fn();
  const handleClick2 = jest.fn();
  render(<Button onClick={handleClick1}>Click Me</Button>);
  render(<Button onClick={handleClick2}>Submit</Button>);

  const buttonElement1 = screen.getByText(/click me/i);
  const buttonElement2 = screen.getByText(/submit/i);
  fireEvent.click(buttonElement1);
  fireEvent.click(buttonElement2);

  expect(handleClick1).toHaveBeenCalledTimes(1);
  expect(handleClick2).toHaveBeenCalledTimes(1);
});

test('button does not throw error without onClick handler', () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/click me/i);
  fireEvent.click(buttonElement);
  // No assertion needed, just ensuring no error is thrown
});

test('button does not trigger onClick when disabled', () => {
  const handleClick = jest.fn();
  render(
    <Button onClick={handleClick} disabled>
      Click Me
    </Button>
  );
  const buttonElement = screen.getByText(/click me/i);
  fireEvent.click(buttonElement);
  expect(handleClick).not.toHaveBeenCalled();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Button>Click Me</Button>);
  expect(asFragment()).toMatchSnapshot();
});

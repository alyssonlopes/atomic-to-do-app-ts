import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('[Atom] Checkbox Component', () => {
  it('renders checkbox', () => {
    render(<Checkbox />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('checkbox is unchecked by default', () => {
    render(<Checkbox />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkboxElement.checked).toBe(false);
  });

  it('checkbox can be checked', () => {
    render(<Checkbox />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkboxElement);
    expect(checkboxElement.checked).toBe(true);
  });

  it('checkbox can be unchecked', () => {
    render(<Checkbox defaultChecked />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkboxElement);
    expect(checkboxElement.checked).toBe(false);
  });

  it('checkbox calls onChange handler', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkboxElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('checkbox is associated with label', () => {
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
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import MainTemplate from './MainTemplate';

describe('MainTemplate Component', () => {
  it('renders children', () => {
    render(
      <MainTemplate>
        <div>Child Component</div>
      </MainTemplate>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    render(
      <MainTemplate>
        <div>Child Component</div>
      </MainTemplate>
    );

    const container = screen.getByTestId('main-template-container');
    expect(container).toHaveClass('container');
  });
});

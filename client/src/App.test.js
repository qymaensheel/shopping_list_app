import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

import App from './App';

// HOME PAGE TESTS
it('renders main page snapshot', () => {
    const tree = renderer
        .create(<App/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('checks the header', () => {
    render(<App/>);
    const element = screen.getByTestId('header')

    expect(element).toBeInTheDocument()
});

it('checks the header content', () => {
    render(<App/>);
    const element = screen.getByTestId('header')

    expect(element).toHaveTextContent('ShoppingApp')
});

it('checks the button', () => {
    render(<App/>);
    const element = screen.getByTestId('continue-btn')

    expect(element).toBeInTheDocument()
});

it('checks the button content', () => {
    render(<App/>);
    const element = screen.getByTestId('continue-btn')

    expect(element).toHaveTextContent('Please register to continue')
});
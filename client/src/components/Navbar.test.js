import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

import Navbar from "./Navbar";


it('renders navbar correctly snapshot', () => {
    const tree = renderer
        .create(<Navbar/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the navbar unlogged user', () => {
    render(<Navbar/>);
    const nav_home = screen.getByTestId('href-home')
    const nav_register = screen.getByTestId('href-register')
    const nav_login = screen.getByTestId('href-login')

    expect(nav_home).toBeInTheDocument()
    expect(nav_register).toBeInTheDocument()
    expect(nav_login).toBeInTheDocument()
});

it('checks content of navbar unlogged user', () => {
    render(<Navbar/>);
    const nav_home = screen.getByTestId('href-home')
    const nav_register = screen.getByTestId('href-register')
    const nav_login = screen.getByTestId('href-login')

    expect(nav_home).toHaveTextContent('Home')
    expect(nav_register).toHaveTextContent('Register')
    expect(nav_login).toHaveTextContent('Login')
});


// it('checks content of navbar logged user', () => {
//     jest.mock('../auth', () => {
//         return jest.fn(() => ({
//             isLoggedIn: true
//         }))
//     })
//     render(<Navbar/>)
//     const nav_home = screen.getByTestId('href-home')
//     const nav_create = screen.getByTestId('href-create')
//     const nav_logout = screen.getByTestId('href-logout')
//
//     expect(nav_home).toHaveTextContent('Home')
//     expect(nav_create).toHaveTextContent('Register')
//     expect(nav_logout).toHaveTextContent('Login')
//     jest.restoreAllMocks()
// });


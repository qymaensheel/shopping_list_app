import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

import CreateList from "./CreateList";


it('renders create list correctly snapshot', () => {
    const tree = renderer
        .create(<CreateList/>)
        .toJSON()
    expect(tree).toMatchSnapshot();
});

it('checks header of create list', () => {
    render(<CreateList/>);

    const header = screen.getByTestId('create-header')

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Create shopping list')
});

it('checks title field', () => {
    render(<CreateList/>);

    const title = screen.getByTestId('create-form-title')
    const title_field = screen.getByTestId('create-form-title-field')

    expect(title).toBeInTheDocument()
    expect(title_field).toBeInTheDocument()
});

it('checks title field value', () => {
    render(<CreateList/>);

    const title = screen.getByTestId('create-form-title')
    const title_field = screen.getByTestId('create-form-title-field')

    expect(title).toHaveTextContent('Title')
    expect(title_field).toHaveTextContent('')
});

it('checks items field', () => {
    render(<CreateList/>);

    const items = screen.getByTestId('create-form-items')
    const items_field = screen.getByTestId('create-form-items-field')

    expect(items).toBeInTheDocument()
    expect(items_field).toBeInTheDocument()
});

it('checks items field value', () => {
    render(<CreateList/>);

    const items = screen.getByTestId('create-form-items')
    const items_field = screen.getByTestId('create-form-items-field')

    expect(items).toHaveTextContent('Items')
    expect(items_field).toHaveTextContent('')
});

it('checks submit button', () => {
    render(<CreateList/>);

    const submit = screen.getByTestId('create-form-submit')

    expect(submit).toBeInTheDocument()
});

it('checks submit button value', () => {
    render(<CreateList/>);

    const submit = screen.getByTestId('create-form-submit')

    expect(submit).toHaveTextContent('Add list')
});
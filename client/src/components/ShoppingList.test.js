import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom'

import ShoppingList from "./ShoppingList";


it('renders shopping list correctly', () => {
    const tree = renderer
        .create(<ShoppingList/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the shopping list', () => {
    render(<ShoppingList/>);
    const list_date = screen.getByTestId('list-date')
    const list_title = screen.getByTestId('list-title')
    const list_items = screen.getByTestId('list-items')
    const list_select = screen.getByTestId('list-select')
    const list_delete = screen.getByTestId('list-delete')

    expect(list_date).toBeInTheDocument()
    expect(list_title).toBeInTheDocument()
    expect(list_items).toBeInTheDocument()
    expect(list_select).toBeInTheDocument()
    expect(list_delete).toBeInTheDocument()
});


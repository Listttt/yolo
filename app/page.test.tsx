/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import StoreProvider from "./StoreProvider";

describe('Main page', () => {
    it.only('contains DataTable', () => {
        render(
            <StoreProvider>
                <Page/>
            </StoreProvider>
        )
        expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });

    // Can't win AsyncThunk dispatch testing
    it.skip('dispatches "fetchCountries" action', () => {
    });

    it.todo('gets countries from store');
});

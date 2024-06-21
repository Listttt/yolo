/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";
import StoreProvider from "./StoreProvider";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import { Provider } from "react-redux";
import {fetchCountries, countriesSelector, countriesLoadingSelector, countriesErrorMessageSelector} from "@/store/countries/slice/countries.slice";

jest.mock('./store/countries/slice/countries.slice',() => ({
    fetchCountries: jest.fn(() => async (dispatch) => {
        const mockData = {countries: [{name: "Estonia", code: "EE"}]};
        dispatch({type: 'countries/fetchCountries', payload: mockData})
    }),
    countriesSelector: jest.fn(() => [{name: 'Estonia', code: 'EE'}]),
    countriesLoadingSelector: jest.fn(() => false),
    countriesErrorMessageSelector: jest.fn(() => ""),

}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main page', () => {
    it("renders homepage unchanged", () => {
        const { container } = render(
            <StoreProvider>
                <Page/>
            </StoreProvider>
        );

        expect(container).toMatchSnapshot();
    });

    it('contains DataTable', () => {
        render(
            <StoreProvider>
                <Page/>
            </StoreProvider>
        )
        expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });

    it('dispatches "fetchCountries" action', () => {
        const store = mockStore({countries: []});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Page/>
            </Provider>
        )

        expect(fetchCountries).toHaveBeenCalled();
    });

    it('gets countries from store', () => {
        const store = mockStore({countries: []});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Page/>
            </Provider>
        )

        expect(countriesSelector).toHaveBeenCalled();
        expect(screen.getByText('Estonia')).toBeInTheDocument();
    });

    it('gets loading state from store', () => {
        const store = mockStore({countries: [], loading: true});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Page/>
            </Provider>
        )

        expect(countriesLoadingSelector).toHaveBeenCalled();
    });

    it('gets error message from store', () => {
        const store = mockStore({countries: [], loading: true});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Page/>
            </Provider>
        )

        expect(countriesErrorMessageSelector).toHaveBeenCalled();
    });
});

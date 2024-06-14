import {countriesReducer, countriesActions, countriesSelector, fetchCountries} from "../countries.slice";
import {state as initialState} from '../state/state';
import {CountryRecordIntreface} from "../../types/CountryRecordInterface";
import {CountriesStateInterface} from "../../types/CountryStateInterface";
import {configureStore, UnknownAction} from "@reduxjs/toolkit";

const {addCountries} = countriesActions;

const DATA_STUB: Array<CountryRecordIntreface> = [{name: "Estonia", code: "EE"}];
const STATE_STUB: CountriesStateInterface = {countries: DATA_STUB};

describe('"countries" slice', () => {
    describe('asyncThunk fetchCountries',  () => {
        beforeEach(()=> global.fetch = jest.fn());

        afterEach(() => jest.resetAllMocks());

        // Not clear what with state in extra reducer (during test)
        it('should fetch countries', async() => {
            global.fetch.mockResolvedValue({json: () => ({data: STATE_STUB})});
            const store = configureStore({reducer: {countries: countriesReducer}});

            await store.dispatch(fetchCountries() as UnknownAction);

            const state = store.getState();
            console.log('state', JSON.stringify(state, null, 2));

            expect(state.countries).toEqual(STATE_STUB);
        });
    });

    describe('countries reducers', () => {
        it('should handle initial state', () => {
            expect(countriesReducer(undefined, {})).toEqual(initialState);
        });

        it('should store countries', () => {
            expect(countriesReducer(initialState, addCountries(DATA_STUB))).not.toEqual( [{name: "Latvia", code: "LV"}]);
            expect(countriesReducer(initialState, addCountries(DATA_STUB))).toEqual(DATA_STUB);
        });

        it('should select countries', () => {
            const state: {countries: CountriesStateInterface } = { countries: {countries: DATA_STUB}};
            expect(countriesSelector(state)).toEqual(DATA_STUB);
        });
    });
});
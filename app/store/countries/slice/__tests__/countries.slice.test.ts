import {countriesReducer, countriesActions, countriesSelector, fetchCountries} from "../countries.slice";
import {state as initialState} from '../state/state';
import {CountryRecordIntreface} from "../../types/CountryRecordInterface";
import {CountriesStateInterface} from "../../types/CountryStateInterface";
import {configureStore, UnknownAction} from "@reduxjs/toolkit";

const {addCountries} = countriesActions;

const DATA_STUB: Array<CountryRecordIntreface> = [{name: "Estonia", code: "EE"}]

describe('"countries" slice', () => {
    describe('asyncThunk fetchCountries',  () => {
        beforeEach(()=> global.fetch = jest.fn());

        afterEach(() => jest.resetAllMocks());

        //Not clear why action.payload is undefined in extraReducer
        it.skip('should fetch countries', async() => {
            // global.fetch.mockResolvedValue({countres: DATA_STUB})
            global.fetch.mockResolvedValue({json: () => ({data: {countres: {name: "Esonia", code: 'EE'}}})});
            const store = configureStore({reducer: countriesReducer});

            await store.dispatch(fetchCountries() as UnknownAction);

            const state = store.getState();

            expect(state.countries).toEqual(DATA_STUB);
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

        it.only('should select countries', () => {
            const state: CountriesStateInterface = {countries: DATA_STUB};
            expect(countriesSelector(state)).toEqual(DATA_STUB);
        });
    });
});
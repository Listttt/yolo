import {countriesReducer, countriesActions, countriesSelector, fetchCountries} from "../countries.slice";
import {state as initialState} from '@/store/countries/slice/state/state';
import {CountryRecordInterface} from "@/store/countries/types/CountryRecordInterface";
import {CountriesStateInterface} from "@/store/countries/types/CountryStateInterface";
import {configureStore, UnknownAction} from "@reduxjs/toolkit";

const {addCountries} = countriesActions;

const DATA_STUB: Array<CountryRecordInterface> = [{name: "Estonia", code: "EE"}];
const STATE_STUB: CountriesStateInterface = {countries: DATA_STUB, loading: false, error: ""};

const store = configureStore({reducer: {countries: countriesReducer}});
describe('"countries" slice', () => {
    describe('asyncThunk fetchCountries',  () => {
        beforeEach(()=> global.fetch = jest.fn());

        afterEach(() => jest.resetAllMocks());

        // Not clear what with state in extra reducer (during test)
        it('should fetch countries', async() => {
            global.fetch.mockResolvedValue({json: () => ({data: STATE_STUB})});
            const store = configureStore({reducer: {countries: countriesReducer}});

            await store.dispatch(fetchCountries('EE') as UnknownAction);

            const state = store.getState();

            expect(state.countries).toEqual(STATE_STUB);
        });
    });

    describe('countries reducers', () => {
        it('should handle initial state', () => {
            expect(countriesReducer(undefined, {})).toEqual(initialState);
        });

        it('should select countries', () => {
            const state: {countries: CountriesStateInterface } = { countries: {countries: DATA_STUB, loading: false, error: ""}};
            expect(countriesSelector(state)).toEqual(DATA_STUB);
        });
    });
});
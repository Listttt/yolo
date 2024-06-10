import {
    ActionCreatorWithoutPayload,
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
    GetThunkAPI
} from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { CountriesStateInterface } from "../types/CountryStateInterface";
import { CountryRecordIntreface } from "../types/CountryRecordInterface";
import { AsyncThunk } from "@reduxjs/toolkit/react";

export const fetchCountries: AsyncThunk<void, void, AsyncThunkConfig> = createAsyncThunk<void, void, AsyncThunkConfig>(
    "countries/fetchCountries", async (_, { dispatch }: GetThunkAPI<AsyncThunkConfig>) => {
        //TODO: service
        const response = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{\n  countries {\n    name\n    code\n  }\n}`
            })
       }).then(data => data.json() );

        return response.data.countries;
    }
)
type TODO_CLARIFY = any;
const countriesSlice  = createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
    extraReducers: (builder: ActionReducerMapBuilder<CountriesStateInterface>): void => {
        builder.addCase(fetchCountries.fulfilled, (state, action: TODO_CLARIFY ): TODO_CLARIFY => {
            return state.countries?.concat(action.payload) as unknown as Array<CountryRecordIntreface>
        })
    }
});

export const countriesSelector = (state: CountriesStateInterface): Array<CountryRecordIntreface> => {
    return state.countries;

};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

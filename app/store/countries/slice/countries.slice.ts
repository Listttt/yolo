import { createAsyncThunk, createSlice, GetThunkAPI } from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';
import { TwoCapitalLettersType } from "@/types/TwoCapitalLettersType";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { CountriesStateInterface } from "../types/CountryStateInterface";
import { CountryRecordIntreface } from "../types/CountryRecordInterface";
import { AsyncThunk } from "@reduxjs/toolkit/react";

export const fetchCountries: AsyncThunk<void, Array<TwoCapitalLettersType>, AsyncThunkConfig> = createAsyncThunk(
    "countries/fetchCounries", async (codes: Array<TwoCapitalLettersType>, { dispatch }: GetThunkAPI<AsyncThunkConfig>) => {
        // TODO: modyfy query string
        const req = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{\n  countries {\n    name\n    code\n  }\n}`
            })
        });

        const resp = await req.json();

        const {addCountries} = countriesActions;
        //@ts-ignore
        dispatch(addCountries(resp.data.countries));
    }
)

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
});

export const counriesSelector = (state: CountriesStateInterface): Array<CountryRecordIntreface> => {
    debugger;
    //@ts-ignore
    return state.countries.countries;
};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

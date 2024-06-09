import { createAsyncThunk, createSlice, GetThunkAPI } from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';
import { TwoCapitalLettersType } from "@/types/TwoCapitalLettersType";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";

export const fetchCountries = createAsyncThunk(
    "countries/fetchCounries", async (codes: Array<TwoCapitalLettersType>, { dispatch }: GetThunkAPI<AsyncThunkConfig>) => {
        debugger;
        // TODO: modyfy query string
        const resp = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{\n  countries {\n    name\n    code\n  }\n}`
            })
        });

        const data = await resp.json();

        const {addCountries} = countriesActions;
        //@ts-ignore
        dispatch(addCountries(data));
    }
)

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
});

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

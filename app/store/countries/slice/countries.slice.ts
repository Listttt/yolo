import { createAsyncThunk, createSlice, GetThunkAPI } from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';
import { TwoCapitalLettersType } from "@/types/TwoCapitalLettersType";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { CountriesStateInterface } from "../types/CountryStateInterface";
import { CountryRecordIntreface } from "../types/CountryRecordInterface";
import { AsyncThunk } from "@reduxjs/toolkit/react";

export const fetchCountries: AsyncThunk<void, void, AsyncThunkConfig> = createAsyncThunk<void, void, AsyncThunkConfig>(
    "countries/fetchCounries", async (_, { dispatch }: GetThunkAPI<AsyncThunkConfig>) => {
        //TODO: service
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
    //@ts-ignore
    return state.countries.countries;
};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

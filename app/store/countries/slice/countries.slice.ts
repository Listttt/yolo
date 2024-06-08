import { createSlice } from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
});

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

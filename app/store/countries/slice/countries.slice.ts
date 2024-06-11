import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice, Draft,
    GetThunkAPI, PayloadAction
} from "@reduxjs/toolkit";
import { CountriesReducers } from "./reducers/CountriesReducers";
import {state as initialState} from './state/state';
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { CountriesStateInterface } from "../types/CountryStateInterface";
import { CountryRecordIntreface } from "../types/CountryRecordInterface";
import { AsyncThunk } from "@reduxjs/toolkit/react";
import {NoInfer} from "react-redux";

export const fetchCountries: AsyncThunk<void, void, AsyncThunkConfig> = createAsyncThunk<void, void, AsyncThunkConfig>(
    "countries/fetchCountries", async (_, { dispatch }: GetThunkAPI<AsyncThunkConfig>) => {
        const response = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{\n  countries {\n    name\n    code\n  }\n}`
            })
        });

        return response.json()
    }
)
const countriesSlice= createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
    extraReducers: (builder: ActionReducerMapBuilder<CountriesStateInterface>): void => {
        //@ts-ignore
        builder.addCase(fetchCountries.fulfilled, (state: Draft<CountriesStateInterface>, action: PayloadAction<any> ): Draft<NoInfer<CountriesStateInterface>
        > | unknown => {
            return state.countries?.concat(action.payload.data.countries);
        })
    }
});

export const countriesSelector = (state: CountriesStateInterface): Array<CountryRecordIntreface> => {
    return state.countries;
};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

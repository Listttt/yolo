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
import { RootState} from "../../../lib/store";

interface ResponseInterface {
    data: CountriesStateInterface;
}
export const fetchCountries: AsyncThunk<ResponseInterface, void, AsyncThunkConfig> = createAsyncThunk<ResponseInterface, void, AsyncThunkConfig>(
    "countries/fetchCountries", async (_, { dispatch }: GetThunkAPI<AsyncThunkConfig>) : Promise<ResponseInterface> => {
        const response = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `{\n  countries {\n    name\n    code\n  }\n}`
            })
        });

        const payload: Promise<ResponseInterface> =  response.json();
        return payload;
    }
);

type test = typeof fetchCountries.fulfilled;
const countriesSlice= createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers,
    },
    extraReducers: (builder: ActionReducerMapBuilder<CountriesStateInterface>): void => {
        builder.addCase(fetchCountries.fulfilled, (state: Draft<CountriesStateInterface> , action: PayloadAction<ResponseInterface> ): void => {
            state.countries.splice(0, state.countries.length, ...action.payload.data.countries);
        })
    }
});

export const countriesSelector = (state:RootState): Array<CountryRecordIntreface> => {
    return state.countries.countries;
};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

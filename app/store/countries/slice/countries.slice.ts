import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice, Draft,
    GetThunkAPI, PayloadAction
} from "@reduxjs/toolkit";
import {state as initialState} from '@/store/countries/slice/state/state';
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { CountriesStateInterface } from "@/store/countries/types/CountryStateInterface";
import { CountryRecordInterface } from "@/store/countries/types/CountryRecordInterface";
import { AsyncThunk } from "@reduxjs/toolkit/react";
import { RootState} from "@/app/lib/store";
import {CapitalLetterType} from "@/types/CapitalLetterType";
import {TwoCapitalLettersType} from "@/types/TwoCapitalLettersType";

import {CountriesReducers} from "@/store/countries/slice/reducers/CountriesReducers";
import {CountryResponseInterface} from "@/service/country/types/CountryResponseInterface";
import {fetchCountries as fetchCountriesRequest} from "@/service/country/CountryService";


export const fetchCountries: AsyncThunk<CountryResponseInterface, CapitalLetterType | TwoCapitalLettersType | undefined, AsyncThunkConfig> = createAsyncThunk<CountryResponseInterface, CapitalLetterType | TwoCapitalLettersType | undefined, AsyncThunkConfig>(
    "countries/fetchCountries", async (filterCriteria: string = "", {}: GetThunkAPI<AsyncThunkConfig>) : Promise<CountryResponseInterface> => {
        const payload = await fetchCountriesRequest(filterCriteria);
        return payload as unknown as Promise<CountryResponseInterface>;
    }
);

const countriesSlice= createSlice({
    name: "countries",
    initialState,
    reducers: {
        ...CountriesReducers
    },
    extraReducers: (builder: ActionReducerMapBuilder<CountriesStateInterface>): void => {
        builder.
        addCase(fetchCountries.pending, (state: Draft<CountriesStateInterface>): void => {
            state.loading = true;
            state.error = ""
        }).
        addCase(fetchCountries.rejected, (state: Draft<CountriesStateInterface> , action: any): void => {
            state.loading = false;
            state.error = action.error.message;

        }).
        addCase(fetchCountries.fulfilled, (state: Draft<CountriesStateInterface> , action: PayloadAction<CountryResponseInterface> ): void => {
            state.loading = false;
            state.countries.splice(0, state.countries.length, ...action.payload.countries);
        })
    }
});

export const countriesSelector = (state:RootState): Array<CountryRecordInterface> => {
    return state.countries.countries;
};

export const countriesLoadingSelector = (state:RootState): boolean => {
    return state.countries.loading;
};

export const countriesErrorMessageSelector = (state:RootState): string => {
    return state.countries.error;
};

export const countriesActions = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

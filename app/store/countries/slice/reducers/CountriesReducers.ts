import { createAsyncThunk, GetThunkAPI, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { CountriesStateInterface } from "../../types/CountryStateInterface";
import { CountryRecordIntreface } from "../../types/CountryRecordInterface";
import { TwoCapitalLettersType } from "@/types/TwoCapitalLettersType";
import { PayloadActionInterface } from "@/types/rtk/PayloadActionInteface";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { countriesActions } from "../countries.slice";



type TODO_CLARIFY = any;

export const CountriesReducers: TODO_CLARIFY = {
    addCountries: (state: CountriesStateInterface, action: PayloadAction<Array<CountryRecordIntreface>>) => {
        return {
            ...state,
            countries: action.payload
        }
    }
}
import { PayloadAction } from "@reduxjs/toolkit";
import { CountriesStateInterface } from "../../types/CountryStateInterface";
import { CountryRecordIntreface } from "../../types/CountryRecordInterface";



type TODO_CLARIFY = any;

export const CountriesReducers: TODO_CLARIFY = {
    addCountries: (state: CountriesStateInterface, action: PayloadAction<Array<CountryRecordIntreface>>) => {
        return {
            ...state,
            countries: action.payload
        }
    }
}
import {PayloadAction, Reducer} from "@reduxjs/toolkit";
import { CountryRecordIntreface } from "../../types/CountryRecordInterface";

export const CountriesReducers: { addCountries: (state, action: PayloadAction<Array<CountryRecordIntreface>>) => any } = {
    addCountries: (state, action: PayloadAction<Array<CountryRecordIntreface>>) => {
         return state.countries.concat(action.payload);
    }
}
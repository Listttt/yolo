import { PayloadAction } from "@reduxjs/toolkit";
import { CountryRecordIntreface } from "../../types/CountryRecordInterface";



type TODO_CLARIFY = any;

export const CountriesReducers: TODO_CLARIFY = {
    addCountries: (state, action: PayloadAction<Array<CountryRecordIntreface>>) => {
        console.log('2222HERE==================@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
         return state.countries.concat(action.payload);
    }
}
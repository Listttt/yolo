import { PayloadAction } from "@reduxjs/toolkit";
import { CountriesStateInterface } from "../../types/CountryStateInterface";
import { CountryRecordIntreface } from "../../types/CountryRecordInterface";
import { TwoCapitalLettersType } from "@/types/TwoCapitalLettersType";
import { PayloadActionInterface } from "@/types/rtk/PayloadActionInteface";


type TODO_CLARIFY = any;

export const CountriesReducers: TODO_CLARIFY = {
    fetchCountries: {
        reducer: (state: CountriesStateInterface, action: PayloadAction<Array<CountryRecordIntreface>>) => {
            return {
                ...state,
                countries: action.payload
            }
        },
        prepare: (codes: Array<TwoCapitalLettersType>): PayloadActionInterface<Array<CountryRecordIntreface>> => {
            return {
                //request from here
                payload: [{country: "Estonia", code: 'EE'}]
            }
        }
    }
}
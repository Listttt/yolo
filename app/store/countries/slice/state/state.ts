import { CountriesStateInterface } from "@/store/countries/types/CountryStateInterface";

export const state: CountriesStateInterface  = {
    countries: [],
    loading: false,
    error: ""
};
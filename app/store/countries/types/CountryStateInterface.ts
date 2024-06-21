import { CountryRecordInterface } from "@/store/countries/types/CountryRecordInterface";

export interface LoadingDataInterface {
    loading: boolean;
    error: string;
}
export interface CountriesStateInterface extends LoadingDataInterface {
    countries: Array<CountryRecordInterface>
}
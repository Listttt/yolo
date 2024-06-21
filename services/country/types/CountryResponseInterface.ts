import {Draft} from "@reduxjs/toolkit";
import {CountryRecordInterface} from "@/store/countries/types/CountryRecordInterface";

export interface CountryResponseInterface{
    countries: Array<Draft<CountryRecordInterface>>;
}

import {ColumnDef} from "@tanstack/react-table";
import {CountryRecordInterface} from "@/store/countries/types/CountryRecordInterface";
import {fetchCountries} from "@/store/countries/slice/countries.slice";

export interface FilterHostStrategy {
    thunk: (...params) => any
}
export interface FilterStrategy {
    host?: FilterHostStrategy
}
//TODO: place it
export interface InputConstrainsInterface {
    maxLength?: number;
}
export type ValidationCase = (val: string | number | null) => boolean | string;
//TODO: place it
export type ValidationType = Array<ValidationCase>
//TODO: place it
export interface FilterColumnInterface {
    validation?: ValidationType,
    constrains: InputConstrainsInterface,
    strategy: FilterStrategy
}

//TODO: place it
export type FilterColumnType = boolean | FilterColumnInterface

//TODO: place it
export interface ColumnDefMixin {
    filterColumn?: FilterColumnType
}

const MAX_LENGTH: number = 2;

export const TABLE_CONFIG: Array<ColumnDef<CountryRecordInterface> & ColumnDefMixin> = [
    {
        accessorKey: "code",
        header: "code",
        filterColumn: {
            validation: [
                (val: string) => val.length <= 2 || 'Too long value',
                (val: string) => (!val.length || !!val.match(/^[a-zA-Z]+$/)) || 'Please enter just letters',
                (val: string) => (!val.length || !val.match(/^[a-z]+$/)) || 'use capital letters',
            ],
            constrains: {
                maxLength: MAX_LENGTH
            },
            strategy: {
                host: {
                    thunk: fetchCountries
                },
            }
        } as FilterColumnInterface
    },
    {
        accessorKey: "name",
        header: "country"
    }
]

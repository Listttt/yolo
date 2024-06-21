import {ColumnDefExtended} from "@tanstack/react-table";
import {CountryRecordInterface} from "@/store/countries/types/CountryRecordInterface";
import {fetchCountries} from "@/store/countries/slice/countries.slice";

const MAX_LENGTH: number = 2;

export const TABLE_CONFIG: Array<ColumnDefExtended<CountryRecordInterface>> = [
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
        }
    },
    {
        accessorKey: "name",
        header: "country"
    }
]

import {ColumnDef} from "@tanstack/react-table";
import {CountryRecordIntreface} from "../../store/countries/types/CountryRecordInterface";

export const TABLE_CONFIG: Array<ColumnDef<CountryRecordIntreface> & {filterColumn?: boolean}> = [
    {
        accessorKey: "code",
        header: "code",
        filterColumn: true
    },
    {
        accessorKey: "name",
        header: "country"
    }
]

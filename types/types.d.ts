// import "@tanstack/react-table" ;
import {RowData} from "@tanstack/table-core";
import {ColumnDef} from "@tanstack/react-table";
import {FilterColumnType} from "@/types/filter/FilterColumnType";

declare module "@tanstack/react-table" {
    export type ColumnDefExtended<T extends RowData, V = unknown> =  ColumnDef<T, V> & {filterColumn?: FilterColumnType}
}


"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    AccessorKeyColumnDefBase, ColumnDefExtended,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {FilterInput} from "@/components/ui/filterInput";
import {LoadingDataInterface} from "@/store/countries/types/CountryStateInterface";
import {FilterColumnInterface} from "@/types/filter/FilterColumnInterface";

interface DataTableProps<TData, TValue> extends LoadingDataInterface {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             loading,
                                             error
                                         }: DataTableProps<TData, TValue>) {


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    const findFilterColumn = columns.find(column => column.hasOwnProperty('filterColumn'));
    const filterBy: string = (findFilterColumn as AccessorKeyColumnDefBase<TData>)?.accessorKey as string || "";

    const {validation, constrains, strategy}: FilterColumnInterface = (findFilterColumn as ColumnDefExtended<TData>)?.filterColumn as FilterColumnInterface;

    return (
        <div data-testid="data-table">
            {filterBy != "" &&
                <div className="flex items-center py-4">
                    <FilterInput
                        placeholder={`Filter by ${filterBy}`}
                        maxLength={constrains?.maxLength}
                        validation={validation}
                        strategy={strategy}
                        className="max-w-sm"
                    />
                </div>
            }
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            error ?
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        {error}
                                    </TableCell>
                                </TableRow> :
                                loading ?
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            Loading...
                                        </TableCell>
                                    </TableRow> :
                            table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

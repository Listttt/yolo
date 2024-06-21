import {DataTable} from "@/components/ui/datatable";
import {fireEvent, render, screen} from "@testing-library/react";
import {ColumnDef, ColumnDefExtended} from "@tanstack/react-table";
import {fetchCountries} from "@/store/countries/slice/countries.slice";
import StoreProvider from "@/app/StoreProvider";

describe('DataTable', () => {
    interface DataRecordInterface {
        key: string,
        value: string
    }

    const dataStub: Array<DataRecordInterface> = [
        {key: "record1", value: "value1"},
        {key: "record2", value: "value2"},
    ];

    describe('with filter', () => {

        const MAX_LENGTH = 2;

        const columnsStub: Array<ColumnDefExtended<DataRecordInterface>> = [
            {
                accessorKey: "key",
                header: "key",
            },
            {
                accessorKey: "value",
                header: "value",
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
            }
        ]

        beforeEach(() => {
            render(<StoreProvider>
                <DataTable loading={false} error={''} columns={columnsStub} data={dataStub as unknown as Array<DataRecordInterface>}/>
            </StoreProvider>)
        });

        it('reflects records', () => {
            //header
            expect(screen.getByText('key', {exact: true})).toBeInTheDocument();
            expect(screen.getByText('value', {exact: true})).toBeInTheDocument();
            //rows
            //row1
            expect(screen.getByText('record1')).toBeInTheDocument();
            expect(screen.getByText('value1')).toBeInTheDocument();
            //row2
            expect(screen.getByText('record2')).toBeInTheDocument();
            expect(screen.getByText('value2')).toBeInTheDocument();
        });

        it('reflects filter', () => {
            expect(screen.getByPlaceholderText('Filter by', {exact: false})).toBeInTheDocument()
        });

        it('the placeholder contains the name of the column to filter by', () => {
            expect(screen.queryByPlaceholderText('Filter by key', {exact: true})).not.toBeInTheDocument()
            expect(screen.getByPlaceholderText('Filter by value', {exact: true})).toBeInTheDocument()
        });

        describe('filters records', () => {
            let input: HTMLInputElement;

            beforeEach(()=> {
                input = screen.getByPlaceholderText<HTMLInputElement>('Filter by value', {exact: true})
            });

            afterEach(() => {
                input = null as unknown as HTMLInputElement;
            })

            it('empty filter value leads to all records in table', () => {
                fireEvent.change(input, {target: {value: ''}})
                expect(screen.queryByText('No results.')).not.toBeInTheDocument();
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).toBeInTheDocument();

            });

            // TODO: async test after refactoring filter from client side to server side
            it.skip('drops records from table that not contributes to filter', () => {
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).toBeInTheDocument();

                fireEvent.change(input, {target: {value: 'value1'}})

                expect(screen.queryByText('No results.')).not.toBeInTheDocument();
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).not.toBeInTheDocument();
            });

            it('reflects all records witch matches partially with filter value', () => {
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).toBeInTheDocument();

                //partial match for all records
                fireEvent.change(input, {target: {value: 'value'}})
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).toBeInTheDocument();
            });

            // TODO: async test after refactoring filter from client side to server side
            it.skip('reflects "No results." in case when all records filtered out', () => {
                expect(screen.queryByText('value1')).toBeInTheDocument();
                expect(screen.queryByText('value2')).toBeInTheDocument();
                expect(screen.queryByText('No results.')).not.toBeInTheDocument();

                //missmatch
                fireEvent.change(input, {target: {value: 'not existing value'}})

                expect(screen.queryByText('value1')).not.toBeInTheDocument();
                expect(screen.queryByText('value2')).not.toBeInTheDocument();
                expect(screen.queryByText('No results.')).toBeInTheDocument();
            });
        });
    });

    describe('without filter', () => {
        const columnsStub: Array<ColumnDef<DataRecordInterface> & { filterColumn?: boolean }> = [
            {
                accessorKey: "key",
                header: "key",
            },
            {
                accessorKey: "value",
                header: "value",
            }
        ];

        beforeEach(() => {
            render(<DataTable loading={false} error={''} columns={columnsStub} data={dataStub as unknown as Array<DataRecordInterface>}/>)
        });

        it('reflects records', () => {
            //header
            expect(screen.getByText('key', {exact: true})).toBeInTheDocument();
            expect(screen.getByText('value', {exact: true})).toBeInTheDocument();
            //rows
            //row1
            expect(screen.getByText('record1')).toBeInTheDocument();
            expect(screen.getByText('value1')).toBeInTheDocument();
            //row2
            expect(screen.getByText('record2')).toBeInTheDocument();
            expect(screen.getByText('value2')).toBeInTheDocument();
        });

        it('not reflects filter according to config', () => {
            expect(screen.queryByPlaceholderText('Filter by', {exact: false})).not.toBeInTheDocument()
        });
    })
});

'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { counriesSelector, fetchCountries } from "./store/countries/slice/countries.slice";
import { CountryRecordIntreface } from "./store/countries/types/CountryRecordInterface";
import {DataTable} from "@/components/ui/datatable";
import {ColumnDef} from "@tanstack/react-table";
import {Card} from "@/components/ui/card";

type TODO = any;
export default function Page() {
  // const {fetchCountries}: CaseReducerActions<TODO, 'countries'> = countriesActions;
  // const dispatch: AppDispatch = useAppDispatch();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState([]);
  const countries: Array<CountryRecordIntreface> = useSelector(counriesSelector);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCountries(['AA']))
  },[filter]);

  const columns: Array<ColumnDef<CountryRecordIntreface>> = [
    {
      accessorKey: "code",
      header: "code"
    },
    {
      accessorKey: "name",
      header: "country"
    }
  ];

  return  <>
    <div className="flex justify-center">
      <Card className="w-[350px] p-8 bg-secondary">
        <DataTable columns={columns} data={countries as unknown as Array<CountryRecordIntreface>}/>
      </Card>
    </div>
  </>
}

'use client'
import {useSelector} from "react-redux";
import React, {useEffect } from "react";
import { countriesSelector, fetchCountries } from "./store/countries/slice/countries.slice";
import { CountryRecordIntreface } from "./store/countries/types/CountryRecordInterface";
import {DataTable} from "@/components/ui/datatable";
import {ColumnDef} from "@tanstack/react-table";
import {Card} from "@/components/ui/card";
import {useAppDispatch} from "./lib/hooks";
import {AppDispatch} from "./lib/store";
import {TABLE_CONFIG} from "./configs/datatable/config";



export default function Page() {
  const dispatch: AppDispatch = useAppDispatch();

  // TODO: move to separate config
  const columns: Array<ColumnDef<CountryRecordIntreface> & {filterColumn?: boolean}> = TABLE_CONFIG;

  const countries: Array<CountryRecordIntreface> = useSelector(countriesSelector);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCountries())
  },[]);

  return  <>
    <div className="flex justify-center">
      <Card className="w-[350px] p-8 bg-secondary">
        <DataTable columns={columns} data={countries as unknown as Array<CountryRecordIntreface>}/>
      </Card>
    </div>
  </>
}

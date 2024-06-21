'use client'
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {
  countriesErrorMessageSelector,
  countriesLoadingSelector,
  countriesSelector,
  fetchCountries
} from "@/store/countries/slice/countries.slice";
import { CountryRecordInterface } from "@/store/countries/types/CountryRecordInterface";
import {DataTable} from "@/components/ui/datatable";
import {ColumnDefExtended} from "@tanstack/react-table";
import {Card} from "@/components/ui/card";
import {useAppDispatch} from "@/app/lib/hooks";
import {AppDispatch} from "@/app/lib/store";
import {TABLE_CONFIG} from "@/app/configs/datatable/config";

export default function Page() {
  const dispatch: AppDispatch = useAppDispatch();

  const columns: Array<ColumnDefExtended<CountryRecordInterface>> = TABLE_CONFIG;

  const countries: Array<CountryRecordInterface> = useSelector(countriesSelector);
  const loading: boolean = useSelector(countriesLoadingSelector);
  const error: string = useSelector(countriesErrorMessageSelector);

  useEffect(() => {
    dispatch(fetchCountries())
  },[]);

  return  <>
    <div className="flex justify-center">
      <Card className="w-[350px] p-8 bg-secondary">
        <DataTable loading={loading} error={error} columns={columns} data={countries as unknown as Array<CountryRecordInterface>}/>
      </Card>
    </div>
  </>
}

'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { counriesSelector, fetchCountries } from "./store/countries/slice/countries.slice";
import { CountryRecordIntreface } from "./store/countries/types/CountryRecordInterface";
import {Button} from "@/components/ui/button";

// export const metadata = {
//   title: "App Router",
// };
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

  return  <>
    <Button variant="outline">test</Button>
  <div className="text-3xl font-bold underline">tailwind</div>
  {/*{countries && countries.length && countries.map((country: CountryRecordIntreface) => <div>{country.name}</div>)}*/}
  </>
}

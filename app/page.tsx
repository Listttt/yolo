'use client'
import { useDispatch } from "react-redux";
import { countriesActions, countriesReducer } from "./store/countries/slice/countries.slice";
import StoreProvider from "./StoreProvider";
import { useEffect } from "react";
import { AppDispatch } from "./lib/store";
import { useAppDispatch } from "./lib/hooks";
import { CaseReducerActions } from "@reduxjs/toolkit";
import { fetchCountries } from "./store/countries/slice/countries.slice";

// export const metadata = {
//   title: "App Router",
// };
type TODO = any;
export default function Page() {
  // const {fetchCountries}: CaseReducerActions<TODO, 'countries'> = countriesActions;
  // const dispatch: AppDispatch = useAppDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCountries(['AA']))
  },[]);

  return <h1>App Router</h1>

}

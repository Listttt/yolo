import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from 'app/store/countries/slice/countries.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        countries: countriesReducer
    },
    devTools: true
  })
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
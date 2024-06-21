import * as React from "react"

import { cn } from "lib/utils"
import {Input} from "@/components/ui/input";
import {BaseSyntheticEvent, FormEventHandler, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {ValidationType} from "@/types/validation/ValidationType";
import {FilterStrategyInterface} from "@/types/filter/FilterStrategyInterface";
import {useAppDispatch} from "@/app/lib/hooks";

export interface FilterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    validation?: ValidationType,
    strategy?: FilterStrategyInterface
}

const DEBOUNCE_TIME: number = 300;
function useDebounce(callback, delay = DEBOUNCE_TIME) {
    const timeoutRef = useRef<any>(null);

    const debouncedFunction = (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedFunction;
}

const FilterInput = React.forwardRef<HTMLInputElement, FilterInputProps>(
  ({ className, validation, strategy, type, ...props }: FilterInputProps, ref) => {
      const dispatch = !!strategy?.host?.thunk ? useAppDispatch(): (...params) => {};
      const [validationFn, setFn] = useState<FormEventHandler<HTMLInputElement> | undefined>(() => {}) ;
      const [message, setMessage] = useState<string>("");

      const debouncedFilter = useDebounce((criteria: string) => {
          const thunk = strategy!.host!.thunk;
          dispatch(thunk(criteria));
      } , DEBOUNCE_TIME)

      const doFilter = (event: BaseSyntheticEvent) => {
          if(strategy?.hasOwnProperty('host')) {
              debouncedFilter(event.target.value)
          }

      }
``

      useEffect(() => {
          setFn(() => (event: InputEvent): boolean | string => {
              setMessage("");
              let result: boolean | string = true;
              if(validation) {
                  for(let _case of validation) {
                      result = _case(event.data);
                      if(typeof result === "string") {
                          event.preventDefault();
                          event.stopPropagation();

                          setMessage(result)
                          break;
                      }
                  }
              }

              return result;
          })
      }, [])


    return (
        <div className={'flex-column'}>
            <Input
                type={type}
                onBeforeInput={validationFn}
                onInput={doFilter}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
            {message}
        </div>
    )
  }
)
FilterInput.displayName = "FilterInput"

export { FilterInput }

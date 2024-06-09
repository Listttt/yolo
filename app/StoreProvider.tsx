'use client'
'use client'
import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from 'app/lib/store';

export default function StoreProvider({
  children,
}: {
  children: ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()

    debugger;
  }

  return <Provider store={storeRef.current}>{children}</Provider>
};
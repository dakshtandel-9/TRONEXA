'use client';

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
  isLoaded: boolean;
  setIsLoaded: (v: boolean) => void;
}>({ isLoaded: false, setIsLoaded: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  return useContext(LoadingContext);
}

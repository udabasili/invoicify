import Loader from "@/components/Elements/Loaders/Loader";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import store, { persistor } from "@/store";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <FullScreenLoader/>
        </div>
      }
    >
      <Provider store={store}>
      <PersistGate loading={FullScreenLoader} persistor={persistor}>
        <HelmetProvider>
          <Router> {children}</Router>
        </HelmetProvider>
      </PersistGate>
      </Provider>
    </React.Suspense>
  );
};

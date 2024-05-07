import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  //stripePromise: Promise<Stripe | null>;
};
const AppContext = React.createContext<AppContext | undefined>(undefined);
export const AppContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
      retry: false,
    });
    if (isError === undefined) {
      // Loading state if needed
      return <div>Loading...</div>;
    }
    return (
      <AppContext.Provider value={ {
        showToast: (toastMessage) => {
          setToast(toastMessage);
           // console.log(toastMessage);
          },
          isLoggedIn: !isError,
          // stripePromise,
      }}
      >
         {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
         )}
      {children}
      </AppContext.Provider>
    );
  };
 
  export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
  };

  
  
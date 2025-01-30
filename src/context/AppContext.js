import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [workerData, setWorkerData] = useState([]);

  return (
    <AppContext.Provider value={{ workerData, setWorkerData }}>
      {children}
    </AppContext.Provider>
  );
};

export  default AppContext;

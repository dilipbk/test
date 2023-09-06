import React, { createContext, useState } from 'react';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
  const [clientdata, setClientData] = useState([]);
  const [clientcount, setClientCount] = useState(0);


  const updateClientData = newData => {
    setClientData(newData);
  };

  return (
    <DataContext.Provider value={{ clientdata, updateClientData, clientcount,setClientCount }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;

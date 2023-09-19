import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
  const [clientList, setClientList] = useState([]);
  const [clientdata, setClientData] = useState([]);
  const [clientcount, setClientCount] = useState(0);
  const [fwderr, setFwderror] = useState('');
  const [fwdcontact, setFwdContact] = useState('');
  const [count, setCount] = useState(0);
  const [store_id,setLocalStore] = useState(localStorage.getItem('STOREID') || '');


  
  const increment = () => {
    setCount(count + 1);
  };

 const setLocalStoreID = (newData) => {
  setLocalStore(newData);
  };
  const updateClientList = (newData) => {
    setClientList(newData);
  };

  const updateClientData = newData => {
    setClientData(newData);
  };

  const updateClientCount = newData => {
    setClientCount(newData);
  };


  const ResetData= () => {
    setTimeout(() => {
      setFwderror('');
    }, 5000);
  };

 

  return (
    <DataContext.Provider value={{setLocalStoreID,store_id,ResetData,count,increment,clientList,updateClientList, clientdata, updateClientData,updateClientCount, clientcount,fwderr,fwdcontact,setFwderror,setFwdContact }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;

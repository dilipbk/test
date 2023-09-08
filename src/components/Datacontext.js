import React, { createContext, useState } from 'react';
import axios from '../api/axios';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
  const [clientList, setClientList] = useState([]);
  const [clientdata, setClientData] = useState([]);
  const [clientcount, setClientCount] = useState(0);
  const [fwderr, setFwderror] = useState('');
  const [fwdcontact, setFwdContact] = useState('');

  const updateClientList = (newData) => {
    setClientList(newData);
  };

  const updateClientData = newData => {
    setClientData(newData);
  };

  const updateClientCount = newData => {
    setClientCount(newData);
  };

  const fetchQueData = async () => {
    try {
      const response = await axios.get("/dailyservice");
      updateClientList(response.data.dailyservices);
      updateClientCount(response.data.dailyservices.length);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  return (
    <DataContext.Provider value={{fetchQueData,clientList,updateClientList, clientdata, updateClientData, clientcount,fwderr,fwdcontact,setFwderror,setFwdContact }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;

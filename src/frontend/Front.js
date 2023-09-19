import React, { useState, useEffect, useContext } from "react";
import {
  CAvatar,
  CListGroupItem,
  CListGroup,
  CContainer,
  CRow,
  CCol,
  CAlert,
} from "@coreui/react";
import Header from "./parts/Header";
import "./Front.css";
import { Link } from "react-router-dom";
import Datacontext from "../components/Datacontext";
import axios from "../api/axios";

const Front = () => {
  const [err, setErrMsg] = useState('');
  const {
    store_id,
    fwderr,
    ResetData,
    updateClientList,
    updateClientData,
    clientList,
    updateClientCount,
  } = useContext(Datacontext);
  
  const handleRemoveData = () => {
    // Remove an item from local storage
    localStorage.removeItem("clientsdata");
    updateClientData([]);
  };

  ResetData();

  const NameCombine = (str) => {
    const firstChars = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstChars;
  };

  useEffect(() => {
    handleRemoveData();
    fetchQueData();
    const interval =  setInterval(()=>{
      fetchQueData();
    },180000)
    return () => clearInterval(interval);
  }, []);
  
  
    const fetchQueData = async () => {
      try {
        const response = await axios.get("/dailyservice/"+store_id);
        updateClientList(response.data.dailyservices);
        updateClientCount(response.data.dailyservices.length);
      } catch (error) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 400) {
            setErrMsg("Missing Data");
          } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg("no data found");
          }
      }
    };

  return (
    <>
      <Header />
      <CContainer>
        {fwderr && (
          <CRow>
            <CAlert color="success" className="d-flex align-items-center">
              <div>{fwderr}</div>
            </CAlert>
          </CRow>
        )}
        <CRow>
          <CCol md={6} className="d-flex align-items-center introsection ">
            <div className="intro-text">
              <h2>
                <em>Welcome</em> to
                <br />
                Diamond Threading <br />
                <em>Salon</em>
              </h2>
              <div className="div-dec"></div>

              <div className="buttons">
                <div>
                  <Link
                    size="lg"
                    className="btn btn-primary btn-lg px-5 py-3"
                    to="/signin"
                  >
                    Check In
                  </Link>
                </div>
              </div>
            </div>
          </CCol>
          <CCol
            md={6}
            className="d-flex flex-column align-items-center introsection "
          >
             <div className="text-black pt-1">
                <h2 style={{'color':'#000'}}>Waiting List</h2>
              </div>
            
            {clientList.length >0 && (
              <CListGroup flush className="nameListque">
                {clientList.map((Services, index) => (
                  <CListGroupItem
                    key={index}
                    className="d-flex align-items-center "
                  >
                    {Services.profile_image ? (
                      <>
                        <CAvatar
                          src={Services.profile_image}
                          status="success"
                          size="xl"
                        />
                      </>
                    ) : (
                      <>
                        <CAvatar color="secondary" status="danger" size="xl">
                          {NameCombine(Services.f_name + " " + Services.l_name)}
                        </CAvatar>
                        
                        <span
                          className="ms-md-auto displaytext rounded-circle border d-flex justify-content-center align-items-center"
                          style={{
                            
                            width: "60px",
                            height: "60px",
                          }}
                        >
                          {index + 1}
                        </span>
                      </>
                    )}
                  </CListGroupItem>
                ))}
              </CListGroup>
           
            )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Front;

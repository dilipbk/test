import React, { useState, useEffect, useContext } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import axios from "../api/axios";
import Datacontext from "../components/Datacontext";
import Header from "./parts/Header";
import "./ProfileCard.css";

const ProfileCard = () => {
  const navigate = useNavigate();
  const {store_id,setFwderror,clientdata, updateClientData,updateClientList,updateClientCount} = useContext(Datacontext);
  if(!clientdata){
    navigate('/')
  }

  const [Services, setItems] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const sessionToken = localStorage.getItem("clientsdata");


  const loadClientData = () => {
    if (clientdata.length === 0) {
      const jsObject = JSON.parse(sessionToken);
      updateClientData(jsObject);      
    }
  };

  useEffect(() => {
    fetchData();
    loadClientData();   
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/services');
      setItems(response.data.Services);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  const handleCardClick = (clickedService) => {
    const isSelected = selectedServices.some(
      (service) => service.service === clickedService.service
    );

    if (!isSelected) {
      setSelectedServices((prevSelected) => [
        ...prevSelected,
        {
          image: clickedService.image,
          service: clickedService.service,
          client_id: clientdata.id,
          store_id: store_id,
        },
      ]);
    }
  };
  const handleRemoveServices = (Services) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((item) => item !== Services)
    );
  };
  const NameCombine = (str) => {
    const firstChars = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstChars;
  };
  const removeLocalStorage = ()=>{
    updateClientData([])
    localStorage.removeItem('clientsdata');
    navigate('/');
  }


  const handleCheckout = async () => {
    // Handle the checkout process with the selectedServices list

    try {
       await axios.post('/dailyservice/store',
        {
          data: selectedServices,
        }
      );
      removeLocalStorage();
      setFwderror('Thank you for registerting the services.')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <CContainer className="mt-5">
        <CRow>
          <CCol md={12}><h3>Choose your service:</h3></CCol>
        </CRow>
   
        <CRow className="w-100 ">
          
          <CCol md={8} xl={9}>
            <CRow>
              {Services.map((Services, index) => (
                <CCol md={4} lg={4} sm={6} key={index} className="mb-3">
                  <CCard
                    onClick={() => handleCardClick(Services)}
                    className={
                      selectedServices.some(
                        (selectedService) =>
                          selectedService.service === Services.service
                      )
                        ? "selected service-input"
                        : "service-input"
                    }
                    style={{ cursor: "pointer" }}
                  >
                   
                    <CCardBody>
                      <CCardTitle className="text-capitalize text-large">{Services.service}</CCardTitle>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCol>
          <CCol md={4} xl={3}>
          {selectedServices.length > 0 && (
                <CCard className="p-3 col-md-12">
                  <h3>Selected Services</h3>
                  <CListGroup>
                    {selectedServices.map((Services, index) => (
                      <CListGroupItem
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">                          
                          <span className="ps-1 text-capitalize fw-bold ">
                            {Services.service}
                          </span>
                        </div>
                        <CButton
                          color="danger"
                          size="sm"
                          className="float-right"
                          onClick={() => handleRemoveServices(Services)}
                        >
                          X
                        </CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                  <CButton
                    color="primary"
                    onClick={handleCheckout}
                    className="mt-3"
                  >
                    CHECK IN
                  </CButton>
                </CCard>
              )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default ProfileCard;

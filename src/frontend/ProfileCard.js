import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import Button from "../components/Globals/Button";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { store_id, setFwderror, clientdata, updateClientData } =
    useContext(Datacontext);
  if (!clientdata) {
    navigate("/");
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
      const response = await axios.get("/services");
      setItems(response.data.Services);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };
  const handleCardClick = (clickedService) => {
    const isSelected = selectedServices.some(
      (service) => service.service === clickedService.service
    );

    console.log(isSelected);

    if (isSelected) {
      setSelectedServices((prevSelected) =>
        prevSelected.filter(
          (service) => service.service !== clickedService.service
        )
      );
    } else {
      setSelectedServices((prevSelected) => [
        ...prevSelected,
        {
          image: clickedService.image,
          service: clickedService.service,
          service_id:clickedService.id,
          client_id: clientdata.id,
          store_id: store_id,
        },
      ]);
    }
  };

 
  const removeLocalStorage = () => {
    updateClientData([]);
    localStorage.removeItem("clientsdata");
    navigate("/");
  };

  const handleCheckout = async () => {
    // Handle the checkout process with the selectedServices list

    try {
      await axios.post("/dailyservice/store", {
        data: selectedServices,
      });
      removeLocalStorage();
      setFwderror("Thank you for registerting the services.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <CContainer className="mt-5">
        <CRow>
          <CCol md={12}>
            <h3>Choose your service:</h3>
          </CCol>
        </CRow>

        <CRow className="w-100 ">
          <CCol md={12} xl={12}>
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
                      <CCardTitle className="text-capitalize text-large">
                        {Services.service}
                      </CCardTitle>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCol>
          <CCol md={12} xl={12}>
            {selectedServices.length > 0 && (
              <Button
                options={{
                  size: "lg",

                  onClick: handleCheckout,
                  className: "mt-3 px-5 py-3 ",
                }}
              >
                CHECK IN
              </Button>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default ProfileCard;

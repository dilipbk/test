import React, { useState, useEffect, useContext } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardImage,
  CRow,
  CCol,
  CImage,
  CButton,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import axios from "../api/axios";
import Datacontext from "../components/Datacontext";
import Header from "./parts/Header";
import "./ProfileCard.css";
import SuccessModel from "./parts/SuccessModel";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { clientdata, updateClientData,clientcount,fetchQueData } = useContext(Datacontext);
  if(!clientdata){
    navigate('/')
  }

  const [Services, setItems] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const sessionToken = localStorage.getItem("clientsdata");
  const [showModal, setShowModal] = useState(false);

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
        },
      ]);
    }
  };
  const handleRemoveServices = (Services) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((item) => item !== Services)
    );
  };


  const handleCheckout = async () => {
    // Handle the checkout process with the selectedServices list
    console.log("Selected Services:", setSelectedServices);

    try {
      const response = await axios.post('/dailyservice/store',
        {
          data: selectedServices,
        }
      );
      setShowModal(true);
      fetchQueData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <CContainer className="d-flex justify-content-center align-items-center profilecardcontainer">
        <CRow className="w-100">
          <CCol md={3} className="d-flex justify-content-center">
            <CRow>
              <CCard className="p-3 py-4 col-md-12">
                <CCardBody className="text-center">
                  <CImage
                    src="https://i.imgur.com/stD0Q19.jpg"
                    width="100"
                    className="rounded-circle"
                  />
                  <h3 className="mt-2">
                    {clientdata.f_name + " " + clientdata.l_name}
                  </h3>
                  <span className="mt-1 clearfix">{clientdata.email}</span>

                  <hr className="line" />

                  <small className="mt-4">
                    I am an android developer working at Google Inc at
                    California, USA
                  </small>
                </CCardBody>
              </CCard>
              {selectedServices.length > 0 && (
                <CCard className="p-3 col-md-12 mt-3">
                  <h3>Selected Service</h3>
                  <CListGroup>
                    {selectedServices.map((Services, index) => (
                      <CListGroupItem
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-md mr-2">
                            <CCardImage
                              src={Services.image}
                              alt={`Services ${index + 1}`}                              
                              className="avatar-img"
                            />
                          </div>

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
                    Checkout
                  </CButton>
                </CCard>
              )}
            </CRow>
          </CCol>
          <CCol md={9} xl={9}>
            <CRow>
              {Services.map((Services, index) => (
                <CCol md="3" sm="6" key={index} className="mb-3 service-item">
                  <CCard
                    onClick={() => handleCardClick(Services)}
                    className={
                      selectedServices.some(
                        (selectedService) =>
                          selectedService.service === Services.service
                      )
                        ? "selected"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <CCardImage
                      src={Services.image}
                      alt={`Services ${index + 1}`}
                      top
                    />
                    <CCardBody>
                      <CCardTitle>{Services.service}</CCardTitle>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
         <SuccessModel updateClientData={updateClientData}  show={showModal} setShowModal= {setShowModal} clientcount={clientcount} />
    </>
  );
};

export default ProfileCard;

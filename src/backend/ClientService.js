import React, { useState, useEffect, useContext } from "react";
import {
  CContainer,
  CAvatar,
  CRow,
  CCol,
  CListGroup,
  CAlert,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CButton,
} from "@coreui/react";
import axios from "../api/axios";
import ServiceList from "./ServiceList";
import "./ProfileCard.css";
import useAuth from "../hooks/useAuth";
import DataContext from "../components/Datacontext";

const ClientService = () => {
  const { auth } = useAuth();
  const {store_id} = useContext(DataContext);
  const [data, setData] = useState([]);
  const [finishedData, setFinishedData] = useState([]);
  const access_token = auth.access_token;
  const [notification, setnotification] = useState('')

  useEffect(() => {
    fetchData();
    fetchFinishedData();
  }, [activeKey, reload]);
  const NameCombine = (str) => {
    const firstChars = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstChars;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/quelist/" + store_id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setData(response.data.dailyservices);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };
  

  return (
    <>
      <CContainer>
        {notification && (
          <CRow>
            <CAlert color="success" className="d-flex align-items-center">
              <div>{notification}</div>
            </CAlert>
          </CRow>
        )}
        <CRow className="w-100">
          <CCol md={12}><h3>Customer List</h3></CCol>
          {data.length ? (
            <CListGroup flush className="">
              {data.map((item, index) => (
                <CListGroupItem key={index} className="my-3">
                  <div className="d-flex align-items-center ">
                    {item.profile_image ? (
                      <>
                        <CAvatar
                          src={item.profile_image}
                          status="success"
                          size="xl"
                        />
                        <h4 className="px-3 my-0">
                          {item.f_name + " " + item.l_name}
                        </h4>
                      </>
                    ) : (
                      <>
                        <CAvatar color="secondary" status="danger" size="xl">
                          {NameCombine(item.f_name + " " + item.l_name)}
                        </CAvatar>
                        <h4 className="px-3 my-0">
                          {item.f_name + " " + item.l_name}
                        </h4>
                        <span
                          className="ms-md-auto d-flex justify-content-center align-items-center rounded-circle border"
                          fontWeight="bold"
                          fontSize="2rem"
                          style={{ width: "60px", height: "60px" }}
                        >
                          {index + 1}
                        </span>
                      </>
                    )}
                  </div>
                 <ServiceList services={item.services} setnotification={setnotification} />
                </CListGroupItem>
              ))}
            </CListGroup>
          ) : (
            <h3>We are waiting on the customer.</h3>
          )}
        </CRow>
      </CContainer>
    </>
  );
};

export default ClientService;

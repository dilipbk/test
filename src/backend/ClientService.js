import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CContainer,
  CAvatar,
  CCardBody,
  CCardImage,
  CRow,
  CCol,
  CImage,
  CButton,
  CCardTitle,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
  CListGroup,
  CDropdown,
  CListGroupItem,
} from "@coreui/react";
import axios from "../api/axios";
import Datacontext from "../components/Datacontext";
import PlaceholderComponent from "../frontend/PlaceHolderFront";
import ServiceList from "./ServiceList";
import "./ProfileCard.css";

const ClientService = () => {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);
  const NameCombine = (str) => {
    const firstChars = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstChars;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/quelist");
      setData(response.data.dailyservices);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };
  

  return (
    <>
      <CContainer className="d-flex justify-content-center align-items-center">
        <CRow className="w-100">
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
                 <ServiceList services={item.services} />
                </CListGroupItem>
              ))}
            </CListGroup>
          ) : (
            <CListGroup flush className=" placeholder-que">
              <PlaceholderComponent />
            </CListGroup>
          )}
        </CRow>
      </CContainer>
    </>
  );
};

export default ClientService;

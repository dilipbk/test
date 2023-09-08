import React, { useState, useEffect, useContext } from "react";
import {
  CAvatar,
  CListGroupItem,
  CListGroup,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import axios from "../api/axios";
import Header from "./parts/Header";
import PlaceholderComponent from "./PlaceHolderFront";
import "./Front.css";
import { Link } from "react-router-dom";
import Datacontext from "../components/Datacontext";

const Front = () => {
  const {clientcount,updateClientData,clientList,fetchQueData} = useContext(Datacontext);
  const resetdata = useState([])
  const handleRemoveData = () => {
    // Remove an item from local storage 
    localStorage.removeItem('clientsdata');
    updateClientData([])
  };
 
 
  useEffect(() => {
    handleRemoveData();
    fetchQueData();
  }, []);
  const NameCombine = (str) => {
    const firstChars = str
      .split(" ")
      .map((word) => word[0])
      .join("");

    return firstChars;
  };
 

  return (
    <>
      <Header />
      <CContainer>
        <CRow>
          <CCol md={6} className="d-flex align-items-center introsection ">
            <div className="intro-text">
              <h2>
                <em>Revitalize</em> Your Salon Experience:
                <br />
                &amp; Prepare for a <em>Complete Upgrade</em>
              </h2>
              <div className="div-dec"></div>
              <p>
                Step into a world of beauty and relaxation where every visit is
                a delightful experience.{" "}
              </p>
              <div className="buttons">
                <div>
                  <a className="btn btn-outline-info btn-lg" href="#">
                    Discover More
                  </a>
                </div>
                <div>
                  <a className="btn btn-outline-warning btn-lg" href="#">
                    Contact Us
                  </a>
                </div>
                <div>
                  <Link className="btn btn-warning btn-lg" to="/signin"> Add me on Que</Link>
                </div>
              </div>
            </div>
          </CCol>
          <CCol md={6} className="d-flex flex-column align-items-center j introsection ">
          {clientList.length ? (
          <div className="intro-r-text">
          <h2>Currently we got <span>{clientcount}</span> customer on the list.</h2>
       
          </div>):(<div className="intro-r-text">
          <h2>Be first to be on the list!</h2>
         
          </div>)}

            {clientList.length ? (
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
                        <h4 className="px-3 my-0">
                          {Services.f_name + " " + Services.l_name}
                        </h4>
                      </>
                    ) : (
                      <>
                        <CAvatar color="secondary" status="danger" size="xl">
                          {NameCombine(Services.f_name + " " + Services.l_name)}
                        </CAvatar>
                        <h4 className="px-3 my-0">
                          {Services.f_name + " " + Services.l_name}
                        </h4>
                        <span className="ms-md-auto rounded-circle border d-flex justify-content-center align-items-center" style={{'font-size':"2rem",'font-weight':'bold',"width":"60px", "height":"60px"}}>{index +1}</span>
                      </>
                    )}
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <CListGroup flush className="nameListque placeholder-que">
                 <PlaceholderComponent/>
              </CListGroup>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Front;

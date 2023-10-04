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
  const { store_id } = useContext(DataContext);

  const [data, setData] = useState([]);
  const [finishedData, setFinishedData] = useState([]);
  const access_token = auth.access_token;
  const [notification, setnotification] = useState("");
  const [activeKey, setActiveKey] = useState(1);

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((state) => !state);
    console.log(reload);
  };

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

  const fetchFinishedData = async () => {
    try {
      const response = await axios.get("/quelistfinished/" + store_id, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setFinishedData(response.data.dailyservices);
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
          <CCol
            className="d-flex justify-content-between align-items-center"
            md={8}
          >
            <h3>Customer Quelist</h3>

            <CButton size="sm" color="dark" onClick={handleReload}>
              Reload
            </CButton>
          </CCol>
          <CCol md={12}>
            <CNav variant="tabs" role="tablist">
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 1}
                  component="button"
                  role="tab"
                  aria-controls="recent-tab-pane"
                  aria-selected={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Current Quelist
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 2}
                  component="button"
                  role="tab"
                  aria-controls="completed-tab-pane"
                  aria-selected={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Completed/Cancled Quelist
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane
                role="tabpanel"
                aria-labelledby="recent-tab-pane"
                visible={activeKey === 1}
              >
                {data.length ? (
                  <CListGroup flush className="">
                    {data.map((item, index) => (
                      <CListGroupItem key={index} className="my-3">
                        <div className="d-flex align-items-center">
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
                              <CAvatar
                                color="secondary"
                                status="danger"
                                size="xl"
                              >
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
                        <ServiceList
                          services={item.services}
                          setnotification={setnotification}
                        />
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                ) : (
                  <h3>We are waiting on the customer.</h3>
                )}
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="completed-tab-pane"
                visible={activeKey === 2}
              >
                {finishedData.length ? (
                  <CListGroup flush className="">
                    {finishedData.map((item, index) => (
                      <CListGroupItem key={index} className="my-3">
                        <div className="d-flex align-items-center">
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
                              <CAvatar
                                color="secondary"
                                status="danger"
                                size="xl"
                              >
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
                        <ServiceList
                          services={item.services}
                          setnotification={setnotification}
                        />
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                ) : (
                  <h3>We are waiting on the customer.</h3>
                )}
              </CTabPane>
            </CTabContent>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default ClientService;

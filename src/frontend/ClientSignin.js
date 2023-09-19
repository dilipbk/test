import React, { useState, useContext } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CImage,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormFloating,
} from "@coreui/react";
import "./Service.css";
import LogoImg from "../assets/images/diamond-threading-salaon-logo.png";
import Datacontext from "../components/Datacontext";

const ClientSignin = () => {
  const {updateClientData,fwderr,setFwderror,setFwdContact} = useContext(Datacontext);
  const [validated, setValidated] = useState(false);
  const [phone_no, setNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleNumberChange = (event) => {
   
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 10) {
      setNumber(event.target.value);
    }
  };
  const handleClientData = (data) => {
    updateClientData(data);
  };

  const haldelRegistration = async (e) => {
    setError("");
    try {
      const response = await axios.get("/client/getclient/" + phone_no, {
        phone_no,
      })
      const clientsdata = response.data.client;
      handleClientData(clientsdata);
      localStorage.setItem('clientsdata',JSON.stringify( clientsdata))
      navigate('/servicecard');
    } catch (err) {
      if (!err?.response) {
        setError("No data enter");
        setValidated(true);
      } else if (err.response?.status === 400) {
        setError("Missing contact number");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("You are not yet the member.");
      }
      setFwderror(error);
      //console.log(error);
     
      setFwdContact(phone_no);
       navigate('/signup')
    }
  };
  return (
    <>
      <CContainer className="d-flex vheight align-items-center">
        <CCard className="p-3 py-4 col-sm-12 col-md-5 m-auto boxshadow bg-light">
          <CCardBody className="text-center">
            <CImage src={LogoImg} width="70%" className="rounded mb-3" />
            <h2 className="mt-2">Check In</h2>        

          

            <CRow className="social-buttons">
              <CForm
                className="g-3 needs-validation"
                noValidate
                validated={validated}
                
              >
                {error && <div style={{ color: "red" }}>{error}</div>}

                <CRow>
                  <CCol>
                  <CFormFloating className="mb-3">
                      <CFormInput
                        type="text"
                        id="contactnumber"
                        placeholder="Mobile Number"
                        name="phone_no"
                        value={phone_no}
                        onChange={handleNumberChange}
                        autoComplete="number"
                        feedbackInvalid="Please provide a valid Nunber."
                        required
                      />
                      <CFormLabel htmlFor="contactnumber">Mobile Number</CFormLabel>
                    </CFormFloating>
                  </CCol>
                </CRow>
                
                <CRow>
                  <CCol xs={12} className="mt-2">
                    <CButton size="lg" color="primary" className=" px-5" onClick={haldelRegistration}>NEXT</CButton>
                  </CCol>
                  <p className="mt-3">Not Register yet?  <Link to="/signup">Register here</Link></p>
                </CRow>
              </CForm>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  );
};

export default ClientSignin;

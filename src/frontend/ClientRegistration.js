import React, { useState, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
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
  CFormFloating,
  CFormLabel,
} from '@coreui/react';
import axios from '../api/axios';
import LogoImg from "../assets/images/diamond-threading-salaon-logo.png";
import Datacontext from "../components/Datacontext";
import "./Service.css";


const ClientRegistration = () => {
 
  const [validated, setValidated] = useState(false);
  const {updateClientData,fwderr,fwdcontact} = useContext(Datacontext);
  const [f_name, setFname] = useState('')
  const [l_name, setLname] = useState('')
  const [phone_no, setPhoneNo] = useState(fwdcontact||'')
  const [email, setEmail] = useState('') 
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const handleClientData = (data) => {
    updateClientData(data);
  };

  const handleNumberChange = (event) => {
   
    const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 10) {
      setPhoneNo(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    // Handle form submission here, e.g., sending data to a server
    try {
      const response = await axios.post('/client/store', {
        f_name,
        l_name,
        phone_no,
        email,
      })
      // Assuming your API returns a token upon successful login
      const clientsdata = response.data.client;
      handleClientData(clientsdata);
      localStorage.setItem('clientsdata',JSON.stringify( clientsdata));
      navigate('/servicecard');
    } catch (error) {
      setValidated(true);
      setError('Please fill the required fields')
    }
  }

  return (
    <>
        <CContainer
          className="d-flex justify-content-center vheight align-items-center"
       
        >
          <CCard className="p-3 py-4  bg-light">
            <CCardBody className="text-center">
            <CImage src={LogoImg} width="70%" className="rounded mb-3" />
              <h3 className="mt-2">Sign Up</h3>  

              

              <small className="mt-4">{fwderr && <div style={{ color: 'red' }}>{fwderr}</div>}{error && <div style={{ color: 'red' }}>{error}</div>}</small>
              <CForm className="g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}>
                <CRow>
                  <CCol md>
                    <CFormFloating className="mb-3">
                      <CFormInput
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                        value={f_name}
                        onChange={(e) => setFname(e.target.value)}
                        feedbackInvalid="Please provide a first name."
                        required
                      />
                      <CFormLabel htmlFor="firstname">First name</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  <CCol>
                    <CFormFloating className="mb-3">
                      <CFormInput
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        value={l_name}
                        onChange={(e) => setLname(e.target.value)}
                        feedbackInvalid="Please provide a last name."
                        required
                      />
                      <CFormLabel htmlFor="lastname">Last name</CFormLabel>
                    </CFormFloating>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md="12">
                    <CFormFloating className="mb-3">
                      <CFormInput
                        type="tel"
                        id="mobile_number"
                        placeholder="Mobile Number"
                        value={phone_no}
                        onChange={handleNumberChange}
                        feedbackInvalid="Please provide a mobile number."
                        required
                      />
                      <CFormLabel htmlFor="mobile_number">Mobile Number</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  <CCol md="12">
                    <CFormFloating className="mb-3">
                      <CFormInput
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        feedbackInvalid="Please provide youremail."
                        required
                      />
                      <CFormLabel htmlFor="email">Email Address</CFormLabel>
                    </CFormFloating>
                  </CCol>
                </CRow>

                <CRow className="profile mt-2">
                  <CCol>
                  <CButton type="submit" color="primary" size="lg" className="px-5" >
                    Register
                  </CButton>
                  </CCol>
                </CRow>
                <p className="mt-3">Already Sign up? <Link to="/signin">Sign in here</Link></p>
              </CForm>
            </CCardBody>
          </CCard>
        </CContainer>
      
    </>
  )
}

export default ClientRegistration

import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CForm,
  CCol,
  CFormLabel ,
  CFormInput,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
} from '@coreui/react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import DataContext from '../components/Datacontext';
  

const ServiceAdd = () => {
  const { auth } = useAuth(); 
  const authToken = auth.access_token;
  const navigate = useNavigate();
  const { store_id } = useContext(DataContext);
  const [formData, setFormData] = useState({
    service: '',
    duration: '',
    store_id: store_id,
    visible:'TRUE'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine the API endpoints based on the filled fields
      const serviceApi = '/services/store'

      const storepost = await 
        axios.post(serviceApi, formData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Add your authentication mechanism here
          },})
                
    
        navigate("/login/service");
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };


  return (
    <CCard>
      <CCardHeader>Service</CCardHeader> 
      <CCardBody>
    <CForm onSubmit={handleSubmit}>
      <CRow>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="name">Service</CFormLabel >
        <CFormInput
          type="text"
          id="service"
          placeholder="Service Name"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        />
      </CCol>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="address">Duration(in Min)</CFormLabel >
        <CFormInput
          type="text"
          id="duration"
          placeholder="Enter Duration in minutes"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        />
      </CCol>
      </CRow>
      
      <CButton type="submit" color="dark">
        Submit
      </CButton>
    </CForm>
    </CCardBody>
    </CCard>
  );
};

export default ServiceAdd;

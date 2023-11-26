import React, { useState } from 'react';
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
  

const StoreAdd = () => {
  const { auth } = useAuth(); 
  const authToken = auth.access_token;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    full_name: '',
    password: '',
    cpassword: '',   
    role: '5150',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Determine the API endpoints based on the filled fields
      const storeApiUrl = determineApiUrl(formData, 'store');
      const userApiUrl = determineApiUrl(formData, 'user');

      // Use Promise.all to send both requests concurrently
      //const response = await axios.get("/dailyservice/" + store_id);
      const storepost = await 
        axios.post(storeApiUrl, formData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Add your authentication mechanism here
          },})
        
        const updatedFormData = { ...formData, store_id:storepost.data.Store.id };
        const userpost = await 
        axios.post(userApiUrl, updatedFormData,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Add your authentication mechanism here
        },})
    
       navigate("/login/store");
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const determineApiUrl = (data, type) => {
    // Check if store-related fields are filled
    if (type === 'store' && data.name && data.address && data.location) {
      return '/store/store';
    }

    // Check if user-related fields are filled
    if (type === 'user' && data.full_name && data.password && data.cpassword && data.email) {
      return '/register';
    }
    
  };

  return (
    <CCard>
      <CCardHeader>Store</CCardHeader> 
      <CCardBody>
    <CForm onSubmit={handleSubmit}>
      <CRow>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="name">Store Name</CFormLabel >
        <CFormInput
          type="text"
          id="name"
          placeholder="Enter store name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </CCol>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="address">Address</CFormLabel >
        <CFormInput
          type="text"
          id="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </CCol>
      </CRow>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="location">Location</CFormLabel >
        <CFormInput
          type="text"
          id="location"
          placeholder="Enter location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </CCol>
      <CRow>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="username">User name</CFormLabel >
        <CFormInput
          type="text"
          id="username"
          placeholder="Enter username"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />
      </CCol>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="email">Email</CFormLabel >
        <CFormInput
          type="email"
          id="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </CCol>
      </CRow>
      <CRow>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="password">Password</CFormLabel >
        <CFormInput
          type="password"
          id="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </CCol>
      <CCol className="mb-3">
        <CFormLabel  htmlFor="cpassword">Password</CFormLabel >
        <CFormInput
          type="password"
          id="cpassword"
          placeholder="Enter Confirm password"
          value={formData.cpassword}
          onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}
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

export default StoreAdd;

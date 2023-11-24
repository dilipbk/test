import React, { useState,useContext,useEffect } from 'react';
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
  CFormSelect
} from '@coreui/react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import DataContext from '../components/Datacontext';

function ServiceSubcategoryAdd() {
    const { auth } = useAuth(); 
    const authToken = auth.access_token;
    const navigate = useNavigate();
    const { store_id } = useContext(DataContext);
    const [serviceitems, setServiceItems] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("/getallservices/" + store_id, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setServiceItems(response.data.Services);
      } catch (error) {
        console.error("Error fetching client list:", error);
      }
    };

    console.log(serviceitems);
    const [formData, setFormData] = useState({
      name: '',
      categoryid: '',
      price:'',
      store_id: store_id,
      visible:'TRUE'
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Determine the API endpoints based on the filled fields
        const serviceApi = '/servicesprice/store'
  
        const storepost = await 
          axios.post(serviceApi, formData,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`, // Add your authentication mechanism here
            },})
                  
      
          navigate("/login/service-category");
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    };
  
  
    return (
      <CCard>
        <CCardHeader>Add Sub Category for Service</CCardHeader> 
        <CCardBody>
      <CForm onSubmit={handleSubmit}>
        <CRow>
        <CCol>
            <CFormSelect
                id="categoryid"
                label="Service Category"
                onChange={(e) => setFormData({ ...formData, categoryid: e.target.value })}
                required
                value={formData.categoryid}
              >
                <option disabled>Choose...</option>
                {serviceitems.length > 0 &&
                  serviceitems.map((item, index) => (
                   
                    <option
                      key={index}
                      value={item?.id}
                    >
                      {item?.service}
                    </option>
                  ))}
              </CFormSelect>
        </CCol>
        <CCol className="mb-3">
          <CFormLabel  htmlFor="name">Service Name</CFormLabel >
          <CFormInput
            type="text"
            id="name"
            placeholder="Service Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </CCol>
        <CCol className="mb-3">
          <CFormLabel  htmlFor="price">Price</CFormLabel >
          <CFormInput
            type="number"
            id="price"
            placeholder="Price in dollor"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
export default ServiceSubcategoryAdd
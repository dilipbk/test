import {
  CCardHeader,
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
} from '@coreui/react'
import { Link } from "react-router-dom";
import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";
import defaultimg from '../assets/images/default-img.png'


const ClientsList = () => {
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showItems, setShowItems] = useState(false);
  const [showItemList, setShowItemList] = useState(true);
  const [items, setItems] = useState([]);
 const access_token = auth.access_token;
  useEffect(() => {
    fetchData(); // Call the async function here
  }, []); // Empty dependency array for componentDidMount behavior
  

  const fetchData = async () => {
      try {
        const response = await axios.get('/client', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        
        console.log(response);
        setItems(response.data.clients);
      } catch (error) {
        console.error('Error fetching client list:', error);
      }
    };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleViewItemsClick = () => {
    setShowItems(true)
    setShowItemList(false)
  }

  const filteredItems = items.filter((item) =>
    item.phone_no.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <CCard>
      <CCardHeader>Clients List</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md="6">
            <CInputGroup>
              <CFormInput
                type="text"
                placeholder="Search customer by mobile number"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <CButton color="primary" onClick={handleViewItemsClick}>
                View Items
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        {showItemList && (
          <CRow className="mt-4">
            {filteredItems.map((item) => (

            <CCol md={4} className="d-flex">
              <CCol md={4}>
                <CCardImage src={item.profile_image ? item.profile_image : defaultimg} alt={item.f_name} />
              </CCol>
              <CCol md={8}>
                <CCardBody>
                  <CCardTitle> {item.f_name + ' ' + item.l_name}</CCardTitle>
                  <CCardText>
                    <p>Email: {item.email}</p>
                    <p>Mobile: {item.phone}</p>
                  </CCardText>
                  <CCardText>
                    <Link to={'/client/'+ item.id}>View Details</Link>
                  </CCardText>
                </CCardBody>
              </CCol>
              </CCol>
            
           
            ))}
          </CRow>
        )}
       
      </CCardBody>
    </CCard>
  )
}

export default ClientsList

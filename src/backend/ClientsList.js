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
} from '@coreui/react'
import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";


const ClientsList = () => {
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('')
  const [showItems, setShowItems] = useState(false)
  const [showItemList, setShowItemList] = useState(true)
  const [items, setItems] = useState([])
  const sessionToken = localStorage.getItem('TOKEN')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/client', {
        headers: {
          Authorization: `Bearer ${auth.access_token}`, // Use the token in the request header
        },
      })

      console.log(response)
      setItems(response.data.clients)
    } catch (error) {
      console.error('Error fetching client list:', error)
    }
  }

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
                placeholder="Search for items..."
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
              <CCol className="mb-3" md="3" key={item.id}>
                <CCard>
                  {/* Assuming 'profile_image' is a field in your API response */}
                  <CCardImage
                    orientation="top"
                    src={item.profile_image ? item.profile_image : '/user_default.avif'}
                    alt={item.f_name}
                  />
                  <CCardBody>
                    <h5 className="card-title">{item.f_name + ' ' + item.l_name}</h5>
                    {/* Add more item details as needed */}
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        )}
        {showItems && (
          <CRow className="mt-4 mb-3">
            {filteredItems.map((item) => (
              <CCol className="mb-3" md="3" key={item.id}>
                <CCard>
                  {/* Assuming 'profile_image' is a field in your API response */}
                  <CCardImage
                    orientation="top"
                    src={item.profile_image ? item.profile_image : '/user_default.avif'}
                    alt={item.f_name}
                  />
                  <CCardBody>
                    <h5 className="card-title center">{item.f_name + ' ' + item.l_name}</h5>
                    {/* Add more item details as needed */}
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        )}
      </CCardBody>
    </CCard>
  )
}

export default ClientsList

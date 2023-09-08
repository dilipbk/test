import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CCol,
  CRow,
  CFormFloating,
  CFormCheck,
} from '@coreui/react'
import axios from '../api/axios'
import React, { useState } from 'react'
import './ClientRegistration.css'
import { useNavigate } from 'react-router-dom'
const CRegistration = () => {
  const [f_name, setFname] = useState('')
  const [l_name, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone_no, setPhoneNo] = useState('')
  const [street, setStreet] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [gender, setGender] = useState('FEMALE')
  const [file, setSelectedFile] = useState(null)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const apiUrl = '/client/store'
  const sessionToken = localStorage.getItem('TOKEN')

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value)
  }

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    // Handle form submission here, e.g., sending data to a server
    try {
      const response = await axios.post(
        apiUrl,
        {
          f_name,
          l_name,
          email,
          phone_no,
          street,
          city,
          state,
          zipcode,
          gender,
          file,
        },
        headerConfig,
      )
      // Assuming your API returns a token upon successful login
      console.log(response)

      navigate('/clients/clients-list')
    } catch (error) {
      setError('Please fill the required fields')
      console.error('Login Error:', error)
    }
  }

  return (
    <CCard>
      <CCardHeader>Client Registration</CCardHeader>
      <CCardBody>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <CForm onSubmit={handleSubmit}>
          <CFormLabel>Personal Details</CFormLabel>
          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  value={f_name}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="firstname">First name</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  value={l_name}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="lastname">Last name</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>

          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="firstname">Email</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="tel"
                  id="mobile_number"
                  placeholder="Mobile Number"
                  value={phone_no}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="mobile_number">Mobile Number</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CFormLabel>Location Details</CFormLabel>
          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="street"
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="street">Street Address</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="city">City </CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="state">State</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="zipcode"
                  placeholder="Zip-code"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
                <CFormLabel htmlFor="street">Zip-code</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CFormLabel>Gender</CFormLabel>
          <CRow className="mb-2">
            <CCol xl>
              <CFormCheck
                button={{ color: 'success', variant: 'outline' }}
                type="radio"
                className="paddingleft"
                name="gender"
                id="male-outlined"
                autoComplete="off"
                label="Male"
                value="MALE"
                checked={gender === 'MALE'}
                onChange={handleGenderChange}
              />
              <CFormCheck
                button={{ color: 'success', variant: 'outline' }}
                type="radio"
                name="gender"
                id="famale-outlined"
                autoComplete="off"
                value="FEMALE"
                label="Female"
                checked={gender === 'FEMALE'}
                onChange={handleGenderChange}
              />
              <CFormCheck
                button={{ color: 'success', variant: 'outline' }}
                type="radio"
                name="gender"
                id="trans-outlined"
                autoComplete="off"
                value="TRANS"
                label="Trans"
                checked={gender === 'TRANS'}
                onChange={handleGenderChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>
                <label htmlFor="file">Profile Image Upload</label>
                <CFormInput type="file" id="file" name="file" onChange={handleFileChange} />
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CButton type="submit" color="primary">
                Register
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CRegistration

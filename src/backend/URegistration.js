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
} from "@coreui/react";

import React, { useState } from "react";
import "./ClientRegistration.css";

const URegistration = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    phone_no: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic on form submit
    const validationErrors = {};

    if (!formData.f_name) {
      validationErrors.f_name = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.f_name)) {
      validationErrors.f_name = "First Name should contain only alphabets";
    }

    if (!formData.l_name) {
      validationErrors.l_name = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.l_name)) {
      validationErrors.l_name = "Last Name should contain only alphabets";
    }

    if (!formData.phone_no) {
      validationErrors.phone_no = "Phone Number is required";
    } else if (
      !/^[0-9]+$/.test(formData.phone_no) ||
      formData.phone_no.length !== 10
    ) {
      validationErrors.phone_no =
        "Phone Number should be 10 digits and contain only digits";
    }

    if (Object.keys(validationErrors).length === 0) {
      setError("");
    } else {
      setErrors(validationErrors);
      setError("Please correct the errors in the form.");
    }
  };

  return (
    <CCard style={{ maxWidth: "768px", width: "100%", margin: "auto" }}>
      <CCardHeader>User Registration</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormLabel>User Details</CFormLabel>
          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  name="f_name"
                  value={formData.f_name}
                  onChange={handleInputChange}
                />
                {errors.f_name && (
                  <p style={{ color: "red" }}>{errors.f_name}</p>
                )}
                <CFormLabel htmlFor="firstname">First name</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="lastname"
                  name="l_name"
                  placeholder="Last Name"
                  value={formData.l_name}
                  onChange={handleInputChange}
                />
                {errors.l_name && (
                  <p style={{ color: "red" }}>{errors.l_name}</p>
                )}
                <CFormLabel htmlFor="lastname">Last name</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>

          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="tel"
                  id="mobile_number"
                  name="phone_no"
                  placeholder="Mobile Number"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                />
                {errors.l_name && (
                  <p style={{ color: "red" }}>{errors.phone_no}</p>
                )}
                <CFormLabel htmlFor="mobile_number">Mobile Number</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CButton
                type="submit"
                color="dark"
                size="lg"
                className="px-4 mt-2"
                shape="rounded-0"
              >
                Register
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default URegistration;

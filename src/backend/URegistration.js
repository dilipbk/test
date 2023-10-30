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
    full_name: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const validateField = (name, value) => {
    if (name === "f_name") {
      if (!value) {
        return "First Name is required";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        return "First Name should contain only alphabets";
      }
    } else if (name === "l_name") {
      if (!value) {
        return "Last Name is required";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        return "Last Name should contain only alphabets";
      }
    } else if (name === "phone_no") {
      if (!value) {
        return "Phone Number is required";
      } else if (!/^[0-9]+$/.test(value) || value.length !== 10) {
        return "Phone Number should be 10 digits and contain only digits";
      }
    }
    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const full_name = formData.f_name + " " + formData.l_name;
    const validationError = validateField(name, value);
    setErrors({ ...errors, [name]: validationError });
    setFormData({ ...formData, [name]: value, full_name });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fieldErrors = {};
    for (const name in formData) {
      const validationError = validateField(name, formData[name]);
      if (validationError) {
        fieldErrors[name] = validationError;
      }
    }

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      setError("");
      setFormData({
        ...formData,
        full_name: `${formData.f_name} ${formData.l_name}`,
      });
    } else {
      setError("Please correct the errors in the form.");
      return;
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
            <CFormInput
              type="hidden"
              id="fullname"
              name="full_name"
              value={formData.full_name}
            />
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
                {errors.phone_no && (
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

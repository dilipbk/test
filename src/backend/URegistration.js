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

import React, { useEffect, useState, useContext } from "react";
import DataContext from "../components/Datacontext";
import useAuth from "../hooks/useAuth";
import "./ClientRegistration.css";
import axios from "../api/axios";
const URegistration = () => {
  const { auth } = useAuth();

  const access_token = auth.access_token;

  const [serviceListData, setServiceListData] = useState([]);

  const initialErrors = {
    f_name: "",
    l_name: "",
    phone_no: "",
    password: "",
    cpassword: "",
    email: "",
  };
  const { store_id } = useContext(DataContext);
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  const isNonEmpty = (value) => value.trim() !== "";
  const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
  const isNumeric = (value) => /^[0-9]+$/.test(value);
  const isPhoneValid = (value) => isNumeric(value) && value.length === 10;
  const [isValid, setIsValid] = useState(true);
  const validateEmail = (value) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(value);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === cpassword);
    setPasswordValid(
      newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) && // At least one capital letter
        /[!@#$%^&*]/.test(newPassword) // At least one symbol (you can adjust the symbols as needed)
    );
  };
  const handleConfirmPasswordChange = (e) => {
    setCPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
    console.log(newEmail);
  };

  let full_name = `${f_name} ${l_name}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFields();
  };

  const validateFields = () => {
    const newErrors = { ...initialErrors };

    if (!isNonEmpty(f_name)) {
      newErrors.f_name = "First name is required";
    } else if (!isAlphabetic(f_name)) {
      newErrors.f_name = "First name should only contain alphabets";
    }

    if (!isNonEmpty(l_name)) {
      newErrors.l_name = "Last name is required";
    } else if (!isAlphabetic(l_name)) {
      newErrors.l_name = "Last name should only contain alphabets";
    }

    if (!isNonEmpty(phone_no)) {
      newErrors.phone_no = "Phone number is required";
    } else if (!isPhoneValid(phone_no)) {
      newErrors.phone_no = "Phone number is not valid";
    }
    if (password !== cpassword) {
      newErrors.password = "Passwords do not match";
    } else if (!passwordValid) {
      newErrors.password =
        "Password must have at least 8 characters with one capital letter and one symbol";
    }

    if (isValid === false) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      fetchData();
    } else {
      return;
    }
  };

  const fetchData = async (catid) => {
    try {
      const response = await axios.get("/register", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setServiceListData(response.data.ServicesList);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  console.log(full_name);

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
                  value={f_name}
                  onChange={(e) => setFName(e.target.value)}
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
                  value={l_name}
                  onChange={(e) => setLName(e.target.value)}
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
              value={full_name}
            />
            <CFormInput
              type="hidden"
              id="store_id"
              name="store_id"
              value={store_id}
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
                  value={phone_no}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                {errors.phone_no && (
                  <p style={{ color: "red" }}>{errors.phone_no}</p>
                )}
                <CFormLabel htmlFor="mobile_number">Mobile Number</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="tel"
                  id="role"
                  name="role"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
                <CFormLabel htmlFor="role">Role</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                <CFormLabel htmlFor="email">Email Address</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
                <CFormLabel htmlFor="password">Password</CFormLabel>
              </CFormFloating>
            </CCol>
            <CCol md>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="password"
                  id="cpassword"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={cpassword}
                  onChange={handleConfirmPasswordChange}
                />
                {errors.cpassword && (
                  <p style={{ color: "red" }}>{errors.cpassword}</p>
                )}
                <CFormLabel htmlFor="cpassword">Confirm Password</CFormLabel>
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

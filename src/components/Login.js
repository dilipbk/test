import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DataContext from "./Datacontext";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import axios from "../api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: user,
        password: pwd,
      });
      const access_token = response?.data?.access_token;
      const roles = response?.data?.user?.role;
      const storeID = response?.data?.user?.store_id;
      setAuth({ user, pwd, roles, access_token });
      localStorage.setItem('token',JSON.stringify({'user':user, 'roles':roles, 'access_token':access_token}));
      setUser("");
      setPwd("");
      navigate("clientservice", { replace: true });
      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        name="email"
                        ref={userRef}
                        value={user}
                        size="lg"
                        onChange={(e) => setUser(e.target.value)}
                        autoComplete="Email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={pwd}
                        size="lg"
                        onChange={(e) => setPwd(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          color="primary"
                          className="px-4 mb-2 w-100"
                          size="lg"
                          color="dark"
                          shape="rounded-0"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>

                      <div className="persistCheck">
                        <input
                          type="checkbox"
                          id="persist"
                          onChange={togglePersist}
                          checked={persist}
                        />
                        <label htmlFor="persist">Trust This Device</label>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import {
  CContainer,
  CNavbarBrand,
  CNavbar,
  CNavbarNav,
  CNavItem,
  CNavbarToggler,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem


} from "@coreui/react";
import salonLogo from "../../assets/images/diamond-threading-salaon-logo.png";
import useAuth from "../../hooks/useAuth";

const AppHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const [visible, setVisible] = useState(false);

  return (
    <CNavbar className="bg-pink">
      <CContainer fluid>
        <CNavbarBrand>
          <img src={salonLogo}></img>
        </CNavbarBrand>
        <CNavbarToggler
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
        />
        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>Admin Menu</COffcanvasTitle>

            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>

          <COffcanvasBody>
            <p>{auth?.user}</p>
            <CNavbarNav>
              <CNavItem>
                <Link to="/login/store" className="nav-link">
                  Store
                </Link>
              </CNavItem>
              
              <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Service</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="/login/service">Service List</CDropdownItem>
                <CDropdownItem href="/login/service-category">Service Category</CDropdownItem>
                
              </CDropdownMenu>
            </CDropdown>
              <CNavItem>
                <Link to="/login/clientservice" className="nav-link">
                  Que List
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to="/login/clientservice" className="nav-link">
                  Check in
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to="/login/clientregister" className="nav-link">
                  Customer Register
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to="/login/userregister" className="nav-link">
                  User Register
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to="/login/booking" className="nav-link">
                  Booking
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to="/login/home" className="active nav-link">
                  Client List
                </Link>
              </CNavItem>

              <CNavItem>
                <button onClick={signOut} className="btn btn-warning">
                  Sign Out
                </button>
              </CNavItem>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
};

export default AppHeader;

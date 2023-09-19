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
  CFormCheck,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import DataContext from "../../components/Datacontext";
import salonLogo from "../../assets/images/diamond-threading-salaon-logo.png";

const AppHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { setLocalStoreID } = useContext(DataContext);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("STOREID") || ""
  );

  // Function to handle radio button click
  const handleRadioButtonClick = (event) => {
    const { value } = event.target;

    // Update the selected value in the component's state
    setSelectedValue(value);
    setLocalStoreID(value);

    // Store the selected value in localStorage
    localStorage.setItem("STOREID", value);
  };

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
            <CNavbarNav>
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
              <CNavItem className="mt-3">
                <CDropdown>
                  <CDropdownToggle color="info">
                   Store Setting
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>
                      <CFormCheck
                        type="radio"
                        name="setStore"
                        id="flexRadioDefault1"
                        label="Dallas"
                        value="1"
                        checked={selectedValue === "1"}
                        onChange={handleRadioButtonClick}
                        className="mr-2"
                      />
                    </CDropdownItem>
                    <CDropdownItem>
                      <CFormCheck
                        type="radio"
                        name="setStore"
                        id="flexRadioDefault2"
                        label="Grand Parirer "
                        value="2"
                        checked={selectedValue === "2"}
                        onChange={handleRadioButtonClick}
                      />
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavItem>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
};

export default AppHeader;

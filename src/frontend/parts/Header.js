import {
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav, 
    CNavItem,
  } from '@coreui/react';
import { Link } from 'react-router-dom';
import salonLogo from '../../assets/images/diamond-threading-salaon-logo.png';
function Header() {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid className="d-flex justify-content-between">
        <CNavbarBrand href="/">
          <img src={salonLogo} alt="" height="80" />
        </CNavbarBrand>
        
      </CContainer>
    </CNavbar>
  );
}

export default Header;

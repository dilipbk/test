import {
    CContainer,
    CNavbar,
    CNavbarBrand,   
  } from '@coreui/react';
import salonLogo from '../../assets/images/diamond-threading-salaon-logo.png';
function Header() {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand href="/">
          <img src={salonLogo} alt="" height="80" />
        </CNavbarBrand>
      </CContainer>
    </CNavbar>
  );
}

export default Header;

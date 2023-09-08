import {
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav, 
    CNavItem,
    CNavLink
  } from '@coreui/react';
import salonLogo from '../../assets/images/diamond-threading-salaon-logo.png';
function Header() {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid className="d-flex justify-content-between">
        <CNavbarBrand href="/">
          <img src={salonLogo} alt="" height="80" />
        </CNavbarBrand>
        <CNavbarNav className="xr-4 mb-2 mb-lg-0">
            <CNavItem>
              <CNavLink href="/login" active>
                Admin Login
              </CNavLink>
            </CNavItem>
        </CNavbarNav>
      </CContainer>
    </CNavbar>
  );
}

export default Header;

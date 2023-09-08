import React,{useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
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
  COffcanvasBody

} from '@coreui/react'

import salonLogo from '../../assets/images/diamond-threading-salaon-logo.png';
const AppHeader = () => {
  const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

  const [visible, setVisible] = useState(false)
return (
  <CNavbar colorScheme="info" className="bg-pink">
    <CContainer fluid>
      <CNavbarBrand><img src={salonLogo}></img></CNavbarBrand>
      <CNavbarToggler
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
        onClick={() => setVisible(!visible)}
      />
      <COffcanvas id="offcanvasNavbar" placement="end" portal={false} visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Offcanvas</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CNavbarNav>
            <CNavItem>
            <Link to="/login/home" className="active"> Client List </Link>
            </CNavItem>
            <CNavItem>
            <Link to="/login/clientservice">Que List</Link>
            </CNavItem>
            <CNavItem>
            <Link to="/login/clientregister">Client Register</Link>
            </CNavItem>
             <CNavItem>
             <button onClick={signOut}>Sign Out</button>
             </CNavItem>
          </CNavbarNav>
          
        </COffcanvasBody>
      </COffcanvas>
    </CContainer>
  </CNavbar>
)
}

export default AppHeader

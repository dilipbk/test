import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CNavbarBrand,
  CNavbar, 
  CNavbarNav,
  CNavItem,
  CNavLink,
  CNavbarToggler,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
  CButton,

} from '@coreui/react'

import salonLogo from '../../assets/images/diamond-threading-salaon-logo.png';
const AppHeader = () => {

  const [visible, setVisible] = useState(false)
return (
  <CNavbar colorScheme="light" className="bg-light">
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
              <CNavLink href="#" active>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Link</CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Action</CDropdownItem>
                <CDropdownItem href="#">Another action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Something else here</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CNavItem>
              <CNavLink href="#" disabled>
                Disabled
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CForm className="d-flex">
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
    </CContainer>
  </CNavbar>
)
}

export default AppHeader

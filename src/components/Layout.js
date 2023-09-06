import { Outlet } from "react-router-dom"
import { AppFooter, AppHeader } from '../backend/parts/index'

const Layout = () => {
    return (

        <div>
        <div>
          <AppHeader />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">           
            <div className="body flex-grow-1 px-3">
              <Outlet />
            </div>
            <AppFooter />
          </div>
        </div>
      </div>       
    )
}

export default Layout

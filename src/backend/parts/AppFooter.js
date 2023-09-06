import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://diamondthreadingsalon.com" target="_blank" rel="noopener noreferrer">
          Diamond Threading Salon
        </a>
        <span className="ms-1">&copy; 2023 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="nextgennp.co" target="_blank" rel="noopener noreferrer">
          Nextgen Solutions &amp; Dashboard Template
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

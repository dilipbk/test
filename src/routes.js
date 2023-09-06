import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ClientRegistration = React.lazy(() =>
  import('./views/clients/registration/ClientRegistration'),
)
const ClientsList = React.lazy(() => import('./views/clients/clients-list/ClientsList'))

const routes = [
  { path: '/', exact: true, name: 'Register Page' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/clients/registration', name: 'Registration', element: ClientRegistration },
  { path: '/clients/clients-list', name: 'Clients List', element: ClientsList },
]

export default routes

import { useContext, type FC } from 'react'
import { Navigate } from 'react-router-dom'
import { LayoutContext } from '../contexts/layoutContext'
import DashboardController from '../../pages/dashboard/dashboard.controller'

interface PrivateRouteProps {
  path: string
  element: any
}

const PrivateRoute: FC<PrivateRouteProps> = ({ path, element: Component }) => {
  const { loginUserData } = useContext(LayoutContext)

  if (!loginUserData) {
    return <Navigate to="/login" />
  }

  if (path === '/') {
    switch (loginUserData?.role) {
      case 'Admin':
        return <DashboardController />
      default:
        return <Navigate to="/unauthorized" />
    }
  }

  return <Component />
}

export default PrivateRoute
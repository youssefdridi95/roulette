import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Stores from './pages/Stores';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Tickets from './pages/Tickets';
import DashboardApp from './pages/DashboardApp';
import AddStore from './pages/AddStore';
import EditStore from './pages/EditStore';
import ShowTicket from './pages/ShowTicket';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'stores', element: <Stores /> },
        { path: 'addstore', element: <AddStore /> },
        { path: 'editstore', element: <EditStore /> },
        { path: 'showticket', element: <ShowTicket /> },
        { path: 'tickets', element: <Tickets /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

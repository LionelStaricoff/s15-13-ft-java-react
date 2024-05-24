import { createRoot } from 'react-dom/client'
import App from './src/App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import DashboardPage from './src/pages/DashboardPage'
import SalesPage from './src/pages/SalesPage'
import QueriesPage from './src/pages/QueriesPage'
import NotFoundPage from './src/pages/NotFoundPage'
import LoginPage from './src/pages/LoginPage'
import ErrorPage from './src/pages/ErrorPage'
import { ThemeProvider } from '@material-tailwind/react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to='/login' /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/sales', element: <SalesPage /> },
      { path: '/queries', element: <QueriesPage /> }
    ]
  },
  { path: '/error', element: <ErrorPage /> },
  { path: '*', element: <NotFoundPage /> }
])

const root = createRoot(document.getElementById('app'))
root.render(<ThemeProvider><RouterProvider router={router} /></ThemeProvider>)

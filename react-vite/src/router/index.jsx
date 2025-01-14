import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProfilePage from '../components/Profile/Profile';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "explore",
        element: <h1>Explore Page</h1>
      },
      {
        path: "forum",
        element: <h1>Forum Page</h1>
      },
      {
        path: "inbox",
        element: <h1>Inbox Page</h1>
      },
      {
        path: "profile",
        element:<ProfilePage />
      },
    ],
  },
]);
import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProfilePage from '../components/Profile/Profile';
import CreatePostForm from '../components/Posts/CreatePostForm/CreatePostForm';
import EditPostForm from '../components/Posts/EditPostForm';
import PostDetails from '../components/Posts/PostDetails';

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
        path: "posts",
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
      {
        path: "posts/new",
        element:<CreatePostForm />
      },
      {
        path: "posts/:postId",
        element:<PostDetails />
      },
      {
        path: "posts/:postId/edit",
        element:<EditPostForm />
      },
    ],
  },
]);